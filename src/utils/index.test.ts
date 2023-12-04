import { numberWithCommas } from '@/utils';

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
