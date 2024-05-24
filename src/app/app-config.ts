export const AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  timeout: 30000, // Tiempo de espera en milisegundos
  retryAttempts: 3, // Número de reintentos para solicitudes fallidas
  logLevel: 'debug', // Nivel de registro de la aplicación
  featureFlags: {
    enableNewFeature: true // Indicador de activación de una nueva característica
  }
};
