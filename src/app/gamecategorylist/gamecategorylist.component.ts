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
  gamecatlist_modify_header: any = {'categoryname': 'Category Name','totalcat':'Sub Categories under this', 'catsum':'Total categories inside it(catsum)', 'level':'Level', 'status':'Status', 'dateformat':'Added On'};
  endpoint:any='datalist';
  tablename='gamecategory';
  delurl='deletesingledata';
  editroute1:any='gamecategoryedit';
  gamecatlist_statusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];


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
