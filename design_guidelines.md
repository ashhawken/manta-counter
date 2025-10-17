# Nightbot Counter - Design Guidelines

## Project Analysis

This is primarily a **backend API service** for Nightbot/Twitch integration. The core functionality (counter display/increment) happens in Twitch chat, not in a web UI. However, streamers benefit from a simple admin dashboard to monitor and manage counters.

## Design Approach: Minimal Utility Dashboard

**Selected Approach**: Function-focused design system  
**Rationale**: Utility-first application for streamers to monitor/manage counters - efficiency over aesthetics  
**Reference System**: Linear's minimal, focused interface approach

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (recommended for streaming environment):
- Background: 222 15% 8%
- Surface: 222 15% 12%
- Border: 222 10% 20%
- Text Primary: 210 10% 95%
- Text Secondary: 210 5% 70%
- Accent: 270 70% 65% (Twitch purple alignment)
- Success: 142 76% 36%

### B. Typography

**Font Stack**: System fonts for instant loading  
`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

- Counter Display: 600 weight, 4xl-6xl size
- Labels: 500 weight, sm-base size
- Endpoints/Code: Monospace, sm size

### C. Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 8, 12, 16  
**Grid System**: Single column, max-w-2xl centered container  
**Component Density**: Compact - maximize info density

### D. Component Library

**Core Components**:
1. **Counter Display Card**: Large number with label, last updated timestamp
2. **API Endpoint Cards**: Copyable URLs with status indicators
3. **Action Buttons**: Primary (reset counter), secondary (copy endpoint)
4. **Simple Stats**: Request count, last increment time
5. **Minimal Header**: Logo/title, connection status indicator

**No Navigation Required**: Single-page dashboard

### E. Layout Structure

```
Header (fixed, h-16): App title + Nightbot connection status
Main Container (max-w-2xl, centered, p-8):
  - Counter Display (prominence: large text, p-12)
  - API Endpoints Grid (2 cards: !manta, !mantaadd with copy buttons)
  - Quick Stats Bar (last activity, total requests)
  - Reset Button (destructive styling, confirmation required)
```

### F. Interaction Patterns

- **Copy to clipboard**: Click endpoint URL to copy (with toast confirmation)
- **Real-time updates**: WebSocket for live counter changes
- **Visual feedback**: Green pulse on counter when incremented
- No animations beyond functional feedback

## Key Principles

1. **Information First**: Counter value is hero element
2. **Streamer-Friendly**: Dark mode, distraction-free
3. **Copy-First UX**: One-click endpoint copying for Nightbot setup
4. **Status Clarity**: Clear indicators for API health/connection
5. **Mobile Aware**: Responsive but desktop-optimized (streamers use desktops)

## Images

**No hero images needed** - this is a utility dashboard, not a marketing site. Optional small Nightbot logo in header for branding recognition.

---

**Note**: If no web interface is needed initially, the application can launch as API-only. This dashboard can be added later as `/admin` route for streamer management.