import {Injectable, ViewChild, EventEmitter, ElementRef} from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';

@Injectable()
export class ApiService {

  public domain =  environment["API_URL"];
  public _url = environment["API_URL"];
  public resetpassword = environment['resetpaswordurl'];
  public domain_for_fileupload = environment['domain_for_fileupload'];
  public imageuploadpath: any = environment.uploadfolder;
  public imagefilepath: any = environment.imagefilepath;
  // public uplodeimg_url: any = environment.uplodeimg_url;
  public jwttoken: any;


  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  @ViewChild('fileInput1') uploaderInput: ElementRef;
  public lengthis;
  public percentageis;
  public inprogress;
  public progress: any = [];
  public uploadtype;
  public uploaderror: any = '';
  fileservername: any = [];


  constructor(private _http: HttpClient,
              private _authHttp: HttpClient,
              private cookieService: CookieService
              // public jwtHelper: JwtHelperService,
              // private loggedinService: LoggedinService
  ) {
    console.log('this.domain');
    console.log(this.domain);
    this.jwttoken = this.cookieService.get('jwttoken');
    this.options = { concurrency: 10, maxUploads: 10 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  getclientip() {

    console.log('endpoint');

    // this.isTokenExpired()
    var result = this._http.get("https://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map(res => res));

    return result;
  }



  getEndpoint(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.cookieService.get('jwttoken')
      })
    };
    let condition : any = endpoint.condition;
    console.log(condition);
    var result = this._http.post(this._url + endpoint.source, condition, httpOptions).pipe(map(res => res));
    console.log(result);
    return result;
  }
  getEndpointforedit(endpoint: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.cookieService.get('jwttoken')
      })
    };
    let condition:any={condition: endpoint.condition,source:endpoint.source2};
    console.log(condition);
    var result = this._http.post(this._url + endpoint.source, condition, httpOptions).pipe(map(res => res));
    console.log(result);
    return result;
  }
  getData(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.cookieService.get('jwttoken')
      })
    };
    console.log('endpoint');
    console.log(endpoint);
    console.log('httpOptions');
    console.log(httpOptions);
    console.log(this.cookieService.get('jwttoken'));
    console.log('httpOptions');
    console.log(httpOptions);

    // this.isTokenExpired()
    var result = this._http.post(this._url + 'datalist', endpoint, httpOptions).pipe(map(res => res));

    return result;
  }
  // getData end


  getData1(endpoint: any) {
    let data={source:"pending_and_notpending_application_view" , token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NTQzNjEzNjQsImlhdCI6MTU1NDI3NDk2NH0.vvJHBuA8AQj5crasnbKAYW9XgRQipeGN-COLpjTnUGk'};
    // this.isTokenExpired()
    var result = this._http.post(this._url + 'datalist', data).pipe(map(res => res));

    return result;
  }



  postData(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.cookieService.get('jwttoken')
      })
    };
    console.log(this.cookieService.get('jwttoken'));
    console.log('endpoint');
    console.log(endpoint);
    console.log('httpOptions');
    console.log(httpOptions);
    var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }

  postDatawithoutToken(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(this.cookieService.get('jwttoken'));
    console.log('endpoint');
    console.log(endpoint);
    var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }

  postlogin(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }



  putData(endpoint:any, data, id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwttoken')
      })
    };
    console.log(this.cookieService.get('jwttoken'));
    console.log("endpoint");
    console.log(endpoint);
    var result = this._http.put(this.getEndpointUrl(endpoint)+'/'+id, JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }



  private getEndpointUrl(endpoint: string) {
    return this._url + endpoint;
  }
  onUploadOutput(output: UploadOutput,arrayval:any,uploadtypec:any,uploadpath:any): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.domain_for_fileupload+'uploads',
        method: 'POST',
        data: { path: uploadpath }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      if (output.file.response != '') {
        this.files = [];
        this.files.push(output.file);
        console.log('this.files*********');
        console.log(this.files);
        this.lengthis = this.files.length;
        this.percentageis = this.files[0].progress.data.percentage;
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      this.lengthis = this.files.length;
      if(this.files[0]!=null && this.files[0].progress!=null)
        this.percentageis = this.files[0].progress.data.percentage;
      console.log('this.files==================');
      console.log(this.files);
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    console.log('files-');
    console.log(this.files);
    if(this.files[0]!=null && this.files[0].progress!=null) {
      if(this.progress[arrayval]==null)this.progress[arrayval]=0;
      this.inprogress=true;
      console.log('this.files[0].progress.data.percentage');
      console.log(this.files[0].progress.data.percentage);
      this.progress[arrayval] = (this.files[0].progress.data.percentage);
      if(this.progress[arrayval]==100) {
        this.progress[arrayval]=null;
        this.inprogress=null;
      }
      console.log('this.uploadtype in api service');
      console.log(uploadtypec);
    }
    if (uploadtypec=='single'){
      if(this.fileservername[arrayval] == null) this.fileservername[arrayval]=[];
      this.fileservername[arrayval]=[];
      if(this.files[0].response!=null) this.fileservername[arrayval].push(this.files[0].response);
    }
    if (uploadtypec == 'multiple') {
      console.log('this.files[0].response');
      console.log(this.files.length);
      console.log(this.files);
      if (this.fileservername[arrayval] == null) this.fileservername[arrayval] = [];
      if(this.files.length==1) {
        if(this.files[0] && this.files[0].response!=null && this.files[0].response.error_code==null ) {
          this.fileservername[arrayval].push(this.files[0].response);
          this.files = [];
          this.uploaderror='';
        }
        if(this.files[0] !=null && this.files[0].response!=null && this.files[0].response.error_code!=null){
          this.uploaderror='error occured on uploading !!!';
        }
      }
      if(this.files.length>1)
      {
        console.log('sdfdsf==== in multiple length ');
        for(let b in this.files){
          if(this.files[b].response!=null && this.files[b].response.error_code==null) {
            this.fileservername[arrayval].push(this.files[b].response);
          }
        }
        this.files=[];
      }
    }
    console.log('this.fileservername');
    console.log(this.fileservername);
    console.log(this.uploaderror);
  }
}
