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
  gamecatlist_modify_header: any = {'categoryname': 'Category Name','totalcat':'Next level Category Length(totalcat)', 'catsum':'Total categories inside it(catsum)', 'level':'Level'};
  endpoint:any='datalist';
  tablename='gamecategory';
  delurl='deletesingledata';

  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService) {
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      console.log('json',data['results']);
      this.gamecatlist=data['results'].res;
      console.log(this.gamecatlist);
      this.gamecatlist[0].catsum='';
    });
  }
}
