import { predictMatch } from '../../lib/predictionEngine';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  return res.status(200).json(predictMatch(req.body || {}));
}
