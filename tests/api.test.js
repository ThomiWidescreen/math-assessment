
const request = require('supertest');
const server = require('../src/index'); // Import the server to run the tests

describe('POST /evaluate', () => {

  // Test for successful addition
  test('should evaluate a simple addition expression', async () => {
    const response = await request(server)
      .post('/evaluate')
      .send({ expression: '2 + 3' }); // Sending JSON body with the expression

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(5); // Expecting result to be 5
  });

  // Test for successful subtraction
  test('should evaluate a simple subtraction expression', async () => {
    const response = await request(server)
      .post('/evaluate')
      .send({ expression: '10 - 4' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(6);
  });

  // Test for successful mixed operations
  test('should evaluate a mixed operation expression with precedence', async () => {
    const response = await request(server)
      .post('/evaluate')
      .send({ expression: '2 + 3 * 4 - 6 / 2' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(11); // 2 + (3 * 4) - (6 / 2) = 11
  });

  // Test for invalid input (missing expression)
  test('should return error when expression is missing', async () => {
    const response = await request(server)
      .post('/evaluate')
      .send({}); // No expression in the body

    expect(response.status).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('No expression found');
  });

  // Test for invalid expression
  test('should return error for invalid expression', async () => {
    const response = await request(server)
      .post('/evaluate')
      .send({ expression: '2 + * 3' }); // Invalid expression

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Unexpected token'); // Adjust depending on error message from Parser
  });
});
