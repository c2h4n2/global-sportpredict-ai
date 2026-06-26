export const FACTOR_WEIGHTS = {
  team_information: 0.06,
  player_information: 0.06,
  match_history: 0.05,
  recent_performance: 0.09,
  team_news: 0.03,
  player_news: 0.03,
  injury_module: 0.08,
  transfer_trade_module: 0.04,
  coach_analysis: 0.04,
  schedule_fatigue: 0.06,
  home_advantage: 0.05,
  weather: 0.03,
  referee_umpire: 0.03,
  betting_market: 0.08,
  advanced_analytics: 0.10,
  psychological_factors: 0.03,
  tactical_matchup: 0.06,
  venue_analysis: 0.03,
  external_factors: 0.02,
  historical_prediction_tracking: 0.03,
  ai_feature_engineering: 0.03,
  machine_learning_models: 0.03,
  prediction_outputs: 0.02,
  data_sources: 0.02,
  continuous_learning: 0.02
};

export const SUPPORTED_SPORTS = {
  soccer: { display: 'Soccer', score_unit: 'goals', outcomes: ['home_win', 'draw', 'away_win'], base: [1.55, 1.25, 2.0], features: ['xG', 'xGA', 'xA', 'possession', 'pressing', 'set pieces', 'cards', 'keeper form'] },
  basketball: { display: 'Basketball', score_unit: 'points', outcomes: ['home_win', 'away_win'], base: [111, 108, 18], features: ['offensive rating', 'defensive rating', 'pace', 'true shooting', 'rebound rate', 'bench depth'] },
  american_football: { display: 'American Football', score_unit: 'points', outcomes: ['home_win', 'away_win'], base: [24, 21, 9], features: ['EPA', 'DVOA', 'QB rating', 'red zone', 'special teams'] },
  baseball: { display: 'Baseball', score_unit: 'runs', outcomes: ['home_win', 'away_win'], base: [4.6, 4.1, 2.5], features: ['ERA', 'WHIP', 'OPS', 'WAR', 'bullpen', 'park factor'] },
  hockey: { display: 'Hockey', score_unit: 'goals', outcomes: ['home_win', 'away_win'], base: [3.2, 2.8, 1.7], features: ['Corsi', 'Fenwick', 'save %', 'GSAx', 'power play'] },
  tennis: { display: 'Tennis', score_unit: 'sets/games', outcomes: ['player_a_win', 'player_b_win'], base: [2, 1, 1], features: ['surface record', 'serve %', 'break points', 'H2H', 'fatigue'] },
  cricket: { display: 'Cricket', score_unit: 'runs/wickets', outcomes: ['team_a_win', 'team_b_win'], base: [168, 160, 25], features: ['pitch', 'toss', 'strike rate', 'economy', 'dew'] },
  rugby: { display: 'Rugby', score_unit: 'points', outcomes: ['home_win', 'draw', 'away_win'], base: [26, 22, 10], features: ['scrum', 'lineout', 'territory', 'kicking', 'discipline'] },
  volleyball: { display: 'Volleyball', score_unit: 'sets/points', outcomes: ['home_win', 'away_win'], base: [3, 2, 1], features: ['serve receive', 'attack efficiency', 'blocks', 'rotation matchups'] },
  mma: { display: 'MMA/UFC', score_unit: 'decision/finish', outcomes: ['fighter_a_win', 'fighter_b_win'], base: [1, 0, 1], features: ['reach', 'striking accuracy', 'takedowns', 'submissions', 'cardio'] },
  boxing: { display: 'Boxing', score_unit: 'decision/KO', outcomes: ['fighter_a_win', 'fighter_b_win'], base: [1, 0, 1], features: ['reach', 'power', 'defense', 'chin', 'stamina'] },
  formula_1: { display: 'Formula 1', score_unit: 'position/time', outcomes: ['driver_win', 'podium'], base: [1, 4, 3], features: ['qualifying', 'race pace', 'tires', 'pit stops', 'safety car'] },
  nascar: { display: 'NASCAR', score_unit: 'position', outcomes: ['driver_win', 'top_5'], base: [1, 6, 5], features: ['track type', 'long-run speed', 'pit crew', 'cautions'] },
  golf: { display: 'Golf', score_unit: 'strokes', outcomes: ['winner', 'top_5'], base: [-10, -8, 4], features: ['strokes gained', 'course fit', 'putting', 'weather'] },
  esports: { display: 'Esports', score_unit: 'maps/rounds', outcomes: ['team_a_win', 'team_b_win'], base: [2, 1, 1], features: ['map pool', 'patch meta', 'role matchups', 'roster changes'] }
};

function seededRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += h << 13; h ^= h >>> 7; h += h << 3; h ^= h >>> 17; h += h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

export function predictMatch({ home_team = 'Team A', away_team = 'Team B', sport = 'soccer' }) {
  const sportKey = SUPPORTED_SPORTS[sport] ? sport : 'soccer';
  const cfg = SUPPORTED_SPORTS[sportKey];
  const rand = seededRandom(`${home_team}|${away_team}|${sportKey}`);
  const factor_scores = Object.fromEntries(Object.keys(FACTOR_WEIGHTS).map(k => [k, Number(((rand() * 2) - 1).toFixed(3))]));
  const weighted_score = Object.entries(FACTOR_WEIGHTS).reduce((sum, [k, w]) => sum + factor_scores[k] * w, 0);
  const [baseHome, baseAway, scale] = cfg.base;
  let homeScore = Number((baseHome + weighted_score * scale).toFixed(1));
  let awayScore = Number((baseAway - weighted_score * scale).toFixed(1));
  if (sportKey !== 'golf') { homeScore = Math.max(0, homeScore); awayScore = Math.max(0, awayScore); }
  const rawHome = Math.max(0.04, Math.min(0.92, 0.5 + weighted_score));
  let probabilities;
  if (cfg.outcomes.includes('draw')) {
    const draw = Math.max(0.08, Math.min(0.34, 0.22 - Math.abs(weighted_score) * 0.25));
    probabilities = { home_win: Number((rawHome * (1 - draw) * 100).toFixed(1)), draw: Number((draw * 100).toFixed(1)), away_win: Number(((1 - rawHome) * (1 - draw) * 100).toFixed(1)) };
  } else {
    probabilities = { [cfg.outcomes[0]]: Number((rawHome * 100).toFixed(1)), [cfg.outcomes[1]]: Number(((1 - rawHome) * 100).toFixed(1)) };
  }
  const topFactors = Object.entries(factor_scores).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 6).map(([factor, score]) => ({ factor, score }));
  return { sport: cfg.display, home_team, away_team, probabilities, predicted_score: { [home_team]: homeScore, [away_team]: awayScore, unit: cfg.score_unit }, confidence: Number((55 + Math.abs(weighted_score) * 120).toFixed(1)), top_factors: topFactors, sport_specific_features: cfg.features, note: 'Demo prediction uses deterministic mock factor scores. Connect real data feeds and trained models for production accuracy.' };
}
