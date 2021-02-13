import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { AllModulesService } from "src/app/all-modules/all-modules.service";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"],
})
export class EmployeeProfileComponent implements OnInit {
  public lstEmployee: any[];
  public addEmployeeForm: FormGroup;
  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private _router: Router
  ) {}

  sub;
  currEmpData;

  ngOnInit() {
    this.addEmployeeForm = this.formBuilder.group({
      client: ["", [Validators.required]],
    });

    this.sub=this._Activatedroute.paramMap.subscribe((params: any) => { 
      this.srvModuleService.get("this.url").subscribe((data:any) => {
        const empDataIdx = data.findIndex((data) => data?.Id == params.params.id);
        const empData = data[empDataIdx];
        this.currEmpData = empData;
        console.log('currEmpData', this.currEmpData);
      });
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.toastr.success("Bank & statutory added", "Success");
  }
}
