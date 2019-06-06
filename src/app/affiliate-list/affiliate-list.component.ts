import {Component, OnInit, Injectable, Input, Inject} from '@angular/core';
import {NestedTreeControl, FlatTreeControl} from '@angular/cdk/tree';
import {Router, ActivatedRoute, Route} from '@angular/router';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {ApiService} from '../api.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogData, Updatetest4} from '../uploader/uploader.component';



export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {}
}
@Injectable()
export class DynamicDatabase implements OnInit {
  ngOnInit(): void {
  }
  constructor(public apiservice: ApiService) {}
  /** Initial data from database */
  initialData(val: any): DynamicFlatNode[] {
    console.log(' initialData val');
    console.log(val);
    console.log(val.map(name => new DynamicFlatNode(name, 0, true)))

    return val.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string, result: any): string[] | undefined {



    return result;

  }


  isExpandable(node: string): boolean {
    console.log('isexpandable');
    console.log(node);
    let tempnode: any = node;
    if (tempnode.children === 0) {             // if there is no child in tree
      return false;
    } else {
      return true;
    }
  }
}
@Injectable()
export class DynamicDataSource {
  public endpoint: any = 'datalist';
  public jwttoken;

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase , public apiservice: ApiService) {
    // this.apiservices = apiservice;
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
          (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    // this.endpoint ='datalist';

    console.log('in togglenode');
    // expand = false;
    console.log(node);
    console.log('node.level');
    console.log(node.level);
    // console.log(this.userdetails);
    console.log(node.item);

    let nodeval: any ;
    nodeval =  node.item;
    let data: any;
    let data1: any;
    // let endpoint: any ='datalist';
    // console.log(node.item.categoryname);
    data1 = {parentcategoryname: nodeval.categoryname};
    data = {condition: data1, source: 'gamecategory_view'};
    this.apiservice.postData(this.endpoint, data).subscribe( res => {
      let result: any;
      result = res;

      console.log('res');
      console.log(result.item);
      console.log(result);
      const children = this.database.getChildren(node.item, result.res);
      const index = this.data.indexOf(node);
      if (!children || index < 0) { // If no children, or cannot find the node, no op
        return;
      }

      node.isLoading = true;

      setTimeout(() => {
        if (expand) {
          const nodes = children.map(name =>
              new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
          this.data.splice(index + 1, 0, ...nodes);
        } else {
          let count = 0;
          for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
          this.data.splice(index + 1, count);
        }

        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;
      }, 1000);

      // return; result.item;
    },error => {
      // this.loadinglist = false;

      console.log("Oooops!");
      return [''];
    });


  }
}



@Component({
  selector: 'app-affiliate-list',
  templateUrl: './affiliate-list.component.html',
  styleUrls: ['./affiliate-list.component.css'],
  providers: [DynamicDatabase]
})
export class AffiliateListComponent implements OnInit {
  public endpoint: any = 'datalist';
  public gamecat: any ;
  public accesscode: any ;
  public children: any ;
  // public affarray_val: Array<any> ;
  public affarray: any = [];

  constructor(public activeRoute: ActivatedRoute, public database: DynamicDatabase, public apiservice: ApiService, public dialog: MatDialog) {
    let data: any;
    let data1: any;
    data1 = {level: 0};
    data = {'condition': data1, source: 'gamecategory_view'};
    this.apiservice.postData(this.endpoint, data).subscribe( resp => {
      let result: any;
      result = resp;
      console.log(result);
      this.affarray = result.res;
      console.log('this.affarray in AffiliateListComponent');
      console.log(this.affarray);
      for (let i in this.affarray) {
        console.log('log in for in ');
        console.log(this.affarray[i]);
        this.affarray[i].item = this.affarray[i].categoryname;
        this.affarray[i].children = this.affarray[i].totalcat;
      }
      // console.log(this.affarray_val);
      this.dataSource.data = this.database.initialData(this.affarray );
      console.log('this.dataSource.data');
      console.log(this.dataSource);
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;
  // userdata: CookieService;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  ngOnInit() {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database, this.apiservice);

  /*  this.activeRoute.data.forEach((data) => {
      console.log('data from route ... !!!');
      console.log('json', data['results']);
      this.gamecat = data['results'].res;
      console.log(this.gamecat);
    });*/
  }
  onSubmit(val: any) {
    console.log(val.item);
    const dialogRef = this.dialog.open(Updatetest4, {
      data: {msg: 'End date can\'t be prior to Start date'},
    });
  }
}

/*

@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest4 {
  public modalmsg: any;

  constructor(public dialogRef: MatDialogRef<Updatetest4>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg = data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
*/
