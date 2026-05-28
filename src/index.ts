import { env } from './config/env.js';
import { logger } from './infrastructure/logger/logger.js';

void env;

logger.info('Application bootstrap initialized');
