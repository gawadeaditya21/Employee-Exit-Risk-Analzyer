from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import EmployeeInput, PredictionOutput
from app.model import model_service

app = FastAPI(
    title="Employee Exit Risk Analyzer API",
    description="Backend service predicting employee job-change risk."
)

# Enable CORS (Cross-Origin Resource Sharing) for React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any frontend port (e.g., http://localhost:3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Employee Exit Risk Analyzer API is live!"}

@app.post("/predict", response_model=PredictionOutput)
def predict_exit(input_data: EmployeeInput):
    try:
        # Convert Pydantic object to Python dictionary and get prediction
        result = model_service.predict(input_data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))