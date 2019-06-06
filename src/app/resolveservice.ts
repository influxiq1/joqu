import { Injectable } from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
declare var moment: any;
export interface EndpointComponent {
    endpoint: string;
}

@Injectable()
export class Resolveservice implements Resolve<EndpointComponent> {

    constructor(private _apiService: ApiService, private router: Router, private cookieService: CookieService) {}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve) => {
            let endpointdata:any;
            if(route.data.condition!=null && route.data.condition.myid !=null && (route.data.condition.myid=='joqu_userlist_view' || route.data.condition.myid=='gamecategory_view' || route.data.condition.myid=='game_view')) {
                let condition: any;
                condition = {source: route.data.condition.myid};
                endpointdata = {source: route.data.source, condition: condition}
            }
            else if (route.data.condition!=null && route.data.condition.myid !=null && route.data.condition.myid=='game_status_gretterthan_zero_view') {
                let condition: any;
                condition = {"source": route.data.condition.myid,condition: {
                    "st_dt":{
                         $lte: new Date(moment().add(1, 'months').format('MM/DD/YYYY')).getTime(),
                        $gte: new Date(moment().format('MM/DD/YYYY')).getTime()
                    }
                }};
                endpointdata = {source: route.data.source, condition: condition}
            }
            else if (route.data.condition!=null && route.data.condition.myid !=null && route.data.condition.myid=='joqueditid') {
                let condition: any;
                condition = {_id:route.params.pagename};
                endpointdata = {source: route.data.source, source2: "users",condition: condition};
            }
            else if(route.data.condition!=null && route.data.condition.myid !=null && route.data.condition.myid=='gameeditid') {
                let condition: any;
                condition = {_id:route.params.pagename};
                endpointdata = {source: route.data.source, source2: "game",condition: condition};
            }
            else if(route.data.condition!=null && route.data.condition.myid !=null && route.data.condition.myid=='gamecategoryeditid') {
                let condition: any;
                condition = {_id:route.params.pagename};
                endpointdata = {source: route.data.source, source2: "gamecategory",condition: condition};
            }
            else if(route.data.condition!=null && route.data.condition.myid !=null && route.data.condition.myid=='users') {
                let condition: any;
                condition = {condition: {_id:this.cookieService.get('id')}, source: route.data.condition.myid};
                endpointdata = {source: route.data.source, condition: condition}
            }
            else {
                endpointdata = route.data;
            }
            console.log('endpointdata');
            console.log(endpointdata);
            if(route.data.edit=='1'){
                this._apiService.getEndpointforedit(endpointdata).subscribe(api_object => {
                    console.log('api_object  !!!!');
                    console.log(api_object);
                    if (api_object) {
                        return resolve(api_object);
                    } else {
                        this.router.navigateByUrl('login');
                        return true;
                    }
                });
            }
            else{
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
            }
        });
    }
}
