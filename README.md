# Global SportPredict AI — Deployable Website

This package is a deployable Next.js website for a global AI sports analysis platform.

## Included

- Production-ready Next.js app
- Serverless prediction API at `/api/predict`
- Sports API at `/api/sports`
- Global sports dashboard
- 15 sport modules including soccer, basketball, NFL, MLB, NHL, tennis, cricket, MMA, F1, golf, and esports
- 25-factor prediction framework
- Dockerfile and docker-compose
- Vercel configuration
- Optional FastAPI backend prototype in `/backend`
- PostgreSQL schema for future real data integration

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Upload/import this repository.
2. Set the project root to `frontend`.
3. Keep the default build command: `npm run build`.
4. Deploy.

Because the prediction API is now implemented as Next.js API routes, Vercel does not need a separate backend service for the demo version.

## Deploy with Docker

```bash
docker compose up --build
```

Open `http://localhost:3000`.

## Production data integrations to add next

- Official sports data APIs
- News and injury feeds
- Betting odds feeds, where legally allowed
- Weather API
- PostgreSQL database using `backend/schema.sql`
- Trained sport-specific ML models

## Important note

The current prediction engine is a deterministic demo model. It is structured like a real engine, but it uses mock factor scores until real data feeds and trained models are connected.
