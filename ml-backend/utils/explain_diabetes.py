import shap
import numpy as np

def create_explainer(model):
    return shap.TreeExplainer(model)

def get_top_contributors(shap_values_row, input_row, feature_names, top_n=5):
    abs_vals = np.abs(shap_values_row).astype(float)
    top_indices = np.argsort(abs_vals)[::-1][:top_n]

    results = []
    for idx in top_indices:
        value = float(input_row[0, idx])
        shap_score = float(shap_values_row[idx])
        feature = str(feature_names[idx])
        direction = "increased risk" if shap_score > 0 else "reduced risk"

        results.append({
            "feature": feature,
            "value": value,
            "impact": direction,
            "shap": shap_score
        })

    return results
