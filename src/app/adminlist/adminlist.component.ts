import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {FormComponent} from "../form/form.component";


export interface Mylist{
  id:number;
  name: string,
  age: number,
  address: string,
  phone: string,
  status: string
}
const DATA:Mylist[]=[
  {id:1, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:2, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:3, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:4, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:5, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:6, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:7, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:8, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:9, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
  {id:10, name:'subrata', age:60, address:'not available', phone: '6985623', status:'null' },
];




@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})


export class AdminlistComponent implements OnInit {

  public isMobile;
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'phone', 'status', 'actions'];
  // dataSource = DATA;
  dataSource = new MatTableDataSource<Mylist>(DATA);

  constructor(public breakPointObserver: BreakpointObserver, public matModal: MatDialog ) {
    breakPointObserver.observe(['max-width: 668px']).subscribe(result =>{
      this.displayedColumns = result.matches?
          ['id', 'name', 'age', 'address', 'phone', 'status', 'actions']:
          ['id', 'name', 'age', 'address', 'phone', 'status', 'actions'];
    });
  }
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  //modal add button
  addButton(){
    const  dialogRef = this.matModal.open( FormComponent );
        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
  }






  ngOnInit() {
  // this.dataSource.paginator = this.paginator;
  }

}
