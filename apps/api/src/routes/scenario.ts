import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { defaultGrowthScenarios } from '@bitcoin24/models';
import { z } from 'zod';

const scenarioParamsSchema = z.object({
  id: z.string()
});

type ScenarioParams = z.infer<typeof scenarioParamsSchema>;

export async function scenarioRoutes(app: FastifyInstance, _opts: FastifyPluginOptions) {
  app.get('/', async () => ({ scenarios: defaultGrowthScenarios }));

  app.get<{ Params: ScenarioParams }>('/:id', async (request, reply) => {
    const { id } = scenarioParamsSchema.parse(request.params);
    const scenario = defaultGrowthScenarios.find((item) => item.id === id);

    if (!scenario) {
      return reply.notFound('Scenario not found');
    }

    return { scenario };
  });
}
