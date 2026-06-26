import { SUPPORTED_SPORTS } from '../../lib/predictionEngine';
export default function handler(req, res) {
  res.status(200).json(Object.entries(SUPPORTED_SPORTS).map(([key, value]) => ({ key, ...value })));
}
