type LogContext = Record<string, string | number | boolean | undefined>;

function sanitize(context?: LogContext) {
  return context;
}

export const logger = {
  info(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === "development") {
      console.info(message, sanitize(context));
    }
  },
  warn(message: string, context?: LogContext) {
    console.warn(message, sanitize(context));
  },
  error(message: string, context?: LogContext) {
    console.error(message, sanitize(context));
  }
};
