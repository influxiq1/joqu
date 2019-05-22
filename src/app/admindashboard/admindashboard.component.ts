import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  game_view: any=[];
  game_view_skip: any= ['_id','created_at','unique_id','dateformat','st_dt', 'enddt', 'enddt','joquuser_id','images'];
  game_view_modify_header: any =  {'gamename': 'Game Name','gamedescription':'Description', 'st dt req':'Start Date', 'endt req':'End Date','min pay of amount':'Minimum Payout Amount','max pay of amount':'Maximum Payout Amount','st tm':'Start Time','end tm':'End Time', 'gamecategoryname': 'Category Name', 'status': 'Status'};
  game_view_tablename='game';
  game_view_search_tablename='game_view';
  game_view_editroute1:any='gameedit';
  game_view_statusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];
  game_view_click_to_add_ananother_page:'gameadd';
  game_view_search_settings:any={datesearch:{startdatelabel:"Start Date",enddatelabel:"End Date"},selectsearch:[{label:'Search By Status',field:'status',values:this.game_view_statusarray}],textsearch:[{label:"Search By Game Name",field:'gamename'}]};

  joqu_userlist_view: any = [];
  joqu_userlist_view_modify_header: any = { 'name': 'Full Name','email':'Email', 'age':'Age', 'dateformat':'Date','status':'Status','phone':'Phone'};
  joqu_userlist_view_skip: any = ['_id','password','instagramlink','shatterblok_user_id','city'];
  joqu_userlist_view_statusarray:any=[{val:2,name:'Processed by admin'},{val:3,name:'Shout A/c Created'}];
  joqu_userlist_view_editroute1:any='joquedit';
  // joqu_userlist_tablename:any='users';
  joqu_userlist_tablename:any='joqu_userlist_view';
  joqu_userlist_search_settings:any={datesearch:{startdatelabel:"Start Date",enddatelabel:"End Date"},selectsearch:[{label:'Search By Status',field:'status',values:this.joqu_userlist_view_statusarray}],textsearch:[{label:"Search By Email",field:'email'}]};

  gamecat_view: any=[];
  gamecat_view_skip: any= ['_id'];
  gamecat_view_modify_header: any = {'categoryname': 'Category Name','totalcat':'Sub Categories under this', 'catsum':'Total categories inside it(catsum)', 'level':'Level', 'status':'Status', 'dateformat':'Added On','parentcategoryname': 'Parent Category Name'};
  gamecat_view_tablename='gamecategory';
  gamecat_view_search_tablename='gamecategory_view';
  gamecat_view_editroute1:any='gamecategoryedit';
  gamecat_view_statusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];
  gamecat_view_click_to_add_ananother_page:any='gamecategoryadd';
  gamecat_view_search_settings:any={datesearch:{startdatelabel:"Start Date",enddatelabel:"End Date"},selectsearch:[{label:'Search By Status',field:'status',values:this.gamecat_view_statusarray}],textsearch:[{label:"Search By Game Category",field:'categoryname'}]};

  endpoint:any='datalist';
  delurl='deletesingledata';

  constructor(public router: Router, private route: ActivatedRoute, public apiservice: ApiService) {
  }

  ngOnInit() {
    console.log('data in oninit');
    this.route.data.forEach((data) => {
      console.log('data from route ... !!!');
      console.log('json', data['results']);
      this.joqu_userlist_view = data['results'].item.joqu_userlist_view;
      console.log('this.joqu_userlist_view');
      console.log(this.joqu_userlist_view);
      this.game_view = data['results'].item.game_view;
      this.gamecat_view = data['results'].item.game_category_view;
    });
  }

}
