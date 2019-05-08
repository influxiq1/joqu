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
  gamelist_skip: any= ['_id','created_at','unique_id','dateformat','st_dt', 'enddt', 'enddt','joquuser_id','images'];
  gamelist_modify_header: any = {'gamename': 'Game Name','gamedescription':'Description', 'st dt req':'Start Date', 'endt req':'End Date','min pay of amount':'Minimum Payout Amount','max pay of amount':'Maximum Payout Amount','st tm':'Start Time','end tm':'End Time'};
   gamelist_statusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];
  editroute1:any='gameedit';
  endpoint:any='datalist';
  tablename='game';
  delurl='deletesingledata';

  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService) {
    
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.gamelist=data['results'].res;
      console.log(this.gamelist);
    });
  }
  }
