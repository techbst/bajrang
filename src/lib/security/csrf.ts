export function isSameOriginRequest(origin: string | null, host: string | null) {
  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
