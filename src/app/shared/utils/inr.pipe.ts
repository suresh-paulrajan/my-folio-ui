import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inr',
  standalone: true
})
export class InrPipe implements PipeTransform {
  transform(value: number | string, digits: string = '1.0-0'): string {
    if (value === null || value === undefined) return '';
    let num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';
    // Indian number formatting
    let [integer, fraction] = num.toFixed(2).split('.');
    let lastThree = integer.substring(integer.length - 3);
    let otherNumbers = integer.substring(0, integer.length - 3);
    if (otherNumbers !== '')
      lastThree = ',' + lastThree;
    let formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    if (fraction && digits !== '1.0-0') {
      formatted += '.' + fraction;
    }
    return formatted;
  }
}
