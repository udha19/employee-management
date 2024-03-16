import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {

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
    private router: Router,
    private service: AdminService
  ) {
    this.username = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : '';
    if (this.username != '') this.getEmployee()
  }

  ngOnInit(): void {
  }

  getEmployee() {
    this.service.getEmployee(this.username).subscribe(res => {
      this.employee = res;
    })
  }
}
