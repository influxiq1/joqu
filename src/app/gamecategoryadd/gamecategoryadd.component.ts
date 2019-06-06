import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-gamecategoryadd',
  templateUrl: './gamecategoryadd.component.html',
  styleUrls: ['./gamecategoryadd.component.css']
})
export class GamecategoryaddComponent implements OnInit {
  public endpoint = 'addorupdatedata';
  public endpoint1 = 'datalist';
  public myForm: any;
  public categorylist: any;

  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router, private route: ActivatedRoute ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      parentcategoryid: [''],
      categoryname: ['', Validators.required],
      status: ['']
    });
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.categorylist=data['results'].res;
      console.log(this.categorylist);
    });
  }



  onSubmit() {
    let x: any;
    let data;
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }

    if(this.myForm.value['status']==true) this.myForm.value['status']=1;
    else this.myForm.value['status'] = 0;

    // console.log('-------status---------');
    // console.log(this.myForm.value['status']);
    // console.log(this.myForm.controls['status'].value);
    // console.log('-------status---------');

    let data1;
    if(this.myForm.controls['parentcategoryid'].value!=''){
      console.log(1);
      data = this.myForm.value;
      data1 = {data: data,source:'gamecategory',sourceobj:['parentcategoryid']};
    }else{
      console.log(2);
      data = {
        categoryname:this.myForm.controls['categoryname'].value,
        status:this.myForm.value['status'],
        parentcategoryid:null
       };
      data1 = {data: data,source:'gamecategory'};
    }
    console.log(data1);
    if (this.myForm.valid) {
        this.apiService.postData(this.endpoint, data1).subscribe(res => {
          let result: any = {};
          result = res;
          if (result.status == 'error') {
          }
          if (result.status == 'success') {
            this.myForm.reset();
            this.router.navigate(['/gamecategorylist']);
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
