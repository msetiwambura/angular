import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DragulaModule } from 'ng2-dragula';
import { NgxGaugeModule } from 'ngx-gauge';
import { AppComponent } from './app.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { FormsComponent } from './forms/forms.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCommonModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {TablesComponent} from "./ui-elements/tables/tables.component";
import {PatientService} from "./shared/patient.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import { StringfilterpipeComponent } from './stringfilterpipe/stringfilterpipe.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,
        FormsComponent,
        LoginComponent,
        RegisterComponent,
        TablesComponent,
        StringfilterpipeComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        ChartsModule,
        NgxGaugeModule,
        MatStepperModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCommonModule,
        NgbModule.forRoot(),
        DragulaModule.forRoot(),
        NgCircleProgressModule.forRoot({
            "radius": 60,
            "outerStrokeWidth": 10,
            "innerStrokeWidth": 5,
            "showBackground": false,
            "startFromZero": false
        }),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        Ng2SearchPipeModule,
        NgxPaginationModule
    ],
  providers: [DatePipe,PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
