import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDetailComponent } from './my-detail/my-detail.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { Route, RouterModule } from '@angular/router';

const route: Route[] = [
  {
    path: '',
    component: MyDetailComponent
  },
  {
    path: 'edit',
    component: EditDetailComponent
  }
]

@NgModule({
  declarations: [
    MyDetailComponent,
    EditDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class EmployeeModule { }
