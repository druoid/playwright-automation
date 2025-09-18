import { request } from '@playwright/test';
import { environments } from './environments';

type EnvironmentKey = 'dev' | 'test';

export default async () => {
  const env: EnvironmentKey = (process.env.TEST_ENV as EnvironmentKey) || 'dev';

  const environmentConfig = environments[env];
  if (!environmentConfig) {
    console.error(`Environment configuration for '${env}' is not defined.`);
    process.exit(1);
  }

  const baseURL = environmentConfig.baseURL;
  const req = await request.newContext();

  try {
    const response = await req.get(baseURL);
    if (!response.ok()) {
      console.log(`Environment ${baseURL} returned status ${response.status()}. Skipping tests.`);
      process.exit(0);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Environment ${baseURL} is unreachable. Error: ${error.message}`);
    } else {
      console.log(`Environment ${baseURL} is unreachable. Unknown error occurred.`);
    }
    process.exit(0);
  }
};
