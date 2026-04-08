# Bike Rentals - Production Repository

This is a clean, production-ready repository for the Bike Rentals platform.

## Structure
- `/client`: React (Vite) frontend.
- `/server`: Node.js (Express) backend.

## Deployment
- **Frontend**: Deploy from `/client` to Vercel.
- **Backend**: Deploy from `/server` to Render.

## Setup
### Backend
1. Go to `/server`
2. Run `npm install`
3. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
4. Run `npm start`

### Frontend
1. Go to `/client`
2. Run `npm install`
3. Set environment variable: `VITE_API_URL` (pointing to your server)
4. Run `npm run build`
