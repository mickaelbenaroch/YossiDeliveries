import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Routes, RouterModule } from '@angular/router';
import { MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule} from '@angular/material/expansion';
import { MenuComponent } from './components/menu/menu.component';
import { LogoComponent } from './components/logo/logo.component';
import { LoginComponent } from './components/login/login.component';
import { HoursComponent } from './components/hours/hours.component';
import { UserServiceService } from './services/user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddDelivererComponent } from './components/add-deliverer/add-deliverer.component'
import { DeliverersListComponent } from './components/deliverers-list/deliverers-list.component';
import { GenericModalComponent } from './components/modal/generic-modal/generic-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HourPipe } from './pipes/hour.pipe';
import { IlsPipe } from './pipes/ils.pipe';


const appRoutes: Routes = [
  { path: '' , component: AppComponent},
  { path: 'list' , component: DeliverersListComponent},
  { path: 'adduser' , component: AddDelivererComponent},
  { path: 'hours', component: HoursComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LogoComponent,
    LoginComponent,
    DeliverersListComponent,
    AddDelivererComponent,
    GenericModalComponent,
    HoursComponent,
    HourPipe,
    IlsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxUiLoaderModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatExpansionModule,
    NgbModule
  ],
  providers: [
    UserServiceService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    GenericModalComponent
  ]
})
export class AppModule { }
