import { StateService } from './_service/admin.service';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { PipeModule } from '../share/pipe/pipe.module';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeesComponent
  },
  {
    path: ':username',
    component: DetailEmployeeComponent
  },
  {
    path: 'form',
    component: FormEmployeeComponent
  },
  {
    path: 'form/:username',
    component: FormEmployeeComponent
  }
];

@NgModule({
  declarations: [
    ListEmployeesComponent,
    FormEmployeeComponent,
    DetailEmployeeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MdbFormsModule,
    MdbModalModule,
    FormsModule,
    NgxCurrencyModule,
    PipeModule,
    MdbCheckboxModule,
    NgSelectModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    StateService
  ]
})
export class AdminModule { }
