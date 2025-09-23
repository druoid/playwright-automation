import { test, expect } from '@playwright/test';
import { makeGetRequest } from '../../utils/apiUtils';

test('Get all products list', async ({ baseURL }) => {
  const endpoint = '/api/productsList';
  const url = `${baseURL}${endpoint}`; // Use baseURL from the config
  const response = await makeGetRequest(url);

  expect(response.status()).toEqual(200);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);

  responseBody.products.forEach((product: { category: string; }) => {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');
    expect(product.category).toHaveProperty('usertype');
    expect(product.category).toHaveProperty('category');
  });
});