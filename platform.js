const layers = [
  ['Data Collection', 'Official stats, scores, injuries, lineups, odds, weather, news, transfers and social signals.'],
  ['Data Quality & ETL', 'Normalize teams, players, leagues, events, venues, time zones, duplicate records and missing data.'],
  ['Feature Engineering', 'Rolling form, ELO, fatigue, injury impact, team chemistry, market movement and sport-specific metrics.'],
  ['AI Model Layer', 'Classification for win/draw/loss, regression for scores, time-series trends, NLP sentiment and ensemble stacking.'],
  ['Prediction API', 'Serves win probabilities, expected scores, confidence, key factors, player forecasts and live updates.'],
  ['Web Experience', 'Dashboards for fans, analysts, fantasy users, betting research and internal admins.']
];

const outputs = ['Win / loss / draw probability', 'Predicted score', 'Over / under lean', 'Upset risk', 'Player performance forecast', 'Injury impact', 'Trade/transfer impact', 'Fantasy insights', 'Live win probability', 'Explainable AI summary'];

export default function Platform() {
  return <main className="page"><nav className="nav"><div className="brand">Global SportPredict AI</div><div className="links"><a href="/">Home</a><a href="/sports">Sports</a><a href="/platform">Platform</a></div></nav><section className="modules"><h1 className="pageTitle">Platform architecture</h1><div className="timeline">{layers.map(([title, text], i) => <div className="step" key={title}><b>{i + 1}. {title}</b><p>{text}</p></div>)}</div></section><section className="modules"><h2>Prediction outputs</h2><div className="grid">{outputs.map(o => <div className="module" key={o}>{o}</div>)}</div></section></main>;
}
