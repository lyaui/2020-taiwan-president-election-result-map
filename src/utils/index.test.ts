import { numberWithCommas, transCommaStringToNumber } from '@/utils';

describe('numberWithCommas', () => {
  test('should format number with commas when number is greater than 999', () => {
    const positiveNumber = 12345;

    const positiveFormatted = numberWithCommas(positiveNumber);

    expect(positiveFormatted).toBe('12,345');
  });

  test('should format number with commas when number is less than 999', () => {
    const negativeNumber = -12345;

    const negativeFormatted = numberWithCommas(negativeNumber);

    expect(negativeFormatted).toBe('-12,345');
  });

  test('should format number without commas when number is between -999 and 999', () => {
    const positiveNumber = 123;
    const negativeNumber = -123;

    const positiveFormatted = numberWithCommas(positiveNumber);
    const negativeFormatted = numberWithCommas(negativeNumber);

    expect(positiveFormatted).toBe('123');
    expect(negativeFormatted).toBe('-123');
  });
});

describe('transCommaStringToNumber', () => {
  test('should format number with commas when number is greater than 999', () => {
    const positiveNumStr = '12,345';

    const positiveFormatted = transCommaStringToNumber(positiveNumStr);

    expect(positiveFormatted).toBe(12345);
  });

  test('should format number with commas when number is less than 999', () => {
    const negativeNumStr = '-12,345';

    const negativeFormatted = transCommaStringToNumber(negativeNumStr);

    expect(negativeFormatted).toBe(-12345);
  });

  test('should format number without commas when number is between -999 and 999', () => {
    const positiveNumStr = '123';
    const negativeNumStr = '-123';

    const positiveFormatted = transCommaStringToNumber(positiveNumStr);
    const negativeFormatted = transCommaStringToNumber(negativeNumStr);

    expect(positiveFormatted).toBe(123);
    expect(negativeFormatted).toBe(-123);
  });

  test('should return NaN for invalid numeric string', () => {
    const fooStr = 'foo';

    const formattedStr = transCommaStringToNumber(fooStr);

    expect(formattedStr).toBeNaN();
  });
});
