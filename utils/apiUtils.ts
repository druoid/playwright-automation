import { request } from '@playwright/test';

export async function makeGetRequest(url: string) {
  const response = await (await request.newContext()).get(url);
  return response;
}