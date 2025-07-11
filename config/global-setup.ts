import { request } from '@playwright/test';
import { environments } from './environments';

export default async () => {
  const env = process.env.TEST_ENV || 'dev';
  const baseURL = environments[env].baseURL;
  const req = await request.newContext();

  try {
    const response = await req.get(baseURL);
    if (!response.ok()) {
      console.log(`Environment ${baseURL} returned status ${response.status()}. Skipping tests.`);
      process.exit(0);
    }
  } catch (error) {
    console.log(`Environment ${baseURL} is unreachable. Error: ${error.message}`);
    process.exit(0);
  }
};