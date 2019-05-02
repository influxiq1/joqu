import {Component, OnInit, EventEmitter, TemplateRef, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from "../api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-gameedit',
  templateUrl: './gameedit.component.html',
  styleUrls: ['./gameedit.component.css']
})
export class GameeditComponent implements OnInit {
  public modeldata : any;
  public modelid : any;
  endpoint:any='datalist';
  endpoint1:any='addorupdatedata';
  public myForm: any;
  public endpoint2: any="statusupdate";

  constructor(  public _http: HttpClient, private router: Router, public route : ActivatedRoute, public apiservice: ApiService,public cookieService: CookieService,public fb: FormBuilder) {
    this.route.params.subscribe(params => {
      this.modelid = params['pagename'];
      console.log(this.modelid);
    });
    this.myForm = this.fb.group({
      id: [''],
      gamename: ['', Validators.required],
      gamedescription: ['', Validators.required],
      st_dt: ['', Validators.required],
      enddt: ['', Validators.required],
      min_pay_of_amount: ['', Validators.required],
      max_pay_of_amount: ['', Validators.required],
      st_tm: ['', Validators.required],
      end_tm: ['', Validators.required]
    }
    );
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log(data);
      console.log('data from route ... !!!');
      console.log('json',data['results']);
      this.modeldata=data['results'].res[0];
      console.log('=============');
      // console.log(moment(data['results'].res[0].st_dt).format('YYYY-MM-DD HH:mm'));
      // console.log(moment(data['results'].res[0].st_dt).toDate().toString());
      console.log(this.modeldata.enddt);
      console.log(moment(this.modeldata.enddt).toDate().toString());
      this.myForm = this.fb.group({
        id: [this.modeldata._id],
        gamename: [this.modeldata.gamename, Validators.required],
        gamedescription: [this.modeldata.gamedescription, Validators.required],
        st_dt: [moment(this.modeldata.st_dt).toDate().toString(), Validators.required],
        enddt: [moment(this.modeldata.enddt).toDate().toString(), Validators.required],
        min_pay_of_amount: [this.modeldata.min_pay_of_amount, Validators.required],
        max_pay_of_amount: [this.modeldata.max_pay_of_amount, Validators.required],
        st_tm: [this.modeldata.st_tm, Validators.required],
        end_tm: [this.modeldata.end_tm, Validators.required]
          }
      );
    });
    console.log( this.myForm.value);
  }

  static validateEmail(control: FormControl){
    if (control.value == '') {
      return { 'invalidemail': true };
    }
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String(control.value).search(filter) == -1) {
      return { 'invalidemail': true };
    }
  }

  inputblur(val:any){
    this.myForm.controls[val].markAsUntouched();
  }

  onSubmit() {
    let x: any;
    let data = this.myForm.value;
    let data1 = {data: data,source:'game'};
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    if(this.myForm.valid){
      this.apiservice.postData(this.endpoint1, data1).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'error') {
        }
        if (result.status == 'success') {
          this.router.navigate(['/gamelist']);
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
