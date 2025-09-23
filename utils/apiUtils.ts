import { request } from '@playwright/test';

export async function makeGetRequest(url: string) {
  const context = await request.newContext();
  const response = await context.get(url);
  return response;
}

export async function makePostRequest(url: string, payload: object) {
  const context = await request.newContext();
  const response = await context.post(url, {
    data: payload, 
  });
  return response;
}