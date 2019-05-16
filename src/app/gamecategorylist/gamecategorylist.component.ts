import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
declare var moment: any;

@Component({
  selector: 'app-gamecategorylist',
  templateUrl: './gamecategorylist.component.html',
  styleUrls: ['./gamecategorylist.component.css']
})
export class GamecategorylistComponent implements OnInit {
  gamecatlist: any=[];
  gamecatlist_skip: any= ['_id'];
  gamecatlist_modify_header: any = {'categoryname': 'Category Name','totalcat':'Sub Categories under this', 'catsum':'Total categories inside it(catsum)', 'level':'Level', 'status':'Status', 'dateformat':'Added On','parentcategoryname': 'Parent Category Name'};
  endpoint:any='datalist';
  tablename='gamecategory';
  delurl='deletesingledata';
  editroute1:any='gamecategoryedit';
  click_to_add_ananother_page:any='gamecategoryadd';
  gamecatlist_statusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];
  gamecatlist_search_settings:any={datesearch:{startdatelabel:"Start Date",enddatelabel:"End Date"},selectsearch:[{label:'Search By Status',field:'status',values:this.gamecatlist_statusarray}],textsearch:[{label:"Search By Game Category",field:'categoryname'}]};

  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService) {
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.gamecatlist=data['results'].res;
      console.log(this.gamecatlist);
    });
  }
}
