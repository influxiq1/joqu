import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public endpoint = 'login';
  public myForm: any;
  public result: any;
  public ipinfo: any;
  public errormg: any = '';

  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      password: ['', Validators.required]
    });
    this.apiService.getclientip().subscribe(res => {

      console.log('res');
      console.log(res);
      this.ipinfo=res;
    });
  }
  onForgetPassword() {
    this.router.navigate((['/forgetpassword']));
  }
  clearfun(val) {
    this.myForm.controls[val].markAsUntouched();
  }

  onSubmit() {
    let x: any;
    this.errormg = '';
    let data = this.myForm.value;
    console.log('data');
    console.log(data);
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    data.ipinfo=this.ipinfo;
    console.log(data);
    console.log(data.ipinfo);
    if (this.myForm.valid) {
      console.log('valid');
      this.result = this.apiService.postlogin(this.endpoint, data).subscribe(res => {
          let result: any = {};
          result = res;
          if (result.status == 'error') {
            this.errormg = result.msg;
          }
          if (result.status == 'success') {
            this.cookieService.set('email', result.item.email);
            this.cookieService.set('password', result.item.password);
            this.cookieService.set('id', result.item._id);
            this.cookieService.set('jwttoken', result.token);
            this.cookieService.set('type', result.item.type);
            this.router.navigate(['/admindashboard']);
          }
        }, error => {
          console.log('Oooops!');
        });
    }
  }

}
