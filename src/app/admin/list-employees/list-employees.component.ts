import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Employee } from '../_model/employee';
import { AdminService, StateService } from '../_service/admin.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  list_employees: Observable<Employee[]> | undefined;
  show_employees: Observable<Employee[]> | undefined;
  subscription: Subscription | undefined;

  limit: number = 10;
  pages: any = [];
  page: number = 0;
  query: string = '';
  state: any = {
    page: '',
    query: '',
  };
  loading: boolean = false;

  sorting: any = [
    { value: 'name-asc', label: 'By Name (ascending)' },
    { value: 'name-desc', label: 'By Name (descending)' },
    { value: 'age-young', label: 'By Youngest Age ' },
    { value: 'age-old', label: 'By Oldest Age ' },
    { value: 'salary-high', label: 'By Highest salary ' },
    { value: 'salary-low', label: 'By Lowest salary ' },
  ];

  constructor(
    private service: AdminService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.page = this.stateService.page$.getValue();
    this.query = this.stateService.query$.getValue();
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }
  getEmployees() {
    this.list_employees = this.service.getEmployees();
    this.setPage();
    this.setList();
  }

  setPage() {
    this.pages = [];
    this.subscription = this.list_employees?.subscribe((v) => {
      v.forEach((item, index) => {
        if (index % this.limit == 0) {
          this.pages.push(index / this.limit + 1);
        }
      });
    });

  }

  setList(opt?: string) {
    let employees: Employee[] = [];

    switch (opt) {
      case 'name-asc':
        this.list_employees = this.list_employees?.pipe(
          map((data) => {
            data.sort((a, b): any => {
              return a.firstName.localeCompare(b.firstName);
            });

            return data;
          })
        );
        break;
      case 'name-desc':
        this.list_employees = this.list_employees?.pipe(
          map((data) => {
            data.sort((a, b): any => {
              return b.firstName.localeCompare(a.firstName);
            });

            return data;
          })
        );
        break;
      case 'age-old':
        this.list_employees = this.list_employees?.pipe(
          map((data) => {
            data.sort((a, b): any => {
              const date1 = Date.parse(a.birthDate);
              const date2 = Date.parse(b.birthDate);
              return date2 - date1;
            });

            return data;
          })
        );
        break;
      case 'age-young':
        this.list_employees = this.list_employees?.pipe(
          map((data) => {
            data.sort((a, b): any => {
              const date1 = Date.parse(a.birthDate);
              const date2 = Date.parse(b.birthDate);
              return date1 - date2;
            });

            return data;
          })
        );
        break;
        case 'salary-low':
          this.list_employees = this.list_employees?.pipe(map((data) => {
            data.sort((a,b): any => {
              return a.basicSalary - b.basicSalary
            })
            return data
          }))
          break;
          case 'salary-high':
            this.list_employees = this.list_employees?.pipe(map((data) => {
              data.sort((a,b): any => {
                return b.basicSalary - a.basicSalary
              })
              return data
            }))
            break;
      default:
        this.list_employees?.subscribe((em) => {
          em.map((item, index) => {
            if (index <= this.page * this.limit) employees.push(item);
            this.show_employees?.subscribe((t) => {
              return employees;
            });
          });
        });
        break;
    }
  }

  sortData(event: any) {
    const val = event.target.value;
    this.setList(val);
  }

  setLimit(limit: any) {
    this.limit = limit.target.value;
    this.setPage();
  }
  changePage(page: number) {
    this.stateService.page$.next(page);
    this.page = page;
    this.setList();
  }

  search() {
    this.stateService.query$.next(this.query);
  }

  deleteEmployee(username: string) {
    this.service.deleteEmployee(username).subscribe((res) => {
      this.successAlert('delete employee success');
      this.getEmployees()
      return false;
    });
  }

  successAlert(message: string) {
    Swal.fire('success', message, 'success');
  }
}
