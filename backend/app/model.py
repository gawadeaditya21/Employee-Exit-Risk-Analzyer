import os
import joblib
import pandas as pd

class ExitRiskModel:
    def __init__(self):
        # Locate and load the joblib model saved in Step 1
        model_path = os.path.join("saved_models", "random_forest_model.joblib")
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at '{model_path}'. Run train_model.py first.")
        
        self.model = joblib.load(model_path)

    def predict(self, input_data: dict) -> dict:
        # Convert dictionary input into a single-row Pandas DataFrame
        df_input = pd.DataFrame([input_data])
        
        # Calculate exit probability score (Probability of class 1)
        probability = float(self.model.predict_proba(df_input)[0][1])
        prediction = int(probability >= 0.5)
        
        # Categorize risk levels based on probability thresholds
        if probability >= 0.65:
            risk_label = "High Exit Risk"
        elif probability >= 0.35:
            risk_label = "Moderate Exit Risk"
        else:
            risk_label = "Low Exit Risk"

        return {
            "prediction": prediction,
            "risk_label": risk_label,
            "probability_percentage": round(probability * 100, 2)
        }

# Global instance initialized when server starts
model_service = ExitRiskModel()