SUPPORTED_SPORTS = {
    "soccer": {
        "display": "Soccer",
        "score_unit": "goals",
        "outcomes": ["home_win", "draw", "away_win"],
        "features": ["xG", "xGA", "xA", "possession", "pressing", "set_pieces", "cards", "keeper_form"]
    },
    "basketball": {
        "display": "Basketball",
        "score_unit": "points",
        "outcomes": ["home_win", "away_win"],
        "features": ["offensive_rating", "defensive_rating", "pace", "true_shooting", "rebound_rate", "turnovers", "bench_depth"]
    },
    "american_football": {
        "display": "American Football",
        "score_unit": "points",
        "outcomes": ["home_win", "away_win"],
        "features": ["EPA", "DVOA", "qb_rating", "sack_rate", "red_zone", "turnover_margin", "special_teams"]
    },
    "baseball": {
        "display": "Baseball",
        "score_unit": "runs",
        "outcomes": ["home_win", "away_win"],
        "features": ["ERA", "WHIP", "OPS", "WAR", "bullpen", "starter_matchup", "park_factor", "exit_velocity"]
    },
    "hockey": {
        "display": "Hockey",
        "score_unit": "goals",
        "outcomes": ["home_win", "away_win"],
        "features": ["Corsi", "Fenwick", "save_percentage", "GSAx", "power_play", "penalty_kill", "goalie_fatigue"]
    },
    "tennis": {
        "display": "Tennis",
        "score_unit": "sets/games",
        "outcomes": ["player_a_win", "player_b_win"],
        "features": ["surface_record", "serve_percentage", "break_points", "H2H", "fatigue", "indoor_outdoor"]
    },
    "cricket": {
        "display": "Cricket",
        "score_unit": "runs/wickets",
        "outcomes": ["team_a_win", "team_b_win"],
        "features": ["batting_average", "bowling_average", "strike_rate", "economy", "pitch", "toss", "dew"]
    },
    "rugby": {"display": "Rugby", "score_unit": "points", "outcomes": ["home_win", "draw", "away_win"], "features": ["scrum", "lineout", "kicking", "territory", "discipline"]},
    "volleyball": {"display": "Volleyball", "score_unit": "sets/points", "outcomes": ["home_win", "away_win"], "features": ["serve_receive", "attack_efficiency", "blocks", "errors", "rotation_matchups"]},
    "mma": {"display": "MMA/UFC", "score_unit": "decision/finish", "outcomes": ["fighter_a_win", "fighter_b_win"], "features": ["reach", "striking_accuracy", "takedowns", "submission_rate", "cardio", "damage_absorbed"]},
    "boxing": {"display": "Boxing", "score_unit": "decision/KO", "outcomes": ["fighter_a_win", "fighter_b_win"], "features": ["reach", "power", "defense", "chin", "stamina", "opponent_quality"]},
    "formula_1": {"display": "Formula 1", "score_unit": "position/time", "outcomes": ["driver_win", "podium", "points_finish"], "features": ["qualifying", "race_pace", "tire_degradation", "pit_stops", "track_history", "weather", "safety_car"]},
    "nascar": {"display": "NASCAR", "score_unit": "position", "outcomes": ["driver_win", "top_5", "top_10"], "features": ["track_type", "qualifying", "long_run_speed", "pit_crew", "cautions", "drafting"]},
    "golf": {"display": "Golf", "score_unit": "strokes", "outcomes": ["winner", "top_5", "cut_made"], "features": ["strokes_gained", "course_fit", "driving_accuracy", "putting", "weather", "recent_form"]},
    "esports": {"display": "Esports", "score_unit": "maps/rounds", "outcomes": ["team_a_win", "team_b_win"], "features": ["map_pool", "patch_meta", "role_matchups", "recent_form", "LAN_online", "roster_changes"]}
}
