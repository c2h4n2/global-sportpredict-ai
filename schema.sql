CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    score_unit TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    name TEXT NOT NULL,
    country TEXT,
    season TEXT
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    league_id INTEGER REFERENCES leagues(id),
    name TEXT NOT NULL,
    country TEXT,
    elo_rating NUMERIC,
    power_rating NUMERIC,
    offensive_rating NUMERIC,
    defensive_rating NUMERIC,
    home_record TEXT,
    away_record TEXT,
    squad_depth_score NUMERIC,
    chemistry_score NUMERIC,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    team_id INTEGER REFERENCES teams(id),
    name TEXT NOT NULL,
    position TEXT,
    age INTEGER,
    market_value NUMERIC,
    injury_status TEXT,
    fitness_score NUMERIC,
    form_score NUMERIC,
    fatigue_score NUMERIC,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    league_id INTEGER REFERENCES leagues(id),
    home_team_id INTEGER REFERENCES teams(id),
    away_team_id INTEGER REFERENCES teams(id),
    match_date TIMESTAMP,
    venue TEXT,
    referee TEXT,
    weather_summary TEXT,
    home_score NUMERIC,
    away_score NUMERIC,
    status TEXT
);

CREATE TABLE sport_specific_stats (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    entity_type TEXT NOT NULL, -- team, player, match, driver, fighter
    entity_id INTEGER NOT NULL,
    stat_key TEXT NOT NULL,
    stat_value NUMERIC,
    stat_text TEXT,
    measured_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE news_items (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    team_id INTEGER REFERENCES teams(id),
    player_id INTEGER REFERENCES players(id),
    title TEXT,
    source TEXT,
    url TEXT,
    sentiment_score NUMERIC,
    impact_score NUMERIC,
    published_at TIMESTAMP
);

CREATE TABLE injuries (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    injury_type TEXT,
    severity TEXT,
    expected_return DATE,
    probability_of_playing NUMERIC,
    replacement_quality_score NUMERIC,
    impact_score NUMERIC
);

CREATE TABLE transfers_trades (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    from_team_id INTEGER REFERENCES teams(id),
    to_team_id INTEGER REFERENCES teams(id),
    status TEXT, -- rumor, likely, confirmed, completed
    transfer_date DATE,
    probability NUMERIC,
    impact_score NUMERIC
);

CREATE TABLE weather_reports (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    temperature NUMERIC,
    wind_speed NUMERIC,
    precipitation NUMERIC,
    humidity NUMERIC,
    summary TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE betting_odds (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    bookmaker TEXT,
    home_odds NUMERIC,
    draw_odds NUMERIC,
    away_odds NUMERIC,
    over_under_line NUMERIC,
    line_movement NUMERIC,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    model_version TEXT,
    predicted_home_score NUMERIC,
    predicted_away_score NUMERIC,
    probabilities JSONB,
    confidence_score NUMERIC,
    explanation JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE prediction_results (
    id SERIAL PRIMARY KEY,
    prediction_id INTEGER REFERENCES predictions(id),
    actual_home_score NUMERIC,
    actual_away_score NUMERIC,
    prediction_correct BOOLEAN,
    score_error NUMERIC,
    evaluated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE model_versions (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER REFERENCES sports(id),
    name TEXT NOT NULL,
    algorithm TEXT,
    training_window TEXT,
    accuracy NUMERIC,
    calibration_error NUMERIC,
    deployed_at TIMESTAMP DEFAULT NOW()
);
