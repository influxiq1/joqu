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
  game_view_skip: any= ['_id','created_at','unique_id', 'dateformat'];
  game_view_modify_header: any = {'gamename': 'Game Name','gamedescription':'Description', 'st dt req':'Start Date', 'endt req':'End Date','min pay of amount':'Minimum Payout Amount','max pay of amount':'Maximum Payout Amount','st tm':'Start Time','end tm':'End Time'};
  game_view_editroute1:any='gameedit';



  joqu_userlist_view: any = [];
  joqu_userlist_view_modify_header: any = { 'name': 'Full Name','email':'Email', 'age':'Age', 'dateformat':'Date','status':'Status','phone':'Phone'};
  joqu_userlist_view_skip: any = ['_id','password','instagramlink','shatterblok_user_id','city'];
  joqu_userlist_view_statusarray:any=[{val:2,name:'Processed by admin'},{val:3,name:'Shout A/c Created'}];
  joqu_userlist_view_editroute1:any='joquedit';

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
    });
  }

}
