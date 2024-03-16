import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah'
})
export class RupiahPipe implements PipeTransform {
  transform(value: number): unknown {
    return "Rp" + value.toLocaleString('id-ID');
  }

}
