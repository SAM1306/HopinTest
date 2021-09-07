const appDefaults = {
  baseUrl: 'http://localhost:3001/',
  name: process.env.name || 'Saumil Jain',
  error: process.env.error,
  requestStatus: process.env.requestStatus,
  errorMessage: process.env.errorMessage,
  errorCode: process.env.errorCode,
};

module.exports = appDefaults;
