import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Resolveservice} from './resolveservice';
import {ApiService} from './api.service';
import {AuthGuard} from './auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import {ResetpasswordComponent, Dialogtest} from './resetpassword/resetpassword.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import  { DemoMaterialModule } from '../material-module';
// import { LoginComponent } from './login/login.component';
import {ListingModule} from 'listing-angular7';
import {MatTableModule} from '@angular/material/table';
import { FormComponent } from './form/form.component';
import { GridviewComponent } from './gridview/gridview.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { JoqulistComponent } from './joqulist/joqulist.component';
import { JoqueditComponent,Updatetest3 } from './joquedit/joquedit.component';
import { AddgameComponent,Updatetest1 } from './addgame/addgame.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { GamelistComponent } from './gamelist/gamelist.component';
import { GameeditComponent } from './gameedit/gameedit.component';
import { UploaderComponent,Updatetest4 } from './uploader/uploader.component';
import {NgxUploaderModule} from 'ngx-uploader';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { UsergamelistComponent } from './usergamelist/usergamelist.component';
import { GamecategoryaddComponent } from './gamecategoryadd/gamecategoryadd.component';
import { TestComponent } from './test/test.component';
import { UsergamecategoryviewComponent } from './usergamecategoryview/usergamecategoryview.component';
import { GamecategorylistComponent } from './gamecategorylist/gamecategorylist.component';
import { GamecategoryeditComponent } from './gamecategoryedit/gamecategoryedit.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AffiliateListComponent } from './affiliate-list/affiliate-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
     Dialogtest, MainNavComponent, DashboardComponent, AdminlistComponent, FormComponent, GridviewComponent, AdmindashboardComponent,
    JoqulistComponent,
    JoqueditComponent,Updatetest3,
    AddgameComponent,Updatetest1,
    GamelistComponent, GameeditComponent,UploaderComponent,Updatetest4, UsergamelistComponent, GamecategoryaddComponent, TestComponent, UsergamecategoryviewComponent, GamecategorylistComponent, GamecategoryeditComponent, MyaccountComponent, AffiliateListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    DemoMaterialModule,
    ListingModule,
    NgxMaterialTimepickerModule,
    NgxUploaderModule,
    NgxMatDrpModule
  ],
  providers: [CookieService, Resolveservice, ApiService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    Dialogtest,
    Updatetest3,
    Updatetest1,
    Updatetest4
  ],
})
export class AppModule { }
