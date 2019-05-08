import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {Resolveservice} from './resolveservice';
import { AuthGuard } from './auth.guard';
import {LoginComponent} from './login/login.component';
import {ForgetpasswordComponent} from './forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminlistComponent} from './adminlist/adminlist.component';
import {FormComponent} from './form/form.component';
import {GridviewComponent} from './gridview/gridview.component';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';
import {JoqulistComponent} from './joqulist/joqulist.component';
import {JoqueditComponent} from './joquedit/joquedit.component';
import {AddgameComponent} from "./addgame/addgame.component";
import {GameeditComponent} from "./gameedit/gameedit.component";
import {GamelistComponent} from "./gamelist/gamelist.component";
import {UsergamelistComponent} from "./usergamelist/usergamelist.component";
import {GamecategoryaddComponent} from "./gamecategoryadd/gamecategoryadd.component";
import {TestComponent} from "./test/test.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgetpassword', component: ForgetpasswordComponent},
  {path: 'resetpassword/:token', component: ResetpasswordComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'adminlist', component: AdminlistComponent},
  {path: 'form', component: FormComponent},
  {path: 'gridview', component: GridviewComponent},
  {path: 'joqulist', component: JoqulistComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {source: 'datalist',condition: {myid:"joqu_userlist_view"}}},
  {path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard], resolve: {results: Resolveservice}, data: {source: 'admindashboard'}},
  {path: 'joquedit/:pagename', component: JoqueditComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: "datalist",edit:'1', condition: {myid:"joqueditid"}}},
  {path: 'addgame', component: AddgameComponent, canActivate: [AuthGuard]},
  {path: 'gamelist', component: GamelistComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {source: 'datalist',condition: {myid:"game_view"}}},
  {path: 'gameedit/:pagename', component: GameeditComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: "datalist",edit:'1', condition: {myid:"gameeditid"}}},
  {path: 'usergamelist', component: UsergamelistComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {source: 'datalist',condition: {myid:"game_status_gretterthan_zero_view"}}},
  {path: 'gamecategoryadd', component: GamecategoryaddComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
