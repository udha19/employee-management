import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_model/employee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://65f5d7ff41d90c1c5e0a40f6.mockapi.io/data/employee';


  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<any>(this.baseUrl);
  }

  getEmployee(user_name: string) {
    return this.http.get<any>(this.baseUrl + '/' + user_name);
  }
  addEmployee(employee: Employee){
    return this.http.post(this.baseUrl, employee)
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<any>(this.baseUrl + '/' + employee.id, employee)
  }
  deleteEmployee(user_name: string) {
    return this.http.delete(this.baseUrl +'/'+ user_name)
  }

}
export class StateService {
  page$ = new BehaviorSubject<number>(1);
  query$ = new BehaviorSubject<string>('');
}
