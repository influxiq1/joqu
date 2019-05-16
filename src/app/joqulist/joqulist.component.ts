import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-joqulist',
  templateUrl: './joqulist.component.html',
  styleUrls: ['./joqulist.component.css'],
})
export class JoqulistComponent implements OnInit {
  joquuserlist: any=[];
  // joquuserlist_skip: any= ['id','_id','instagramlink','shatterblok_user_id','joqu_status','city','state','unique_id','created at'];
  joquuserlist_skip: any= ['_id','password','instagramlink','shatterblok_user_id','city'];
  joquuserlist_modify_header1: any = { 'name': 'Full Name','email':'Email', 'age':'Age', 'dateformat':'Date','status':'Status','phone':'Phone'};
   joquuserlist_statusarray:any=[{val:2,name:'Processed by admin'},{val:3,name:'Shout A/c Created'}];
  editroute1:any='joquedit';
  tablename:any='users';
  endpoint:any='datalist';
  joquuserlist_search_settings:any={datesearch:{startdatelabel:"Start Date",enddatelabel:"End Date"},selectsearch:[{label:'Search By Status',field:'status',values:this.joquuserlist_statusarray}],textsearch:[{label:"Search By Email",field:'email'}]};

  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService) {
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.joquuserlist=data['results'].res;
      console.log(this.joquuserlist);
    });
  }

}
