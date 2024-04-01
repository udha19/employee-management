import { Employee } from './../_model/employee';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';
import Swal from 'sweetalert2';
import { MdbCheckboxDirective } from 'mdb-angular-ui-kit/checkbox';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss'],
})
export class FormEmployeeComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0]
  id: string = '';
  status: string = 'Active'
  isStatusActive: boolean = true

  @ViewChild(MdbCheckboxDirective, { static: true }) switch!: MdbCheckboxDirective;

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
      this.setStatus(this.employee.status)
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
  setStatus(e: any){
    this.status = e
    if(e == 'Active'){
      this.isStatusActive = true
    } else {
      this.isStatusActive = false
    }
  }
  onSwitchChange(e: any){
    let status = e.target.checked
    this.isStatusActive = status
    if(status){
      this.status = 'Active'
    } else {
      this.status = 'Inactive'
    }
    this.employee.status = this.status
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
