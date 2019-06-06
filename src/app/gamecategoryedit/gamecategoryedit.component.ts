import {Component, OnInit, EventEmitter, TemplateRef, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-gamecategoryedit',
  templateUrl: './gamecategoryedit.component.html',
  styleUrls: ['./gamecategoryedit.component.css']
})
export class GamecategoryeditComponent implements OnInit {

  public endpoint = 'addorupdatedata';
  public endpoint1 = 'datalist';
  public myForm: any;
  public categorylist: any;
  public categoryid: any;
  public categorydata: any;

  constructor( private router: Router, public route : ActivatedRoute, public apiservice: ApiService,public fb: FormBuilder) {
    this.route.params.subscribe(params => {
      this.categoryid = params['pagename'];
      console.log(this.categoryid);
    });
    this.myForm = this.fb.group({
      id: [''],
      parentcategoryid: [''],
      categoryname: ['', Validators.required],
      status: ['']
    });
    this.getcategorylist();
  }
  getcategorylist(){
    let data2 = {source:'gamecategory_view'};
    this.apiservice.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
    });
  }
  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log(data);
      console.log('data from route ... !!!');
      console.log('json',data['results']);
      this.categorydata=data['results'].res[0];

      let stat:any;
      if(this.categorydata.status==1) stat=true;
      else stat = false;


      this.myForm = this.fb.group({
        id: [this.categorydata._id],
        parentcategoryid: [this.categorydata.parentcategoryid],
        categoryname: [this.categorydata.categoryname],
        status: [stat]
          });
    });
    console.log( this.myForm.value);
  }


  inputblur(val:any){
    this.myForm.controls[val].markAsUntouched();
  }

  onSubmit() {
    let x: any;
    let data;
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }

    if(this.myForm.value['status']==true) this.myForm.value['status']=1;
    else this.myForm.value['status'] = 0;

    let data1;
    if(this.myForm.controls['parentcategoryid'].value!=''){
      console.log(1);
      data = this.myForm.value;
      data1 = {data: data,source:'gamecategory',sourceobj:['parentcategoryid']};
    }else{
      console.log(2);
      data = {
        id:this.myForm.controls['id'].value,
        categoryname:this.myForm.controls['categoryname'].value,
        status:this.myForm.value['status'],
        parentcategoryid:null
      };
      data1 = {data: data,source:'gamecategory'};
    }
    console.log(data1);

    if (this.myForm.valid) {
      this.apiservice.postData(this.endpoint, data1).subscribe(res => {
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
