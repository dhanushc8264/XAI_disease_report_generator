from fastapi import APIRouter
from schemas import DiabetesRawInput
import joblib, numpy as np

from utils.explain_diabetes import create_explainer, get_top_contributors
from utils.llm_utils import generate_diabetes_report  # Optional

router = APIRouter()

# Load model, scaler, and feature names
model = joblib.load("models/xgboost_diabetes_model_a.pkl")
scaler = joblib.load("models/diabetes_scaler.pkl")
feature_names = joblib.load("models/diabetes_feature_names_a.pkl")  # must match model input order
explainer = create_explainer(model)

@router.post("/predict-diabetes")
def predict(raw: DiabetesRawInput):
    # 1) Derive HighBP & HighChol
    high_bp = int(raw.systolic_bp >= 140 or raw.diastolic_bp >= 90)
    high_chol = int(raw.cholesterol_mg_dl > 200)

    # 2) Encode booleans
    smoker = int(raw.smoker)
    phys_activity = int(raw.phys_activity)
    heart_attack = int(raw.heart_disease_or_attack)
    diff_walk = int(raw.diff_walk)
    sex = 1 if raw.sex == "Male" else 0
    stroke = int(raw.stroke)
    chol_check = int(raw.chol_check)
    hvy_alcohol = int(raw.hvy_alcohol_consump)

    # 3) Income bucket
    income_bins = [10_000,20_000,30_000,40_000,50_000,60_000,70_000]
    income_cat = sum(raw.annual_income > b for b in income_bins) + 1

    # 4) Scale BMI and Age
    arr = np.array([[raw.bmi, raw.age_years]])
    bmi_age_scaled = scaler.transform(arr)[0]

    # 5) Final input vector
    X = np.array([[ 
        high_bp,
        high_chol,
        bmi_age_scaled[0],
        smoker,
        phys_activity,
        heart_attack,
        diff_walk,
        sex,
        bmi_age_scaled[1],
        stroke,
        income_cat,
        chol_check,
        hvy_alcohol,
        raw.gen_health
    ]])

    # 6) Prediction and probability
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0][1]  # Probability of diabetes (class 1)
    label = "Yes" if pred == 1 else "No"
    risk = "High Diabetes Risk" if pred == 1 else "Low Diabetes Risk"

    # 7) SHAP explanation
    top_features = []
    explanation = "No report generated."
    if pred == 1:
        try:
            shap_vals = explainer.shap_values(X)[0]
            top_features = get_top_contributors(shap_vals, X, feature_names)

            # Optional: detailed explanation
            explanation = generate_diabetes_report(top_features, prob, label)

        except Exception as e:
            print("SHAP failed:", e)

    return {
        "prediction": int(pred),
        "probability": round(float(prob), 4),
        "label": label,
        "risk": risk,
        "top_contributors": top_features,
        "explanation": explanation
    }
