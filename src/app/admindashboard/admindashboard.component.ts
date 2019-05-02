import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  datasource: any;
  pendingmodelapplicationarray1: any = [];
  brandarray: any = [];
  pendingmodelapplicationarray: any = [];
  notpendingapplication_view: any = [];
  pendingmodelapplicationarray_modify_header1: any = { 'dateformat': 'Date', 'username': 'Username', 'status': 'Status', 'email': 'Email' };
  pendingmodelapplicationarray_skip1: any = ['_id'];
  adminlist: any = [];
  constructor(public router: Router, private route: ActivatedRoute, public apiservice: ApiService) {
  }

  ngOnInit() {
    console.log('data in oninit');
    this.route.data.forEach((data) => {
      console.log(data);
      console.log('data from route ... !!!');
      console.log('json', data['results']);
      this.pendingmodelapplicationarray1 = data['results'].item.pendingapplication_view;
      console.log('this.pendingmodelapplicationarray1');
      console.log(this.pendingmodelapplicationarray1);
      this.brandarray = data['results'].item.brand;
      this.notpendingapplication_view = data['results'].item.notpendingapplication_view;
    });
  }

}
