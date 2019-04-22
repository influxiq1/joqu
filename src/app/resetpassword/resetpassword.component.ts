import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../app/api.service';
export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public myForm: any;
  public show = false;
  public accesscode: any;
  public id: any;
  public result: any;
  public error: any;
  public endpoint = 'resetpasswordvalidate';
  public endpoint1 = 'updatepasswordwhenresetiig';
  constructor( public fb: FormBuilder, private router: Router, public apiService: ApiService, public route: ActivatedRoute, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.accesscode = params['token'];
      console.log(this.accesscode);
      this.getuserdetails();
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
          password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          confirmpassword: ['', Validators.required]},
        {validator: this.machpassword('password', 'confirmpassword')});
  }
  clearfun(val) {
    console.log('ok');
    this.myForm.controls[val].markAsUntouched();
  }

  machpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
          confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({notEquivalent: true});
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }

  onSubmit() {
    let x: any;
    let data = {_id: this.id, password: this.myForm.value.password};
    console.log(data);
    console.log(this.myForm.value.password);
    console.log(this.myForm.value.confirmpassword);
    for (x in this.myForm.value) {
      console.log(this.myForm.controls[x]);
      this.myForm.controls[x].markAsTouched();
    }
    if (this.myForm.valid) {

      this.result = this.apiService.postDatawithoutToken(this.endpoint1, data).subscribe(res => {
        let result: any = {};
        result = res;
        console.log('result.item');
        console.log(result);
        if (result.status == 'success') {
          this.router.navigate(['/login']);
        }
        if (result.status == 'error') {
          this.error = result.msg;
        }
    /*    // console.log(result.item);
        if (result.status == 'error1') {
          this.errormg = result.msg;
        }
        if (result.status == 'error2') {
          this.errormg = result.msg;
        }
        if (result.status == 'success') {
          this.showmessage = 'We’ve sent an email to this address to reset your password.';
        }*/
      });
    }
  }
  getuserdetails() {
    let data = {temp_forgetpass_key: this.accesscode};
    this.result = this.apiService.postDatawithoutToken(this.endpoint, data).subscribe(res => {
      let result: any = {};
      result = res;
      console.log('result.item');
      if (result.status == 'success') {
        this.show = true;
        this.id = result.data._id;

        // this.showmessage = 'We’ve sent an email to this address to reset your password.';
      }
      if (result.status == 'error') {
        console.log('open dialog');
        const dialogRef = this.dialog.open(Dialogtest, {
          // width: '250px',
          data: {id: result.msg}
        });
        this.error = result.msg;
      }
    });
  }

}


@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})
export class Dialogtest {
public error: any;
  constructor(
      public dialogRef: MatDialogRef<Dialogtest>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.error = data.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
