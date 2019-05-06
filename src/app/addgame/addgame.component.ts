import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';
import { environment } from '../../environments/environment';
declare var moment:any;
@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {
  public endpoint = 'addorupdatedata';
  public myForm: any;
  public imageuploadpath: any = environment.uploadfolder;
  public imagefilepath: any = environment.imagefilepath;
  public uploader: any = 'upload';

  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      gamename: ['', Validators.required],
      gamedescription: ['', Validators.required],
      st_dt: ['', Validators.required],
      enddt: ['', Validators.required],
      min_pay_of_amount: ['', Validators.required],
      max_pay_of_amount: ['', Validators.required],
      st_tm: ['', Validators.required],
      end_tm: ['', Validators.required]
    });
    this.apiService.uploadtype = 'single';
  }
  onSubmit() {
    console.log(this.myForm.value['st_dt']);
    console.log(moment(this.myForm.value['st_dt']).format('YYYY-MM-DD HH:mm'));

    let x: any;
    let data = this.myForm.value;
    console.log(data);
   
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }

    // console.log(this.apiService.fileservername);
    // console.log('this.apiService.fileservername[this.uploader]');
    // console.log(this.apiService.fileservername[this.uploader]);
    // console.log('this.apiService.profileimage');
    // data.data.images = this.apiService.fileservername[this.uploader];
    data.st_dt=new Date(this.myForm.value['st_dt']).getTime();
    data.enddt=new Date(this.myForm.value['enddt']).getTime();
    let data1 = {data: data,source:'game'};
    console.log(data1);
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


  // https://agranom.github.io/ngx-material-timepicker/

  
/*  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };*/
}
