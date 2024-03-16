import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  validUser: boolean = true;
  userName: string ='';
  password: string = '';
  ngOnInit(): void {
  }

  login() {
    if(this.userName == 'user' && this.password == 'password'){
      this.router.navigateByUrl('/admin')
    } else {
      this.validUser = false;
    }
  }

}
