import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

    public myForm: any;
    public showmessage: any = '';
    public result: any;
    public endpoint = 'sendforgotpasswordemail';
    public endpoint1 = 'resetpassword';
    public url1: any = '';
    public serverurl: any = '';
    public errormg: any = '';
    constructor(public fb: FormBuilder, private router: Router, private apiService: ApiService) {
        this.url1 = apiService.domain;
        // console.log("url");
        // console.log(this.url1);
        this.serverurl = (this.url1 + this.endpoint);
        console.log(this.serverurl);
    }

    ngOnInit() {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])]
        });
    }
    clearfun(val) {
        console.log("ok");
        this.myForm.controls[val].markAsUntouched();
    }

    forgetPassword() {
        this.errormg='';
        this.showmessage='';
        let x: any;
        let data = this.myForm.value;
        console.log('data');
        // console.log(data.websiteurl);
        console.log(this.myForm.value);
        for (x in this.myForm.value) {
            console.log(this.myForm.controls[x]);
            this.myForm.controls[x].markAsTouched();
        }
        if (this.myForm.valid) {

            data.websiteurl = this.apiService.resetpassword + this.endpoint1 + '/';
            console.log(data.websiteurl);
            this.result = this.apiService.postDatawithoutToken(this.endpoint, data).subscribe(res => {
                let result: any = {};
                result = res;
                console.log('result.item');
                // console.log(result.item);
                if (result.status == 'error1') {
                    this.errormg = result.msg;
                }
                if (result.status == 'error2') {
                    this.errormg = result.msg;
                }
                if (result.status == 'success') {
                    this.showmessage = 'We’ve sent an email to this address to reset your password.';
                }
            });
        }
    }

}
