
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';


interface GameNode {
  name: string;
  catsum: string;
  children?: GameNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  catsum: string;
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
  public gametree2:GameNode[]=[];
  public gametree3:GameNode[]=[];
  public appnew=[];
  public levelis: any=0;
  public leveladdis: any=0;
  public val: any = {};

  private transformer = (node: GameNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      catsum: node.catsum,
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
    this.getcategorylist();
  }

  getcategorylist(){
    let data2 = {source:'testgamecateogryview'};
    this.apiService.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
      let i:any;
      // level 0
      for( i in this.categorylist) {
        if (this.categorylist[i].level == 0) {
          let child = [];
          //level 1
          this.appnew=[];
          for (let j in this.categorylist) {
            if (this.categorylist[j].level ==  1 && this.categorylist[j].parentcategoryid==this.categorylist[i]._id) {
              child.push({name: this.categorylist[j].categoryname});
             let app= this.calltwo(this.categorylist[j].categoryname,this.categorylist[j]._id);
              for(let k in child) {
                for(let l in app) {
                  if(child[k].name==app[l]){
                    this.appnew.push(app);
                  }
                }
              }
            }
          }
          let val: any = {};
          val = {
            name: this.categorylist[i].categoryname,
            catsum: this.categorylist[i].catsum==null? 0 : this.categorylist[i].catsum,
            children: this.appnew
          };
          this.gametree1.push(val);
          this.dataSource.data = this.gametree1;
        }
      }
    });
  }


  /*calltwo(catname,id){
    let child1 = [];
    for (let j1 in this.categorylist) {
      if (this.categorylist[j1].level ==  2 && this.categorylist[j1].parentcategoryid==id) {
        child1.push({name: this.categorylist[j1].categoryname});
        let val: any = {};
        val = {
          name: catname,
          catsum: 5,
          children: child1
        };
        /!*if(a!=catname){
          return val;
        }
        let a = catname;*!/
        return val;
      }
    }
  }*/

  calltwo(catname,id){
    console.log(id);
    let child1 = [];
    for (let j1 in this.categorylist) {
      if (this.categorylist[j1].level ==  2 && this.categorylist[j1].parentcategoryid==id) {
        console.log(j1);
        child1.push({name: this.categorylist[j1].categoryname});
        console.log(child1);
        this.val= {};
        this.val = {
          name: catname,
          catsum: 5,
          children: child1
        };
        console.log(this.val);
      }
    }
    return this.val;
  }

/*  getcategorylist1(){
    let data2 = {source:'testgamecateogryview'};
    this.apiService.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
      let i:any;

      // level 0
      for( i in this.categorylist) {
        if (this.categorylist[i].level == 0) {
          let child = [];

          //level 1
          for (let j in this.categorylist) {
            if (this.categorylist[j].level ==  1 && this.categorylist[j].parentcategoryid==this.categorylist[i]._id) {
              child.push({name: this.categorylist[j].categoryname});
              let child1 = [];
              for (let j1 in this.categorylist) {
                if (this.categorylist[j1].level ==  2 && this.categorylist[j1].parentcategoryid==this.categorylist[j]._id) {
                  child1.push({name: this.categorylist[j1].categoryname});

                  // -------------------------------------------------------------------------------------------------------
                  // console.log(child1);
                /!*  let child2 = [];
                  for (let j2 in this.categorylist) {
                    if (this.categorylist[j2].level == 3 && this.categorylist[j2].parentcategoryid == this.categorylist[j1]._id) {
                      child2.push({name: this.categorylist[j2].categoryname});
                      // console.log(child2);
                    }
                  }
                  if (child2.length > 0) {
                  let val2: any = {};
                  val2 = {
                    name: this.categorylist[j1].categoryname,
                    catsum: this.categorylist[j1].catsum == null ? 0 : this.categorylist[j1].catsum,
                    children: child2
                  };
                  this.gametree3.push(val2);
                  console.log('this.gametree3---------------------------------------');
                  console.log(this.gametree3);
                }*!/
              // -------------------------------------------------------------------------------------------------------

                }
              }

              let val1: any = {};
              val1 = {
                name: this.categorylist[j].categoryname,
                catsum: this.categorylist[j].catsum==null? 0 : this.categorylist[j].catsum,
                // children: this.gametree3
               children: child1
              };
              console.log('val1-------------------------------------');
              console.log(val1);
              this.gametree1.push(val1);
              // console.log('this.gametree1---------------------------------------');
              // console.log(this.gametree1);
            }
          }
          let val: any = {};
          val = {
            name: this.categorylist[i].categoryname,
            catsum: this.categorylist[i].catsum==null? 0 : this.categorylist[i].catsum,
            children: this.gametree1
          };
          this.gametree2.push(val);
        }
      }
      this.dataSource.data = this.gametree2;
      console.log(this.gametree2);
    });
  }
  getcategorylist12(){
    let data2 = {source:'testgamecateogryview'};
    this.apiService.postData(this.endpoint1, data2).subscribe( res => {
      let result:any;
      result = res;
      this.categorylist=result.res;
      console.log('this.categorylist');
      console.log(this.categorylist);
      let i:any;
      for( i in this.categorylist) {
       if (this.categorylist[i].level == 0) {
          let child = [];
          for (let j in this.categorylist) {
            if (this.categorylist[j].level ==  1 ) {
              child.push({name: this.categorylist[j].categoryname});
            }
          }
          let val: any = {};
          val = {
            name: this.categorylist[i].categoryname,
            children: child
          };
          this.gametree1.push(val);
        }
      }
      this.dataSource.data = this.gametree1;
    });
  }

  getcategorylist2(){
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
          let val: any={};
          val={
            name:this.categorylist[i].categoryname,
            children:child
          };
         // console.log(val);
          this.gametree1.push(val);
        }
      }
      this.dataSource.data = this.gametree1;
      console.log(this.gametree1);
    });

  }*/
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


