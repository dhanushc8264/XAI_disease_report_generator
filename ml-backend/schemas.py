from pydantic import BaseModel, Field, ConfigDict
from typing import Literal


class DiabetesRawInput(BaseModel):
    systolic_bp: int = Field(..., ge=80, le=250)
    diastolic_bp: int = Field(..., ge=50, le=150)
    cholesterol_mg_dl: int = Field(..., ge=100, le=400)
    bmi: float = Field(..., ge=10.0, le=60.0)
    smoker: bool
    phys_activity: bool
    heart_disease_or_attack: bool
    diff_walk: bool
    sex: str = Field(..., pattern="^(Male|Female)$")  # 🔧 FIXED
    age_years: int = Field(..., ge=1, le=120)
    stroke: bool
    annual_income: int = Field(..., ge=0)
    chol_check: bool
    hvy_alcohol_consump: bool
    gen_health: int = Field(..., ge=1, le=5)


class HeartRawInput(BaseModel):
        Age: int
        Sex: Literal["M", "F"]
        ChestPainType: Literal["ASY", "ATA", "NAP", "TA", "None"]
        RestingBP: int
        Cholesterol: int
        FastingBS: int
        MaxHR: int
        ExerciseAngina: Literal["Y", "N"]
        Oldpeak: float
        ST_Slope: Literal["Up", "Flat", "Down"] = Field(alias="stSlope")

        model_config = ConfigDict(populate_by_name=True)
      
    