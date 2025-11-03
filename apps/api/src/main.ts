import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import { fileURLToPath } from 'url';
import { scenarioRoutes } from './routes/scenario';

export async function buildServer() {
  const app = Fastify({
    logger: true
  });

  await app.register(cors, { origin: '*' });
  await app.register(sensible);
  await app.register(scenarioRoutes, { prefix: '/scenarios' });

  app.get('/health', async () => ({ status: 'ok' }));

  return app;
}

const isDirectRun = fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  buildServer()
    .then((server) => server.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
