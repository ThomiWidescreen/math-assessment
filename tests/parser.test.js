const Parser = require('../src/parser');

describe('Parser Tests', () => {
  let parser;

  beforeAll(() => {
    // Declare the Parser instance once before all tests
    parser = new Parser();
  });

  test('should parse a simple addition expression', () => {
    const result = parser.parse('2 + 3');
    expect(result).toBe(5);
  });

  test('should parse a simple subtraction expression', () => {
    const result = parser.parse('10 - 4');
    expect(result).toBe(6);
  });

  test('should parse a simple multiplication expression', () => {
    const result = parser.parse('5 * 3');
    expect(result).toBe(15);
  });

  test('should parse a simple division expression', () => {
    const result = parser.parse('20 / 5');
    expect(result).toBe(4);
  });

  test('should handle mixed operations with precedence', () => {
    const result = parser.parse('2 + 3 * 4 - 6 / 2');
    expect(result).toBe(11); // 2 + (3 * 4) - (6 / 2) = 2 + 12 - 3 = 11
  });

  test('should handle parentheses correctly', () => {
    const result = parser.parse('(2 + 3) * (4 - 2)');
    expect(result).toBe(10); 
  });

  test('should handle nested parentheses', () => {
    const result = parser.parse('(2 + (3 * 4)) - 10');
    expect(result).toBe(4); // 2 + 12 - 10 = 4
  });

  test('should throw SyntaxError for invalid input', () => {
    expect(() => parser.parse('2 + * 3')).toThrow(SyntaxError);
  });

  test('should throw SyntaxError for missing closing parenthesis', () => {
    expect(() => parser.parse('(2 + 3 * 4')).toThrow(SyntaxError);
  });

  test('should parse a complex expression with various operators', () => {
    const result = parser.parse('2 + 3 - 4 * (5 / (1 + 1))');
    expect(result).toBe(-5); 
  });
});
