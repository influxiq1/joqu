import { Injectable } from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable()
export class Resolveservice implements Resolve<EndpointComponent> {

    constructor(private _apiService: ApiService, private router: Router, private cookieService: CookieService) {}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
         return new Promise((resolve) => {
            let endpointdata:any;
            if(route.data.condition!=null && route.data.condition.myid !=null && route.data.condition.myid=='joqu_userlist_view') {
                let condition: any;
                condition = {source: "joqu_userlist_view"};
                endpointdata = {source: route.data.source, condition: condition}
            }
            else {
                endpointdata = route.data;
            }
            this._apiService.getEndpoint(endpointdata).subscribe(api_object => {
                console.log('api_object  !!!!');
                console.log(api_object);
                if (api_object) {
                    return resolve(api_object);
                } else {
                    this.router.navigateByUrl('login');
                    return true;
                }
            });
        });
    }
}
