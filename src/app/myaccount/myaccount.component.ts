import {Component, OnInit, EventEmitter, TemplateRef, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from "../api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  accountdetails: any=[];
  public myForm: any;
  public endpoint = 'addorupdatedata';

  constructor(public fb: FormBuilder, public router: Router,private route: ActivatedRoute, public apiservice: ApiService, private cookieService: CookieService) {
    this.myForm = this.fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.accountdetails=data['results'].res[0];
      console.log(this.accountdetails);
    });
    this.myForm = this.fb.group({
      id: [this.accountdetails._id],
      firstname: [this.accountdetails.firstname],
      lastname: [this.accountdetails.lastname, Validators.required],
      age: [this.accountdetails.age, Validators.required],
      phone: [this.accountdetails.phone, Validators.required],
      email: [this.accountdetails.email, Validators.required],
      city: [this.accountdetails.city, Validators.required]
        });
    console.log('this.myForm.value');
    console.log(this.myForm.value);
  }
  clearfun(val) {
    this.myForm.controls[val].markAsUntouched();
  }
  onSubmit() {
    let x: any;
    let data = this.myForm.value;
    console.log(data);

    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }

    // let data1 = {data: data,source:'users',sourceobj:['joquuser_id','gamecategoryid']};
    let data1 = {data: data,source:'users'};

    if (this.myForm.valid) {
        this.apiservice.postData(this.endpoint, data1).subscribe(res => {
          let result: any = {};
          result = res;
          if (result.status == 'error') {
          }
          if (result.status == 'success') {
            this.router.navigate(['/admindashboard']);
            console.log('status');
          }
        }, error => {
          console.log('Oooops!');
        });
      }
  }
}
