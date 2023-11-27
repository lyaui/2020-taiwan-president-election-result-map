export function numberWithCommas(num: number) {
  if (typeof num !== 'number') return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function transCommaStringToNumber(str: string = '') {
  if (typeof str !== 'string') return str;
  return parseInt(str.split(',').join(''));
}
