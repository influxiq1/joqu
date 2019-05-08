import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
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
  public myForm1: any;
  public categorylist: any;
  public categorynamefromlist: any=null;

  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      parentcategoryid: [''],
      categoryname: ['', Validators.required]
    });
 /*   this.myForm1 = this.fb.group({
      categoryname: ['', Validators.required],
      parentcategoryid: ['']
    });*/
    this.getcategorylist();
  }

  getcategorylist(){
    let data2 = {source:'gamecategory'};
    this.apiService.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
    });
  }

  onSubmit() {
    let x: any;
    let data = this.myForm.value;
    console.log(data);

    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    let data1;
    if(this.myForm.controls['parentcategoryid']!=''){
     data1 = {data: data,source:'gamecategory',sourceobj:['parentcategoryid']};
    }else{
       data1 = {data: data,source:'gamecategory'};
    }

    if (this.myForm.valid) {
        this.apiService.postData(this.endpoint, data1).subscribe(res => {
          let result: any = {};
          result = res;
          if (result.status == 'error') {
          }
          if (result.status == 'success') {
            this.myForm.reset();
            this.categorynamefromlist=null;
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
  categorynameselect(){
    console.log('- --------- '+this.categorynamefromlist);
      this.myForm.controls['parentcategoryid'].patchValue(this.categorynamefromlist);
  }
 /* onSubmit1() {
    let x: any;
    let data = this.myForm1.value;
    console.log(data);

    for (x in this.myForm1.controls) {
      this.myForm1.controls[x].markAsTouched();
    }
    let data1 = {data: data,source:'gamecategory',sourceobj:['parentcategoryid']};
    console.log(this.myForm1.value);
    if (this.myForm1.valid) {
      this.apiService.postData(this.endpoint, data1).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'error') {
        }
        if (result.status == 'success') {
          this.router.navigate(['/gamecategorylist']);
          console.log('status');
        }
      }, error => {
        console.log('Oooops!');
      });
    }
  }*/
}
