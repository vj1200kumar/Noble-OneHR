export class Employee {
    EmployeeId;
    CompanyName;
    Name;
    EmployeeCode;
    Gender;
    BirthDate;
    MobileNo;
    EmailId;
    BloodGroup;
    Nationality;
    NoOfDependants;
    Status;
    CompanyDetails: {
        CompanyNo;
        CompanyName;
        Position;
        EntryDate;
        HiringDate;
    };
    AddressDetails: {
        AddressType;
        Address1;
        Address2;
        Street;
        City;
        district;
    };
    IqamaDetails: {
        IqamaId;
        BoarderNo;
        IsIqamaExpired;
        DateOfExpiry;
    };
    PassportDetails: {
        PassportNumber;
        PlaceOfIssue;
        IssueDate;
        DateOfExpiry;
    };
    EmergencyContactDetails: {
        ContactName;
        Relation;
        Email;
        ConatctNumber;
    };
    BankingAndInsuranceDetails: {
        BankAccountNoPayroll;
        PersonalBankAccount;
        InsuranceCoverage;
    };
    SalaryDetails: {
        TotalSalary;
        BasicSalary;
        HosusingAlloawance;
        TransportAlloawance;
        Deductions;
        OtherAlloawances;
    };
    ActiveVacationDetails: {
        VacationType;
        Date;
        VacationStartDate;
        VacationEndDate;
        TotalVacationDays;
        Notes;
    };
    VacationDetails: {
        VacationBalance;
        LastVacationDate;
        LastResumptionDate;
    };
}

