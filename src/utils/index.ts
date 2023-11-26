export function numberWithCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function transCommaStringToNumber(str: string = '') {
  return parseInt(str.split(',').join(''));
}
