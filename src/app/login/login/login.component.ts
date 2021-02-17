import { Component, OnInit } from '@angular/core';
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { data } from 'jquery';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public url: any = "employeelist";

  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
    headers: this.headers,
  };


  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }

  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {

    this.loginForm =  this.formBuilder.group({

      UserName: ["", [Validators.required]],
      Password: ["", [Validators.required]]

    })

  }   

  login(){

    let objLogin = this.loginForm.value;
    console.log(objLogin);
    this.srvModuleService.login(objLogin, this.url).subscribe((data) => {
       
      console.log('data', data);
    
      if(data.length && data[0].Id > 0 ){
        console.log("login successfull");
        
        localStorage.setItem("username", this.loginForm.controls.UserName.value);
        localStorage.setItem("isadmin", data[0].IsAdmin);

        if(JSON.parse(data[0].IsAdmin)){
          this.router.navigate(["/dashboard/admin"]);
        }
        else{
          this.router.navigate(["/employees/employeepage"]);
        }
        
      }
      else{
        console.log("Unauthorised !!!");
       // this.loginForm.value.Password.invalid;
        this.loginForm.controls['Password'].setErrors({'incorrect': true});
      }
    });

  }

}
