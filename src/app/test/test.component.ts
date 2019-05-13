import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}
/*const TREE_DATA: FoodNode[] = new Map<string, string[]>([
  ['Fruits', ['Apple', 'Orange', 'Banana']],
  ['Vegetables', ['Tomato', 'Potato', 'Onion']],
  ['Apple', ['Fuji', 'Macintosh']],
  ['Onion', ['Yellow', 'White', 'Purple']]
]);*/

const TREE_DATA: FoodNode[] = [
  {
    name: 'Cat C',
    children: [
      {name: 'Cat C-1'},
      {name: 'Cat C-2'}
    ]
  }, {
    name: 'Cat B',
    children: [
      {name: 'Cat B1'}
    ]
  }, {
    name: 'Cat A',
    children: [
      {name: 'Cat A-1'}
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private transformer = (node: FoodNode, level: number) => {
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

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(){}
}
