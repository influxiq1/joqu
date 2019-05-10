import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
declare var moment: any;

@Component({
  selector: 'app-usergamelist',
  templateUrl: './usergamelist.component.html',
  styleUrls: ['./usergamelist.component.css']
})
export class UsergamelistComponent implements OnInit {
  gamelist: any=[];
  endpoint:any='datalist';
  autoval:any;
  pageloaded:any=0;

  range:Range = {fromDate:new Date(), toDate: new Date()};
  options:NgxDrpOptions;
  presets:Array<PresetItem> = [];

  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService) {

  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.gamelist=data['results'].res;
      console.log(this.gamelist);
    });
    const today = new Date();
    const fromMin = new Date(today.getFullYear()-1, today.getMonth(), today.getDate(), 0);
    const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear()+1, today.getMonth(), today.getDate()+1, 0);
    this.setupPresets();
    //condition: {st_dt_req: {$lte: "06/08/2019", $gt: "05/07/2019"}}
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: {fromDate:fromMin,toDate:toMax},
      applyLabel: "Submit"
      // calendarOverlayConfig: {
      //   shouldCloseOnBackdropClick: false,
      //   hasBackDrop: false
      // }
      // cancelLabel: "Cancel",
      // excludeWeekends:true,
      // fromMinMax: {fromDate:fromMin, toDate:fromMax},
      // toMinMax: {fromDate:toMin, toDate:toMax}
    };

  }

  searchusingautoval(val) {
    console.log(this.autoval);
    let data1;

    if (val == 1) {
      data1 = {"gamename": this.autoval};
    }
    else {
      this.autoval=null;
      data1 = {};
    }

    let data2 = {"condition": data1,source:'game_status_gretterthan_zero_view'};
    this.apiservice.postData(this.endpoint, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      // if(result.res.length>0){
      this.gamelist=result.res;
      console.log('this.gamelist');
      console.log(this.gamelist);
      // }
    });
  }

  getgames(val){
    console.log(val+' -val');
    let data1;

    /* if(val==0){ //past games
     data1={ "endt_req":{ $lt: moment().format('MM/DD/YYYY') } };
     }
     else if (val==1){ //current games
     data1={  "endt_req":{$gte: moment().format('MM/DD/YYYY') } };
     }
     else{ //autocomplete games
     data1={  "st_dt_req":{$gte: moment(this.range.fromDate).format('MM/DD/YYYY') }, "endt_req":{$lte: moment(this.range.toDate).subtract(1, 'days').format('MM/DD/YYYY') }};
     }*/


    if(val==0){ //past games
      data1={ "enddt":{ $lt: new Date(moment().format('MM/DD/YYYY')).getTime() } };
    }
    else if (val==1){ //current games
      data1={  "enddt":{$gte:new Date( moment().format('MM/DD/YYYY')).getTime() } };
    }
    else{ //autocomplete games
      data1={  "st_dt":{$gte: new Date( moment(this.range.fromDate)).getTime() }, "enddt":{$lte: new Date(moment(this.range.toDate).subtract(1, 'days')).getTime() }};
    }



    let data2 = {"condition": data1,source:'game_status_gretterthan_zero_view'};
    this.apiservice.postData(this.endpoint, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      console.log('game_status_gretterthan_zero_view called');
      // if(result.res.length>0){
      this.gamelist=result.res;
      console.log('this.gamelist');
      console.log(this.gamelist);
      // }
    });
  }
  updateRange(range: Range){
    this.range = range;
    // this.range.fromDate
    // this.range.toDate
    if(this.pageloaded==1){
      console.log('---------------6-----------------');
      console.log(this.range);
      this.getgames(2);
    }
  }

  // helper function to create initial presets
  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7);
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets =  [
      {presetLabel: "Yesterday", range:{ fromDate:yesterday, toDate:today }},
      {presetLabel: "Last 7 Days", range:{ fromDate: minus7, toDate:today }},
      {presetLabel: "Last 30 Days", range:{ fromDate: minus30, toDate:today }},
      {presetLabel: "This Month", range:{ fromDate: currMonthStart, toDate:currMonthEnd }},
      {presetLabel: "Last Month", range:{ fromDate: lastMonthStart, toDate:lastMonthEnd }}
    ]
  }

  ngAfterViewChecked(){
    console.log('ngAfterViewChecked()');
    this.pageloaded=1;
  }
}
