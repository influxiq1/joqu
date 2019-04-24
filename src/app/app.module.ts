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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
     Dialogtest, MainNavComponent, DashboardComponent, AdminlistComponent, FormComponent, GridviewComponent, AdmindashboardComponent,
    JoqulistComponent,
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
    ListingModule
  ],
  providers: [CookieService, Resolveservice, ApiService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    Dialogtest
  ],
})
export class AppModule { }
