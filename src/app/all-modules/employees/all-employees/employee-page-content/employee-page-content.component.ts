import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { id } from "src/assets/all-modules-data/id";

declare const $: any;
@Component({
  selector: "app-employee-page-content",
  templateUrl: "./employee-page-content.component.html",
  styleUrls: ["./employee-page-content.component.css"],
})
export class EmployeePageContentComponent implements OnInit {
  public lstEmployee: any[];
  public url: any = "employeelist";
  public tempId: any;
  public editId: any;
  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;

  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadEmployee();
    this.addEmployeeForm = this.formBuilder.group({

      CompanyName: ["", [Validators.required]],
      Name: ["", [Validators.required]],
      EmployeeCode: ["", [Validators.required]],
      Gender: [],
      BirthDate: [],
      MobileNo: [],
      EmailId: [],
      BloodGroup: [],
      Nationality: [],
      NoOfDependants: [],
      Status: [],
      CompanyDetails: this.formBuilder.group({
        CompanyNo: [],
        CompanyName: [],
        Position: [],
        EntryDate: [],
        HiringDate: [],
      }),
      AddressDetails: this.formBuilder.group({
        AddressType: [],
        Address1: [],
        Address2: [],
        Street: [],
        City: [],
        district: [],
      }),
      IqamaDetails: this.formBuilder.group({
        IqamaId: [],
        BoarderNo: [],
        IsIqamaExpired: [],
        DateOfExpiry: [],
      }),
      PassportDetails: this.formBuilder.group({
        PassportNumber: [],
        PlaceOfIssue: [],
        IssueDate: [],
        DateOfExpiry: [],
      }),
      EmergencyContactDetails: this.formBuilder.group({
        ContactName: [],
        Relation: [],
        Email: [],
        ContactNo: [],
      }),
      BankingAndInsuranceDetails: this.formBuilder.group({
        BankAccountNoPayroll: [],
        PersonalBankAccount: [],
        InsuranceCoverage: [],
      }),
      SalaryDetails: this.formBuilder.group({
        TotalSalary: [],
        BasicSalary: [],
        HousingAllowance: [],
        TransporationAllowance: [],
        Deductions: [],
        OtherAllowances: [],
      }),
      ActiveVacationDetails: this.formBuilder.group({
        VacationType: [],
        Date: [],
        VacationStartDate: [],
        VacationEndDate: [],
        TotalVacationDays: [],
        Notes: [],
      }),
      VacationDetails: this.formBuilder.group({
        VacationBalance: [],
        LastVacationDate: [],
        LastResumptionDate: [],
      })
    });

