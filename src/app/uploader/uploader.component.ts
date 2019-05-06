import {Component, OnInit, Input, EventEmitter, Output,Inject} from '@angular/core';
import {ApiService} from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  msg: string;
}
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public filenamevalc;
  public filenamevalc1;
  public modeldataemailis;
  public profileimg;
  public secondimg;
  public uploadtypec;
  public uploadpathc;
  public filepathc;
  public nameis;


  public upimages;
  public endpoint;
  public endpointsecondimg;
 // public pagename;


  /// public filenameval;
  @Input()
  set filenameval(filenameval: any) {
    // alert(filenameval);
    this.filenamevalc = filenameval;
    console.log('this.filenamevalc');
    console.log(this.filenamevalc);
  }
  @Input()
  set uploadpath(uploadpath: any) {
    // alert(filenameval);
    this.uploadpathc = uploadpath;
    console.log('this.uploadpathc');
    console.log(this.uploadpathc);
  }
  @Input()
  set filepath(filepath: any) {
    // alert(filenameval);
    this.filepathc = filepath;
    console.log('this.filepathc');
    console.log(this.filepathc);
  }
  @Input()
  set uploadtype(uploadtype: any) {
    // alert(filenameval);
    this.uploadtypec = uploadtype;
    console.log('this.uploadtypec');
    console.log(this.uploadtypec);
  }
  @Input()
  set updatesourceurl(updatesourceurl: any) {
    // alert(filenameval);
    this.endpoint = updatesourceurl;
    console.log('this.endpoint');
    console.log(this.endpoint);
  }
  @Input()
  set updatesecondimagesourceurl(updatesecondimagesourceurl: any) {
    this.endpointsecondimg = updatesecondimagesourceurl;
    console.log('this.endpointsecondimg');
    console.log(this.endpointsecondimg);
  }
  @Input()
  set profileimgis(profileimgis: any) {
    this.profileimg = profileimgis;
    console.log('this.profileimg');
    console.log(this.profileimg);
  }
  @Input()
  set secondimgis(secondimgis: any) {
    this.secondimg = secondimgis;
    console.log('this.secondimg');
    console.log(this.secondimg);
  }


 /* @Input()
  set pagenameis(pagenameis: any) {
    // alert(filenameval);
    this.pagename = pagenameis;
    console.log('this.pagename');
    console.log(this.pagename);
  }*/
  // @Output() filenamevalcChange = new EventEmitter<any>();
  // @Output() lfChange = new EventEmitter<any>();





  @Input()
  set uploadedimages(uploadedimages: any) {
    // alert(filenameval);
    this.upimages = uploadedimages;
    console.log('this.upimages');
    console.log(this.upimages);
   // this.apiService.fileservername[this.filenamevalc].push(this.upimages[0]);

    if(this.apiService.fileservername[this.filenamevalc] == null) this.apiService.fileservername[this.filenamevalc]=[];
    this.apiService.fileservername[this.filenamevalc]=[];

    for(let i in this.upimages){
      if(this.upimages!=null) this.apiService.fileservername[this.filenamevalc].push(this.upimages[i]);
    }
  }
  @Input()
  set modeldataemail(modeldataemail: any) {
    // alert(filenameval);
    this.modeldataemailis = modeldataemail;
    console.log('this.modeldataemailis');
    console.log(this.modeldataemailis);
  }


  constructor(public apiService: ApiService,public cookieService: CookieService, public dialog: MatDialog) {
    // this.filenamevalc='90';
    this.filenamevalc1='90';
    console.log('this.filenamevalc in constructor ... ');
    console.log(this.filenamevalc);
    console.log(this.filenamevalc1);
    //console.log(this.lf);
    //this.filenamevalcChange.emit(this.filenamevalc);
  }
  getval(){
    console.log('this.filenamevalc');
    console.log(this.filenamevalc);
    console.log(this.filenamevalc1);
    //this.filenamevalcChange.emit(this.filenamevalc);
    //this.lfChange.emit(90);
  }
  ngOnInit() {
  }
  delimage(indexval:any){
    this.apiService.fileservername[this.filenamevalc].splice(indexval,1);
  }
  setprofilepictureimage(img:any){
    // let data={images:img,email:this.cookieService.get('email')};
    let data={images:img,email:this.modeldataemailis};
    this.apiService.postData(this.endpoint, data).subscribe( res => {
      let result: any = {};
      result = res;
      console.log('result');
      console.log(result);
      if (result.msg == 'success') {
        this.profileimg = img;
        // show a modal for update
        const dialogRef = this.dialog.open(Updatetest4, {
          data: {msg: 'Profile Image Updated'},

        });
      }
    })
  }
  setsecndpictureimage(img:any){
    console.log('===========================');
    console.log(img);
    let data={images:img,email:this.modeldataemailis};
    this.apiService.postData(this.endpointsecondimg, data).subscribe( res => {
      let result: any = {};
      result = res;
      console.log('result');
      console.log(result);
      if (result.status == 'success') {
        this.secondimg = img;
        console.log(this.secondimg);
        // show a modal for update
        const dialogRef = this.dialog.open(Updatetest4, {
          data: {msg: 'Image Updated'},
        });
      }
    })
  }
}

@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest4 {
  public modalmsg: any;

  constructor(public dialogRef: MatDialogRef<Updatetest4>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg = data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}