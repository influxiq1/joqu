import {Component, OnInit, EventEmitter, TemplateRef, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  msg: string;
}

@Component({
  selector: 'app-joquedit',
  templateUrl: './joquedit.component.html',
  styleUrls: ['./joquedit.component.css']
})
export class JoqueditComponent implements OnInit {
  public modeldata : any;
  public modelid : any;
  endpoint:any='datalist';
  endpoint1:any='addorupdatedata';
  public myForm: any;
  public endpoint2: any="statusupdate";

  constructor(  public _http: HttpClient, private router: Router, public route : ActivatedRoute, public apiservice: ApiService,public cookieService: CookieService,public fb: FormBuilder, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.modelid = params['pagename'];
      console.log(this.modelid);
    });
    this.myForm = this.fb.group({
          id: [''],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          age: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', JoqueditComponent.validateEmail],
          city: ['', Validators.required]
        }
    );
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log(data);
      console.log('data from route ... !!!');
      console.log('json',data['results']);
      this.modeldata=data['results'].res[0];
      this.myForm = this.fb.group({
            id: [this.modeldata._id],
            firstname: [this.modeldata.firstname, Validators.required],
            lastname: [this.modeldata.lastname, Validators.required],
            age: [this.modeldata.age, Validators.required],
            phone: [this.modeldata.phone, Validators.required],
            email: [this.modeldata.email, JoqueditComponent.validateEmail],
            city: [this.modeldata.city, Validators.required]
          }
      );
    });
   /* let data1;
    if(this.modelid==null){
      data1={_id:this.cookieService.get('id')};
    }else{
      data1={_id:this.modelid};
    }

    let data2 = {"condition": data1,source:'users'};
    this.apiservice.postData(this.endpoint, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      if(result.res.length>0){
        this.modeldata=result.res[0];
        console.log('this.modeldata');
        console.log(this.modeldata);
        this.myForm = this.fb.group({
              id: [this.modeldata._id],
              firstname: [this.modeldata.firstname, Validators.required],
              lastname: [this.modeldata.lastname, Validators.required],
              age: [this.modeldata.age, Validators.required],
              phone: [this.modeldata.phone, Validators.required],
              email: [this.modeldata.email, JoqueditComponent.validateEmail],
              city: [this.modeldata.city, Validators.required]
            }
            );
      }
    });*/
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
    let data1 = {data: data,source:'users'};
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
          let data2={'status':3,'id':this.modeldata._id};
          let data4 = {data: data2,source:'users'};
          console.log(data4);
          this.apiservice.postData(this.endpoint2, data4).subscribe(res => {
            let result: any = {};
            result = res;
            console.log(result);
            if(result.status=='success'){
              this.router.navigate(['/joqulist']);
            }
             }, error => {
            console.log('Oooops!');
          });
        }
      }, error => {
        console.log('Oooops!');
      });
    }
  }



}


@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest3 {
  public modalmsg: any;

  constructor(public dialogRef: MatDialogRef<Updatetest3>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg = data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}