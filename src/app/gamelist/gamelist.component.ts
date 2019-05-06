import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
declare var moment: any;

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {
  gamelist: any=[];
  // joquuserlist_skip: any= ['id','_id','instagramlink','shatterblok_user_id','joqu_status','city','state','unique_id','created at'];
  gamelist_skip: any= ['_id','created_at','unique_id','dateformat'];
  gamelist_modify_header: any = {'gamename': 'Game Name','gamedescription':'Description', 'st dt req':'Start Date', 'endt req':'End Date','min pay of amount':'Minimum Payout Amount','max pay of amount':'Maximum Payout Amount','st tm':'Start Time','end tm':'End Time'};
  // gamelist_statusarray:any=[{val:2,name:'Processed by admin'},{val:3,name:'Shout A/c Created'}];
  editroute1:any='gameedit';
  endpoint:any='datalist';
  options1: string[] = ['One', 'Two', 'Three'];

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
    const fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);

    this.setupPresets();
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: {fromDate:today, toDate: today},
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

  
  
  getgames(val){
    console.log(val+' -val');
    let data1;

    if(val==0){
      data1={ "st_dt_req":{ $lte: moment().subtract(1, 'days').format('MM/DD/YYYY') } };
    }
    else if (val==1){
      data1={  "st_dt_req":{$lte: moment().add(1, 'months').format('MM/DD/YYYY'), $gt: moment().subtract(1, 'days').format('MM/DD/YYYY') } };
    }
    else{
      data1={  "st_dt_req":{$gt: moment(this.range.fromDate).subtract(1, 'days').format('MM/DD/YYYY') }, "enddt_req":{$lte: moment(this.range.toDate).subtract(1, 'days').format('MM/DD/YYYY') }};
    }

    let data2 = {"condition": data1,source:'game_view'};
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
  updateRange(range: Range){
    this.range = range;
    console.log(this.range);
    // this.range.fromDate
    // this.range.toDate
    this.getgames(2);
  }

  // helper function to create initial presets
  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
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
}
