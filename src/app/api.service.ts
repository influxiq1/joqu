import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiService {

  public domain =  environment["API_URL"];
  public _url = environment["API_URL"];
  public resetpassword = environment['resetpaswordurl'];
  public jwttoken: any;

  constructor(private _http: HttpClient,
              private _authHttp: HttpClient,
              private cookieService: CookieService
              // public jwtHelper: JwtHelperService,
              // private loggedinService: LoggedinService
  ) {
    console.log('this.domain');
    console.log(this.domain);
    this.jwttoken=this.cookieService.get('jwttoken');
  }

  getclientip() {

    console.log('endpoint');

    // this.isTokenExpired()
    var result = this._http.get("http://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map(res => res));

    return result;
  }



  getEndpoint(endpoint: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.cookieService.get('jwttoken')
      })
    };
    let condition:any=endpoint.condition;
    var result = this._http.post(this._url + endpoint.source, condition, httpOptions).pipe(map(res => res));
    console.log(result)
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

}
