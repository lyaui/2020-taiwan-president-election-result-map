import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberWithCommas(num: number) {
  if (typeof num !== 'number') return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function transCommaStringToNumber(input: unknown = '') {
  if (typeof input === 'number') return input;
  if (typeof input !== 'string') return NaN;
  return parseFloat(input.replace(/,/g, ''));
}
