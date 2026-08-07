export const securityHeaders = {
  frameOptions: "SAMEORIGIN",
  contentTypeOptions: "nosniff",
  referrerPolicy: "strict-origin-when-cross-origin",
  permissionsPolicy: "camera=(), microphone=(), geolocation=()"
} as const;
