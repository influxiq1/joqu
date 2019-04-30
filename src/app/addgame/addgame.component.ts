import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {
  public endpoint = 'addorupdatedata';
  public myForm: any;

  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router ) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      gamename: ['', Validators.required],
      gamedescription: ['', Validators.required],
      dt: ['', Validators.required],
      enddt: ['', Validators.required],
      min_pay_of_amount: ['', Validators.required],
      max_pay_of_amount: ['', Validators.required],
      st_tm: ['', Validators.required],
      end_tm: ['', Validators.required]
    });
  }
  onSubmit() {
    let x: any;
    let data = this.myForm.value;
    let data1 = {data: data,source:'game'};
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    console.log(data);
    if (this.myForm.valid) {
      this.apiService.postData(this.endpoint, data1).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'error') {
        }
        if (result.status == 'success') {
        console.log('status');
        }
      }, error => {
        console.log('Oooops!');
      });
    }
  }
  clearfun(val) {
    this.myForm.controls[val].markAsUntouched();
  }
}
