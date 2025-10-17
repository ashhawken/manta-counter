# Nightbot Counter - Manta Tracker

## Overview
A Node.js/Express backend service with a React dashboard for managing Twitch Nightbot counters. The application provides API endpoints that Nightbot can call to display and increment a counter value in Twitch chat, along with a beautiful web interface for monitoring and management.

## Purpose
Enable Twitch streamers to track custom counters (like "manta count") through Nightbot chat commands while providing a real-time dashboard to monitor activity.

## Recent Changes
- **2025-10-16**: Enhanced with history tracking and !eggfound command
  - Added `/api/eggfound` endpoint for resetting counter via Nightbot
  - Implemented counter history tracking (saves previous values before reset)
  - Built history display UI with visual indicators for reset types
  - Distinguished between manual resets and egg-found resets
  
- **2025-10-16**: Initial implementation
  - Created Express backend with `/api/manta` and `/api/mantaadd` endpoints
  - Built React dashboard with real-time counter display
  - Implemented in-memory storage for counter values
  - Added dark mode support (default)
  - Designed Twitch-themed purple UI with minimal, utility-first approach

## Architecture

### Backend (Node.js + Express)
- **Endpoints**:
  - `GET /api/manta` - Returns "It has been [count] kill(s) since the last egg" (singular "kill" only when count=1)
  - `GET /api/mantaadd` - Increments counter and returns "Manta has now been slain [count] time(s)" (singular "time" only when count=1)
  - `GET /api/eggfound` - Resets counter via Nightbot (saves to history), returns egg found message
  - `GET /api/setkills?count=X` - Sets counter to specific value X, returns "Manta count set to X kill(s)" with proper grammar
  - `GET /api/stats` - Returns JSON stats for dashboard (includes history)
  - `POST /api/reset` - Resets counter to 0 (saves to history)

### Frontend (React + TypeScript)
- Single-page dashboard application
- Real-time updates via polling (2-second intervals)
- Dark mode by default (Twitch purple theme)
- Components:
  - Counter display (hero element)
  - API endpoint cards with copy-to-clipboard (!manta, !mantaadd, !eggfound)
  - Statistics display (total requests, views, adds)
  - Counter history display (shows previous values and reset types)
  - Reset button with confirmation dialog
  - Setup instructions

### Storage
- In-memory storage (MemStorage)
- Tracks: counter value, last increment time, request counts
- Stores history of counter resets with timestamps and reset types (manual/eggfound)

## User Preferences
- Dark mode preferred (streaming environment)
- Minimal, utility-first design
- Copy-first UX for easy Nightbot setup
- Real-time updates essential

## Project Structure
```
├── server/
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # In-memory counter storage
│   └── index.ts          # Express server setup
├── client/
│   └── src/
│       ├── pages/
│       │   └── dashboard.tsx    # Main dashboard
│       ├── components/
│       │   ├── theme-provider.tsx
│       │   └── theme-toggle.tsx
│       └── App.tsx
└── shared/
    └── schema.ts         # TypeScript types
```

## How to Use

### For Streamers
1. Visit the dashboard at the deployed URL
2. Copy the API endpoint URLs from the dashboard
3. In Nightbot dashboard, create four custom commands:
   - Command: `!manta` → URL: `https://your-url.replit.app/api/manta`
   - Command: `!mantaadd` → URL: `https://your-url.replit.app/api/mantaadd`
   - Command: `!eggfound` → URL: `https://your-url.replit.app/api/eggfound`
   - Command: `!setkills` → URL: `https://your-url.replit.app/api/setkills?count=$(query)`
4. Monitor counter and history in real-time on the dashboard

### For Viewers
- Type `!manta` in chat to see current count
- Type `!mantaadd` to increment the count by 1
- Type `!eggfound` to reset the counter (previous count saved to history)
- Type `!setkills <number>` to manually set the counter to a specific value

## Technical Details
- Port: 5000 (frontend served through Vite)
- Polling interval: 2 seconds for live updates
- Storage: In-memory (resets on server restart)
- Theme: Dark mode with Twitch purple accent (270° 70% 65%)

## Next Steps (Future Enhancements)
- Add persistent database storage
- WebSocket for real-time updates instead of polling
- Multiple counter support
- Counter history/analytics
- Custom counter names
- Export data functionality
