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


const routes: Routes = [
    /* { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard], resolve: {results: Resolveservice}, data: {source: 'users', condition:{}} },*/
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
  // {path: 'joquedit', component: JoqueditComponent},
  // {path: 'joquedit/:pagename', component: JoqueditComponent },
  // {path: 'joquedit', component: JoqueditComponent, canActivate:[AuthGuard]},
  {path: 'joquedit/:pagename', component: JoqueditComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: "datalist",edit:'1', condition: {myid:"joqueditid"}}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
