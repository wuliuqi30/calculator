const calculator = require('./calculator');

describe('add', () => {
  test('adds 0 and 0', () => {
    expect(calculator.operate(0, 0, add)).toBe(0);
  });

  test('adds 2 and 2', () => {
    expect(calculator.operate(2, 2, add)).toBe(4);
  });

  test('adds positive numbers', () => {
    expect(calculator.operate(2, 6, add)).toBe(8);
  });




});

describe('subtract', () => {
  test('subtracts numbers', () => {
    expect(calculator.subtract(10, 4)).toBe(6);
  });
});



describe('multiply', () => {
  test('multiplies two numbers', () => {
    expect(calculator.multiply(2, 4)).toBe(8);
  });

});




