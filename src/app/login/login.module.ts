import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobViewComponent } from './job-view/job-view.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderService } from '../header/header.service';
import { AllModulesService } from '../all-modules/all-modules.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [LoginComponent, ForgotComponent, RegisterComponent, OtpComponent, LockscreenComponent, JobListComponent, JobViewComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AllModulesService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    HeaderService
  ]
})
export class LoginModule { }
