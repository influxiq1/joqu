import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
declare var moment: any;

@Component({
  selector: 'app-usergamelist',
  templateUrl: './usergamelist.component.html',
  styleUrls: ['./usergamelist.component.css']
})
export class UsergamelistComponent implements OnInit {
  gamelist: any = [];
  endpoint: any = 'datalist';
  autoval: any;
  start_daterange : any;
  end_daterange : any;
  getgamesval: any;

  constructor(public router: Router, private route: ActivatedRoute, public apiservice: ApiService) {

  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json', data['results']);
      this.gamelist = data['results'].res;
      console.log(this.gamelist);
    });
  }

  searchusingautoval(val) {
    setTimeout(() => {
      let data1;
      if (val == 1) {
        console.log(this.autoval);
        data1 = {"gamename": this.autoval};
      }
      else {
        this.autoval=null;
        data1 = {};
      }
      let data2 = {"condition": data1, source: 'game_status_gretterthan_zero_view'};
      this.apiservice.postData(this.endpoint, data2).subscribe( res => {
        let result:any;
        result = res;
        console.log(result);
        this.gamelist=result.res;
        console.log('this.gamelist');
        console.log(this.gamelist);
      });
    },50);
  }

  getgames(val){
    this.getgamesval=val;
    // console.log(val+' -val');
    console.log(this.getgamesval+' -val');
    let data1;

    if (val == 0) { // past games
      data1 = { "enddt": { $lt: new Date(moment().format('MM/DD/YYYY')).getTime() } };
    }
    else if (val==1){ //current games
      data1 = {  "enddt": {$gte: new Date( moment().format('MM/DD/YYYY')).getTime() } };
    }
    else { // autocomplete games
      data1 = {  "st_dt":{$gte: this.start_daterange }, "enddt":{$lte: this.end_daterange }};
    }

    let data2 = {"condition": data1,source:'game_status_gretterthan_zero_view'};
    this.apiservice.postData(this.endpoint, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      console.log('game_status_gretterthan_zero_view called');
      this.gamelist=result.res;
      console.log('this.gamelist');
      console.log(this.gamelist);
    });
  }

  updateRange(){
    this.start_daterange=new Date(this.start_daterange).getTime();
    this.end_daterange=new Date(this.end_daterange).getTime();
      this.getgames(2);
  }
  hi(){
    console.log('...........');
    console.log(this.autoval);
  }
}
