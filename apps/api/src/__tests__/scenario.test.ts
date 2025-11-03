import { buildServer } from '../main';

describe('scenario routes', () => {
  it('returns all scenarios', async () => {
    const server = await buildServer();
    const response = await server.inject({ method: 'GET', url: '/scenarios' });

    expect(response.statusCode).toBe(200);
    const payload = response.json();
    expect(payload.scenarios.length).toBeGreaterThan(0);
  });
});
