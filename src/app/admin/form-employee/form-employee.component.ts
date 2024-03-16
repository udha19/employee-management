import { Employee } from './../_model/employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss'],
})
export class FormEmployeeComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0]
  id: string = '';
  employee = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: '',
  }
  isEdit = false;
  isAvailable = false;

  groups = [
    {label: "Group Angsoka"},
    {label: "Group Borobudur"},
    {label: "Group Cetho"},
    {label: "Group Dermo"},
    {label: "Group Gedong Songo"},
    {label: "Group Ijo"},
    {label: "Group Jago"},
    {label: "Group Kalasan"},
    {label: "Group Laras"},
    {label: "Group Merak"},
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AdminService
  ) {
    this.id = this.route.snapshot.url[1] ? this.route.snapshot.url[1].path : '';
    if (this.id != '') this.getEmployee()
  }

  ngOnInit(): void {
  }
  getEmployee() {
    this.isEdit = true;
    this.service.getEmployee(this.id).subscribe(res => {
      this.employee = res;
    })
  }

  checkid(event: any) {
    if(event.length > 5) {
      this.service.getEmployee(event).subscribe({
        next: res => {
          this.isAvailable = false
        },
        error: err => {
          this.isAvailable = true
        }
      })
    }

  }

  submit(e: any){
    e.preventDefault()
    // debugger
    if(this.isEdit){
      this.service.updateEmployee(this.employee).subscribe({
        next: res => {
          const succes_message = 'update employee success'
          this.successOpertion(succes_message)
        },
        error: err => {}
      })
    } else {
      this.service.addEmployee(this.employee).subscribe(res => {
        const succes_message = 'add employee success'
        this.successOpertion(succes_message)
      })
    }
  }

  successOpertion(message: string) {
    Swal.fire('success', message, 'success').then(res => {
      this.router.navigateByUrl('/admin')
    })
  }

}
