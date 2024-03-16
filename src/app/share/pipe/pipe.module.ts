import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search/search.pipe';
import { RupiahPipe } from './rupiah/rupiah.pipe';



@NgModule({
  declarations: [
    SearchPipe,
    RupiahPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchPipe,
    RupiahPipe
  ]
})
export class PipeModule { }
