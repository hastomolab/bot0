import { startApplication } from './bootstrap/start.js';
import { logger } from './infrastructure/logger/logger.js';

process.on('uncaughtException', (error) => {
  logger.fatal(error, 'Uncaught exception');

  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled promise rejection');

  process.exit(1);
});

void startApplication();
