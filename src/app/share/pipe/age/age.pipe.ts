import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): unknown {
    let dob = new Date(value)
    let now = new Date
    let diff = new Date( Date.now() - dob.getTime())
    let age = Math.abs(diff.getUTCFullYear() - now.getUTCFullYear())
    return age +' years old';
  }

}
