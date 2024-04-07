import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;

  username: string = '';
  employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: '',
  }

  constructor(
    private route: ActivatedRoute,
    private service: AdminService
  ) {
    this.username = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : '';
    if (this.username != '') this.getEmployee()
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  getEmployee() {
    this.subscription = this.service.getEmployee(this.username).subscribe(res => {
      this.employee = res;
    })
  }
}
