export default function justNumbers(text) {
  var numbers = text.replace(/[^0-9-]/g, '')
  if (numbers.indexOf('-') > 0) {
    numbers = numbers.replace(/-/g, '');
  }
  return Number(numbers)
}

export function getLastSegment(urlCurrently = '',chardivide = '/') {
  const segments = urlCurrently.split(chardivide);
  return segments[segments.length - 1];
}

export function convertDate(dateString) {
  const day = parseInt(dateString.slice(0, 2), 10);
  const month = parseInt(dateString.slice(2, 4), 10) - 1; 
  const year = parseInt(dateString.slice(4, 8), 10);
  return new Date(year, month, day);
}


export function CalcDiference(date1, date2) {
  const firstDate = convertDate(date1);
  const secondDate = convertDate(date2);
  const diferenceTime = Math.abs(secondDate - firstDate);
  const diferenceDays = Math.ceil(diferenceTime / (1000 * 60 * 60 * 24));
  return diferenceDays;
}


