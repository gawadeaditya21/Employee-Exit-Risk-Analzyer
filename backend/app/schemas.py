from pydantic import BaseModel

# Input schema: Expected fields when frontend calls the API
class EmployeeInput(BaseModel):
    city: str = "city_103"
    city_development_index: float = 0.92
    gender: str = "Male"
    relevent_experience: str = "Has relevent experience"
    enrolled_university: str = "no_enrollment"
    education_level: str = "Graduate"
    major_discipline: str = "STEM"
    experience: str = ">20"
    company_size: str = "50-99"
    company_type: str = "Pvt Ltd"
    last_new_job: str = "1"
    training_hours: int = 36

# Output schema: Response structure sent back to frontend
class PredictionOutput(BaseModel):
    prediction: int             # 0 = Stay, 1 = Change Job
    risk_label: str             # Low, Moderate, or High Exit Risk
    probability_percentage: float # Exit probability in percentage (e.g. 78.5%)