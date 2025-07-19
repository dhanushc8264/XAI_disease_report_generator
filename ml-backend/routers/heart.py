from fastapi import APIRouter
from schemas import HeartRawInput
import numpy as np
import joblib
from utils.explain_heart import create_explainer, get_top_contributors
from utils.llm_utils import generate_heart_report

router = APIRouter()

# Lazy-loaded global variables
model = None
scaler = None
feature_names = None
explainer = None

@router.post("/predict-heart")
def predict_heart(raw: HeartRawInput):
    global model, scaler, feature_names, explainer

    # Lazy loading of model and helpers
    if model is None:
        print("🔄 Loading model, scaler, features, and explainer for the first time...")
        model = joblib.load("models/heart_model_xgb.pkl")
        scaler = joblib.load("models/heart_scaler.pkl")
        feature_names = joblib.load("models/feature_names.pkl")
        explainer = create_explainer(model)

    # ✅ Manual preprocessing and one-hot encoding
    print("📦 Raw received input:", raw.model_dump())

    sex_f = 1 if raw.Sex == "F" else 0
    sex_m = 1 if raw.Sex == "M" else 0

    valid_cp_types = ["ASY", "ATA", "NAP", "TA"]
    cp = raw.ChestPainType if raw.ChestPainType in valid_cp_types else "NAP"
    cp_encoded = [1 if cp == v else 0 for v in valid_cp_types]

    angina_n = 1 if raw.ExerciseAngina == "N" else 0
    angina_y = 1 if raw.ExerciseAngina == "Y" else 0

    slope_types = ["Down", "Flat", "Up"]
    slope_encoded = [1 if raw.ST_Slope == slope else 0 for slope in slope_types]

    numeric = np.array([[raw.Age, raw.RestingBP, raw.Cholesterol, raw.MaxHR, raw.Oldpeak]])
    scaled = scaler.transform(numeric)[0]

    features = np.array([[ 
        sex_f, sex_m,
        *cp_encoded,
        angina_n, angina_y,
        *slope_encoded,
        raw.FastingBS,
        *scaled
    ]])

    print("🧪 Final model input vector:", features)
    print("🧬 Feature names:", feature_names)
    print("🧮 Final feature vector to model:", features.tolist())
    print("🧷 ST_Slope input:", raw.ST_Slope)
    print("🧾 One-hot encoded slope:", slope_encoded)

    # ✅ Prediction
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]
    label = "Heart Disease" if prediction == 1 else "No Heart Disease"

    # ✅ SHAP explainability
    explanation = "No report generated for this prediction."
    top_features = []

    if prediction == 1:
        try:
            shap_val = explainer.shap_values(features)[0]
            top_features = get_top_contributors(shap_val, features, feature_names)

            if top_features:
                explanation = generate_heart_report(top_features, probability, label)

        except Exception as e:
            print("Explanation generation failed:", e)

    return {
        "prediction": int(prediction),
        "probability": round(float(probability), 4),
        "label": label,
        "top_contributors": top_features,
        "explanation": explanation
    }
