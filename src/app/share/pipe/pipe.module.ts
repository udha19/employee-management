import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search/search.pipe';
import { RupiahPipe } from './rupiah/rupiah.pipe';
import { AgePipe } from './age/age.pipe';



@NgModule({
  declarations: [
    SearchPipe,
    RupiahPipe,
    AgePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchPipe,
    RupiahPipe,
    AgePipe
  ]
})
export class PipeModule { }