    this.editEmployeeForm = this.formBuilder.group({
      Id: [],
      CompanyName: ["", [Validators.required]],
      Name: ["", [Validators.required]],
      EmployeeCode: ["", [Validators.required]],
      Gender: [],
      BirthDate: [],
      MobileNo: [],
      EmailId: [],
      BloodGroup: [],
      Nationality: [],
      NoOfDependants: [],
      Status: [],
      CompanyDetails: this.formBuilder.group({
        CompanyNo: [],
        CompanyName: [],
        Position: [],
        EntryDate: [],
        HiringDate: [],
      }),
      AddressDetails: this.formBuilder.group({
        AddressType: [],
        Address1: [],
        Address2: [],
        Street: [],
        City: [],
        district: [],
      }),
      IqamaDetails: this.formBuilder.group({
        IqamaId: [],
        BoarderNo: [],
        IsIqamaExpired: [],
        DateOfExpiry: [],
      }),
      PassportDetails: this.formBuilder.group({
        PassportNumber: [],
        PlaceOfIssue: [],
        IssueDate: [],
        DateOfExpiry: [],
      }),
      EmergencyContactDetails: this.formBuilder.group({
        ContactName: [],
        Relation: [],
        Email: [],
        ContactNo: [],
      }),
      BankingAndInsuranceDetails: this.formBuilder.group({
        BankAccountNoPayroll: [],
        PersonalBankAccount: [],
        InsuranceCoverage: [],
      }),
      SalaryDetails: this.formBuilder.group({
        TotalSalary: [],
        BasicSalary: [],
        HousingAllowance: [],
        TransporationAllowance: [],
        Deductions: [],
        OtherAllowances: [],
      }),
      ActiveVacationDetails: this.formBuilder.group({
        VacationType: [],
        Date: [],
        VacationStartDate: [],
        VacationEndDate: [],
        TotalVacationDays: [],
        Notes: [],
      }),
      VacationDetails: this.formBuilder.group({
        VacationBalance: [],
        LastVacationDate: [],
        LastResumptionDate: [],
      })
    });
  }

  // Get Employee  Api Call
  loadEmployee() {
    this.srvModuleService.get("this.url").subscribe((data) => {
      console.log(data);
      this.lstEmployee = data;
      this.rows = this.lstEmployee;
      this.srch = [...this.rows];
    });
  }

  // Add employee  Modal Api Call
  addEmployee() {
    let DateJoin = this.pipe.transform(
      this.addEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );

    console.log(this.addEmployeeForm.value);

    let finalObj = this.addEmployeeForm.value;
    finalObj.isActive = true
    delete finalObj.BankingAndInsuranceDetails.InsuranceCoverage;
    finalObj.IqamaDetails.IsIqamaExpired = false;
    console.log('finalObj', finalObj);
    this.srvModuleService.add(finalObj, this.url).subscribe((data) => {
      console.log('data', data);
    });
    this.loadEmployee();
    $("#add_employee").modal("hide");
    this.addEmployeeForm.reset();
    this.toastr.success("Employeee added sucessfully...!", "Success");
  }

  editEmployee() {
    let DateJoin = this.pipe.transform(
      this.editEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );

    let finalObj = this.editEmployeeForm.value;
    finalObj.isActive = true
    delete finalObj.BankingAndInsuranceDetails.InsuranceCoverage;
    finalObj.IqamaDetails.IsIqamaExpired = false;
    console.log('finalObj', finalObj);
    this.srvModuleService.update(finalObj, this.url).subscribe((data) => {
      console.log('data', data);
      this.loadEmployee();
    });
    
    $("#edit_employee").modal("hide");
    this.toastr.success("Employeee Updated sucessfully...!", "Success");
  }

  // To Get The employee Edit Id And Set Values To Edit Modal Form
  editEmp(value) {
    this.editId = value;
    console.log('val1', value);
    const index = this.lstEmployee.findIndex((item) => {
      return item.Id === value;
    });
    console.log('val2', index);
    let toSetValues = this.lstEmployee[index];
    // console.log('Employee Selected', toSetValues);
    // console.log('entry date', toSetValues.CompanyDetails?.EntryDate)
    this.editEmployeeForm.setValue({
      CompanyName: toSetValues.CompanyDetails?.CompanyName ? toSetValues.CompanyDetails?.CompanyName : '' ,
      Id: toSetValues.Id ? toSetValues.Id : '',
      Name: toSetValues.Name,
      EmployeeCode: toSetValues.EmployeeCode,
      Gender: toSetValues.Gender ? toSetValues.Gender.trim() : '',
      BirthDate: toSetValues.BirthDate ? toSetValues.BirthDate : '',
      MobileNo: toSetValues.MobileNo ? toSetValues.MobileNo : '',
      EmailId: toSetValues.EmailId ? toSetValues.EmailId : '',
      BloodGroup: toSetValues.BloodGroup ? toSetValues.BloodGroup : '',
      Nationality: toSetValues.Nationality ? toSetValues.Nationality : '',
      NoOfDependants: toSetValues.NoOfDependants ? toSetValues.NoOfDependants : '',
      Status: toSetValues.Status ? toSetValues.Status : '',
      CompanyDetails: {
        CompanyNo: toSetValues.CompanyDetails?.CompanyNo ? toSetValues.CompanyDetails?.CompanyNo : '',
        CompanyName: toSetValues.CompanyDetails?.CompanyName ? toSetValues.CompanyDetails?.CompanyName : '' ,
        Position: toSetValues.CompanyDetails?.Position ? toSetValues.CompanyDetails?.Position : '',
        EntryDate: toSetValues.CompanyDetails?.EntryDate ? toSetValues.CompanyDetails?.EntryDate : '',
        HiringDate: toSetValues.CompanyDetails?.HiringDate ? toSetValues.CompanyDetails?.HiringDate : '',
      },
      AddressDetails: {
        AddressType: toSetValues.AddressDetails?.AddressType ? toSetValues.AddressDetails?.AddressType : '',
        Address1: toSetValues.AddressDetails?.Address1 ? toSetValues.AddressDetails?.Address1 : '',
        Address2: toSetValues.AddressDetails?.Address2 ? toSetValues.AddressDetails?.Address2 : '',
        Street: toSetValues.AddressDetails?.Street ? toSetValues.AddressDetails?.Street : '',
        City: toSetValues.AddressDetails?.City ? toSetValues.AddressDetails?.City : '',
        district: toSetValues.AddressDetails?.District ? toSetValues.AddressDetails?.District : ''
      },
      IqamaDetails: {
        IqamaId: toSetValues.IqamaDetails?.IqamaId ? toSetValues.IqamaDetails?.IqamaId : '',
        BoarderNo: toSetValues.IqamaDetails?.BoarderNo ? toSetValues.IqamaDetails?.BoarderNo : '',
        IsIqamaExpired: toSetValues.IqamaDetails?.IsIqamaExpired ? toSetValues.IqamaDetails?.IsIqamaExpired : '',
        DateOfExpiry: toSetValues.IqamaDetails?.DateOfExpiry ? toSetValues.IqamaDetails?.DateOfExpiry : ''
      },
      PassportDetails: {
        PassportNumber: toSetValues.PassportDetails?.PassportNumber ? toSetValues.PassportDetails?.PassportNumber : '',
        PlaceOfIssue: toSetValues.PassportDetails?.PlaceOfIssue ? toSetValues.PassportDetails?.PlaceOfIssue : '',
        IssueDate: toSetValues.PassportDetails?.IssueDate ? toSetValues.PassportDetails?.IssueDate : '',
        DateOfExpiry: toSetValues.PassportDetails?.DateOfExpiry ? toSetValues.PassportDetails?.DateOfExpiry : ''
      },
      EmergencyContactDetails: {
        ContactName: toSetValues.EmergencyContactDetails?.ContactName ? toSetValues.EmergencyContactDetails?.ContactName : '',
        Relation: toSetValues.EmergencyContactDetails?.Relation ? toSetValues.EmergencyContactDetails?.Relation : '',
        Email: toSetValues.EmergencyContactDetails?.Email ? toSetValues.EmergencyContactDetails?.Email : '',
        ContactNo: toSetValues.EmergencyContactDetails?.ContactNo ? toSetValues.EmergencyContactDetails?.ContactNo : ''
      },
      BankingAndInsuranceDetails: {
        BankAccountNoPayroll: toSetValues.BankingAndInsuranceDetails?.BankAccountNoPayroll ?  toSetValues.BankingAndInsuranceDetails?.BankAccountNoPayroll : '',
        PersonalBankAccount: toSetValues.BankingAndInsuranceDetails?.PersonalBankAccount ? toSetValues.BankingAndInsuranceDetails?.PersonalBankAccount : '',
        InsuranceCoverage: toSetValues.BankingAndInsuranceDetails?.InsuranceCoverage ? toSetValues.BankingAndInsuranceDetails?.InsuranceCoverage : ''
      },
      SalaryDetails: {
        TotalSalary: toSetValues.SalaryDetails?.TotalSalary ? toSetValues.SalaryDetails?.TotalSalary : '',
        BasicSalary: toSetValues.SalaryDetails?.BasicSalary ? toSetValues.SalaryDetails?.BasicSalary : '',
        HousingAllowance: toSetValues.SalaryDetails?.HousingAllowance ? toSetValues.SalaryDetails?.HousingAllowance : '',
        TransporationAllowance: toSetValues.SalaryDetails?.TransporationAllowance ? toSetValues.SalaryDetails?.TransporationAllowance : '',
        Deductions: toSetValues.SalaryDetails?.Deductions ? toSetValues.SalaryDetails?.Deductions : '',
        OtherAllowances: toSetValues.SalaryDetails?.OtherAllowances ? toSetValues.SalaryDetails?.OtherAllowances : ''
      },
      ActiveVacationDetails: {
        VacationType: toSetValues.ActiveVacationDetails?.VacationType ? toSetValues.ActiveVacationDetails?.VacationType : '',
        Date: toSetValues.ActiveVacationDetails?.Date ? toSetValues.ActiveVacationDetails?.Date : '',
        VacationStartDate: toSetValues.ActiveVacationDetails?.VacationStartDate ? toSetValues.ActiveVacationDetails?.VacationStartDate : '',
        VacationEndDate: toSetValues.ActiveVacationDetails?.VacationEndDate ? toSetValues.ActiveVacationDetails?.VacationEndDate : '',
        TotalVacationDays: toSetValues.ActiveVacationDetails?.TotalVacationDays ? toSetValues.ActiveVacationDetails?.TotalVacationDays : '',
        Notes: toSetValues.ActiveVacationDetails?.Notes ? toSetValues.ActiveVacationDetails?.Notes : ''
      },
      VacationDetails: {
        VacationBalance: toSetValues.VacationDetails?.VacationBalance ?  toSetValues.VacationDetails?.VacationBalance : '',
        LastVacationDate: toSetValues.VacationDetails?.LastVacationDate ? toSetValues.VacationDetails?.LastVacationDate : '',
        LastResumptionDate: toSetValues.VacationDetails?.LastResumptionDate ? toSetValues.VacationDetails?.LastResumptionDate : ''
      }
    });
  }

  // edit update data set
  public edit(value: any) {
    let data = this.lstEmployee.filter((client) => client.id === value);
    this.editEmployeeForm.setValue({
      FirstName: data[0].firstname,
      LastName: data[0].lastname,
      UserName: data[0].username,
      Email: data[0].email,
      Password: data[0].password,
      ConfirmPassword: data[0].confirmpassword,
      EmployeeID: data[0].employeeId,
      JoinDate: data[0].joindate,
      PhoneNumber: data[0].phone,
      CompanyName: data[0].company,
      DepartmentName: data[0].department,
      Designation: data[0].designation,
      Id: data[0].id,
    });
  }

  // delete api call
  deleteEmployee() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.loadEmployee();
      $("#delete_employee").modal("hide");
      this.toastr.success("Employee deleted sucessfully..!", "Success");
    });
  }

  //search by name
  searchEmployee(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      console.log(d.Id);
      return d.EmployeeCode.toLowerCase().indexOf(val) !== -1 ||
        d.Name.toLowerCase().indexOf(val) !== -1 ||
        !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by designation
  searchByDesignation(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
}
