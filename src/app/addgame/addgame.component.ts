import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';
import { environment } from '../../environments/environment';
declare var moment:any;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  msg: string;
}




import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
interface GameNode {
  name: string;
  children?: GameNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {
  public endpoint = 'addorupdatedata';
  public endpoint1 = 'datalist';
  public myForm: any;
  public imageuploadpath: any = environment.uploadfolder;
  public imagefilepath: any = environment.imagefilepath;
  public uploader: any = 'upload';
  public categorylist: any;
  public gametree1:GameNode[]=[];
  private transformer = (node: GameNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router,public dialog: MatDialog ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      joquuser_id: [this.cookieService.get('id')],
      gamename: ['', Validators.required],
      gamedescription: ['', Validators.required],
      st_dt: ['', Validators.required],
      enddt: ['', Validators.required],
      min_pay_of_amount: ['', Validators.required],
      max_pay_of_amount: ['', Validators.required],
      st_tm: ['', Validators.required],
      end_tm: ['', Validators.required],
      status: [''],
    });
    this.apiService.uploadtype = 'single';
    this.getcategorylist();

  }

  getcategorylist(){
    let data2 = {source:'gamecategorywisetest'};
    this.apiService.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
      for(let i in this.categorylist){
        if(this.categorylist[i].parentcategoryid==null){
          let child=[];
          for(let j in this.categorylist[i].subcategory){
            child.push({name:this.categorylist[i].subcategory[j].categoryname});
          }
          let val={};
          val={
            name:this.categorylist[i].categoryname,
            children:child
          }
          console.log(val);
          this.gametree1.push(val);
        }
      }
      this.dataSource.data = this.gametree1;
    });
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  onSubmit() {
    let x: any;
    let data = this.myForm.value;
    console.log(data);
   
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }

    if(this.myForm.value['status']==true) this.myForm.value['status']=1;
    else this.myForm.value['status'] = 0;

    data.images = this.apiService.fileservername[this.uploader];
    data.st_dt=new Date(this.myForm.value['st_dt']).getTime();
    data.enddt=new Date(this.myForm.value['enddt']).getTime();

    let data1 = {data: data,source:'game',sourceobj:['joquuser_id']};

    if (this.myForm.valid) {
      if (this.apiService.fileservername == null || this.apiService.fileservername[this.uploader] == null) {
        const dialogRef = this.dialog.open(Updatetest1, {
          data: {msg: 'Upload a Game Image'},
        });

      } else {
        this.apiService.postData(this.endpoint, data1).subscribe(res => {
          let result: any = {};
          result = res;
          if (result.status == 'error') {
          }
          if (result.status == 'success') {
            this.router.navigate(['/gamelist']);
            console.log('status');
          }
        }, error => {
          console.log('Oooops!');
        });
      }


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



@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest1 {
  public modalmsg: any;

  constructor(
      public dialogRef: MatDialogRef<Updatetest1>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg=data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}