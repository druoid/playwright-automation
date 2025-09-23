import { test, expect } from '@playwright/test';
import { makeGetRequest } from '../../utils/apiUtils';

test('Get all brands list', async ({ baseURL }) => {
  const endpoint = '/api/brandsList';
  const url = `${baseURL}${endpoint}`; // Use baseURL from the config
  const response = await makeGetRequest(url);

  expect(response.status()).toEqual(200);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty('brands');
  expect(Array.isArray(responseBody.brands)).toBe(true);

  responseBody.brands.forEach((brand: { category: string; }) => {
    expect(brand).toHaveProperty('id');
    expect(brand).toHaveProperty('brand');
  });
});