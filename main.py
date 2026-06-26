from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prediction_engine import predict_match, supported_sports, FACTOR_WEIGHTS

app = FastAPI(title="Global SportPredict AI API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchPredictionRequest(BaseModel):
    home_team: str
    away_team: str
    sport: str = "soccer"

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Global SportPredict AI", "version": "2.0.0"}

@app.get("/sports")
def sports():
    return {"supported_sports": supported_sports()}

@app.get("/factors")
def factors():
    return {"factor_groups": [{"key": k, "weight": v} for k, v in FACTOR_WEIGHTS.items()]}

@app.post("/predict")
def predict(request: MatchPredictionRequest):
    return predict_match(request.home_team, request.away_team, request.sport)

@app.get("/platform/modules")
def platform_modules():
    return {
        "modules": [
            "AI Prediction Engine", "Live Match AI", "News AI", "Injury AI", "Transfer/Trade AI",
            "Betting/Odds Intelligence", "Fantasy Sports AI", "Model Accuracy Lab", "Admin Data Hub",
            "Sport-Specific Models", "Explainable AI", "Continuous Learning"
        ]
    }
