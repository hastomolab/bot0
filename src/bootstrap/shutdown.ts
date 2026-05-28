import type { Client } from 'discord.js';

import { logger } from '../infrastructure/logger/logger.js';

export function registerShutdownHandlers(client: Client): void {
  const shutdown = async (signal: string): Promise<void> => {
    logger.warn({ signal }, 'Shutdown signal received');

    try {
      client.destroy();

      logger.info('Discord client destroyed');

      process.exit(0);
    } catch (error) {
      logger.error(error, 'Failed during graceful shutdown');

      process.exit(1);
    }
  };

  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
}
