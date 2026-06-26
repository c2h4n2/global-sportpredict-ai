import { useMemo, useState } from 'react';

const sports = [
  ['soccer', 'Soccer'], ['basketball', 'Basketball'], ['american_football', 'American Football'],
  ['baseball', 'Baseball'], ['hockey', 'Hockey'], ['tennis', 'Tennis'], ['cricket', 'Cricket'],
  ['rugby', 'Rugby'], ['volleyball', 'Volleyball'], ['mma', 'MMA/UFC'], ['boxing', 'Boxing'],
  ['formula_1', 'Formula 1'], ['nascar', 'NASCAR'], ['golf', 'Golf'], ['esports', 'Esports']
];

const modules = [
  'AI Prediction Engine', 'Live Match AI', 'News AI', 'Injury AI', 'Transfer/Trade AI',
  'Betting/Odds Intelligence', 'Fantasy Sports AI', 'Sport-Specific Models', 'Explainable AI',
  'Model Accuracy Lab', 'Admin Data Hub', 'Continuous Learning'
];

const factors = [
  'Team information', 'Player information', 'Match history', 'Recent performance', 'Team news',
  'Player news', 'Injury module', 'Transfer/trade module', 'Coach analysis', 'Schedule/fatigue',
  'Home advantage', 'Weather', 'Referee/umpire', 'Betting market', 'Advanced analytics',
  'Psychological factors', 'Tactical matchup', 'Venue analysis', 'External factors',
  'Historical prediction tracking', 'AI feature engineering', 'Machine learning models',
  'Prediction outputs', 'Data sources', 'Continuous learning'
];

const sportFeatures = {
  soccer: ['xG', 'xGA', 'formation', 'pressing', 'cards', 'set pieces'],
  basketball: ['pace', 'net rating', 'true shooting', 'rebound rate', 'bench depth'],
  american_football: ['EPA', 'DVOA', 'QB rating', 'red zone', 'special teams'],
  baseball: ['ERA', 'WHIP', 'OPS', 'WAR', 'starter matchup', 'park factor'],
  hockey: ['Corsi', 'Fenwick', 'save %', 'GSAx', 'power play'],
  tennis: ['surface', 'serve %', 'break points', 'H2H', 'fatigue'],
  cricket: ['pitch', 'toss', 'strike rate', 'economy', 'dew factor'],
  rugby: ['scrum', 'lineout', 'territory', 'kicking', 'discipline'],
  volleyball: ['serve receive', 'attack efficiency', 'blocks', 'rotation matchups'],
  mma: ['reach', 'striking', 'takedowns', 'submissions', 'cardio'],
  boxing: ['reach', 'power', 'defense', 'chin', 'stamina'],
  formula_1: ['qualifying', 'race pace', 'tires', 'pit stops', 'safety car'],
  nascar: ['track type', 'long-run speed', 'pit crew', 'cautions'],
  golf: ['strokes gained', 'course fit', 'putting', 'weather'],
  esports: ['map pool', 'patch meta', 'role matchups', 'roster changes']
};

export default function Home() {
  const [homeTeam, setHomeTeam] = useState('Team A');
  const [awayTeam, setAwayTeam] = useState('Team B');
  const [sport, setSport] = useState('soccer');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectedFeatures = useMemo(() => sportFeatures[sport] || [], [sport]);

  async function getPrediction() {
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ home_team: homeTeam, away_team: awayTeam, sport })
      });
      setPrediction(await res.json());
    } catch (error) {
      setPrediction({ error: 'Prediction API unavailable. Check the deployment logs.' });
    }
    setLoading(false);
  }

  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">Global SportPredict AI</div>
        <div className="links"><span>Predictions</span><span>Live AI</span><span>Sports</span><span>Odds</span><span>Accuracy</span></div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">Global AI sports analytics platform</p>
          <h1>One prediction system for every major sport.</h1>
          <p>Pre-match predictions, live probability updates, player forecasting, injury/trade impact, betting intelligence, fantasy insights, and explainable AI.</p>
          <div className="pillRow">{sports.slice(0, 10).map(([key, label]) => <span className="pill" key={key}>{label}</span>)}</div>
        </div>
        <div className="predictor">
          <h2>Try a prediction</h2>
          <input value={homeTeam} onChange={e => setHomeTeam(e.target.value)} placeholder="Team / Player / Driver A" />
          <input value={awayTeam} onChange={e => setAwayTeam(e.target.value)} placeholder="Team / Player / Driver B" />
          <select value={sport} onChange={e => setSport(e.target.value)}>
            {sports.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <div className="mini"><strong>Sport-specific features:</strong> {selectedFeatures.join(', ')}</div>
          <button onClick={getPrediction}>{loading ? 'Predicting...' : 'Predict Match/Event'}</button>
        </div>
      </section>

      {prediction && !prediction.error && (
        <section className="result">
          <h2>{prediction.match}</h2>
          <p>{prediction.sport_profile?.display} prediction · {prediction.sport_profile?.score_unit}</p>
          <div className="cards">
            {Object.entries(prediction.probabilities).map(([k, v]) => <div className="card" key={k}><strong>{k.replaceAll('_', ' ')}</strong><span>{v}%</span></div>)}
            <div className="card"><strong>Confidence</strong><span>{prediction.confidence}%</span></div>
          </div>
          <h3>Predicted score/result</h3><pre>{JSON.stringify(prediction.predicted_score, null, 2)}</pre>
          <h3>Top explanation factors</h3>
          <ul>{prediction.top_factors.map(f => <li key={f.factor}>{f.factor}: {f.impact_score}</li>)}</ul>
        </section>
      )}
      {prediction?.error && <section className="error">{prediction.error}</section>}

      <section className="modules">
        <h2>Platform modules</h2>
        <div className="grid">{modules.map(m => <div className="module" key={m}>{m}</div>)}</div>
      </section>

      <section className="modules">
        <h2>All 25 prediction factor groups</h2>
        <div className="grid">{factors.map((f, i) => <div className="module" key={f}>{i + 1}. {f}</div>)}</div>
      </section>
    </main>
  );
}
