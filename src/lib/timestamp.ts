/**
 * Wraps Date.now() so impure-call sites live outside component render scope
 * (Date.now() itself is always safe here — it's only ever read from event-handler-
 * triggered code, e.g. after a network response, never during render).
 */
export function nowTimestamp(): number {
  return Date.now();
}
