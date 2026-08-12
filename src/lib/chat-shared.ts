// Constants shared between the /api/chat route (server) and ChatWidget
// (client) that must stay in sync but carry no server-only dependencies.

// Text is the entire response body on a 429 -- the client matches on it
// verbatim to tell "rate limited" apart from other failures.
export const RATE_LIMIT_MESSAGE = 'Too many requests. Please wait a moment and try again.';

// Mirrors route.ts's RATE_WINDOW_MS -- used client-side to show a countdown
// rather than an indefinite "try again" error.
export const RATE_LIMIT_COOLDOWN_MS = 60_000;
