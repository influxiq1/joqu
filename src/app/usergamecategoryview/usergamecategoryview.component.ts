
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';
import { environment } from '../../environments/environment';


interface GameNode {
  name: string;
  children?: GameNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-usergamecategoryview',
  templateUrl: './usergamecategoryview.component.html',
  styleUrls: ['./usergamecategoryview.component.css']
})
export class UsergamecategoryviewComponent implements OnInit {
  public endpoint1 = 'datalist';
  public categorylist = [];
  public gametree1:GameNode[]=[];

  private transformer = (node: GameNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(public fb: FormBuilder, private cookieService: CookieService, public apiService: ApiService, public router: Router){}

  ngOnInit() {
  //  this.getcategorylist();
  }
  /*getcategorylist(){
    let data2 = {source:'gamecategorywisetest'};
    this.apiService.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
      for(let i in this.categorylist){
        if(this.categorylist[i].parentcategoryid==null){
          let child=[];
          for(let j in this.categorylist[i].subcategory){
            child.push({name:this.categorylist[i].subcategory[j].categoryname});
          }
          let val={};
          val={
            name:this.categorylist[i].categoryname,
            children:child
          };
          console.log(val);
          this.gametree1.push(val);
        }
      }
      this.dataSource.data = this.gametree1;
    });
  }*/
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
