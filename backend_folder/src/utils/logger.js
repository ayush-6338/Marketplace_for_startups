const redactMeta = (meta = {}) => {
  const blockedKeys = new Set(['password', 'token', 'authorization']);

  return Object.fromEntries(
    Object.entries(meta).filter(([key]) => !blockedKeys.has(key.toLowerCase()))
  );
};

const writeLog = (level, message, meta = {}) => {
  const payload = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...redactMeta(meta),
  };

  const log = level === 'error' ? console.error : console.log;
  log(JSON.stringify(payload));
};

export const logger = {
  info: (message, meta) => writeLog('info', message, meta),
  warn: (message, meta) => writeLog('warn', message, meta),
  error: (message, meta) => writeLog('error', message, meta),
};
