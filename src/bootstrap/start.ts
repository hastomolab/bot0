import { createDiscordClient } from '../app/create-discord-client.js';
import { env } from '../config/env.js';
import { logger } from '../infrastructure/logger/logger.js';
import { registerShutdownHandlers } from './shutdown.js';

export async function startApplication(): Promise<void> {
  const client = createDiscordClient();

  registerShutdownHandlers(client);

  client.once('ready', (readyClient) => {
    logger.info(
      {
        user: readyClient.user.tag,
      },
      'Discord client ready',
    );
  });

  await client.login(env.DISCORD_TOKEN);

  logger.info('Application started');
}
