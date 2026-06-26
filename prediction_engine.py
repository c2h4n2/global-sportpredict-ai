import random
from typing import Dict, Any, List
from sports_config import SUPPORTED_SPORTS

FACTOR_WEIGHTS = {
    "team_information": 0.06,
    "player_information": 0.06,
    "match_history": 0.05,
    "recent_performance": 0.09,
    "team_news": 0.03,
    "player_news": 0.03,
    "injury_module": 0.08,
    "transfer_trade_module": 0.04,
    "coach_analysis": 0.04,
    "schedule_fatigue": 0.06,
    "home_advantage": 0.05,
    "weather": 0.03,
    "referee_umpire": 0.03,
    "betting_market": 0.08,
    "advanced_analytics": 0.10,
    "psychological_factors": 0.03,
    "tactical_matchup": 0.06,
    "venue_analysis": 0.03,
    "external_factors": 0.02,
    "historical_prediction_tracking": 0.03,
    "ai_feature_engineering": 0.03,
    "machine_learning_models": 0.03,
    "prediction_outputs": 0.02,
    "data_sources": 0.02,
    "continuous_learning": 0.02,
}

SPORT_BASE_SCORES = {
    "soccer": (1.55, 1.25, 2.0),
    "basketball": (111, 108, 18),
    "american_football": (24, 21, 9),
    "baseball": (4.6, 4.1, 2.5),
    "hockey": (3.2, 2.8, 1.7),
    "rugby": (26, 22, 10),
    "volleyball": (3, 2, 1),
    "cricket": (168, 160, 25),
    "tennis": (2, 1, 1),
    "mma": (1, 0, 1),
    "boxing": (1, 0, 1),
    "formula_1": (1, 4, 3),
    "nascar": (1, 6, 5),
    "golf": (-10, -8, 4),
    "esports": (2, 1, 1),
}

def _mock_factor_score() -> float:
    return round(random.uniform(-1.0, 1.0), 3)

def supported_sports() -> List[Dict[str, Any]]:
    return [{"key": k, **v} for k, v in SUPPORTED_SPORTS.items()]

def _probabilities(weighted_score: float, sport: str) -> Dict[str, float]:
    cfg = SUPPORTED_SPORTS.get(sport, SUPPORTED_SPORTS["soccer"])
    outcomes = cfg["outcomes"]
    p_a = max(0.04, min(0.92, 0.50 + weighted_score))
    if "draw" in outcomes:
        draw = max(0.08, min(0.34, 0.22 - abs(weighted_score) * 0.25))
        home = p_a * (1 - draw)
        away = (1 - p_a) * (1 - draw)
        return {"home_win": round(home * 100, 1), "draw": round(draw * 100, 1), "away_win": round(away * 100, 1)}
    return {outcomes[0]: round(p_a * 100, 1), outcomes[1]: round((1 - p_a) * 100, 1)}

def predict_match(home_team: str, away_team: str, sport: str) -> Dict[str, Any]:
    sport = sport.lower().strip()
    if sport not in SUPPORTED_SPORTS:
        sport = "soccer"

    factor_scores = {factor: _mock_factor_score() for factor in FACTOR_WEIGHTS}
    weighted_score = sum(factor_scores[k] * FACTOR_WEIGHTS[k] for k in FACTOR_WEIGHTS)
    base_home, base_away, scale = SPORT_BASE_SCORES.get(sport, (1.5, 1.2, 2))

    home_score = round(base_home + weighted_score * scale, 1)
    away_score = round(base_away - weighted_score * scale, 1)
    if sport not in ["golf"]:
        home_score = max(0, home_score)
        away_score = max(0, away_score)

    top_factors = sorted(
        factor_scores.items(),
        key=lambda x: abs(x[1] * FACTOR_WEIGHTS[x[0]]),
        reverse=True
    )[:8]

    return {
        "match": f"{home_team} vs {away_team}",
        "sport": sport,
        "sport_profile": SUPPORTED_SPORTS[sport],
        "probabilities": _probabilities(weighted_score, sport),
        "predicted_score": {home_team: home_score, away_team: away_score},
        "confidence": round(min(92, abs(weighted_score) * 100 + 58), 1),
        "top_factors": [{"factor": factor.replace("_", " ").title(), "impact_score": score} for factor, score in top_factors],
        "all_factor_scores": factor_scores,
        "note": "Starter demo model. Replace mock feature scores with real data pipelines and trained sport-specific models."
    }
