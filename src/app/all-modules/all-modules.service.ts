import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
//import { AllModulesData } from "src/assets/all-modules-data/all-modules-data";
import { id } from "src/assets/all-modules-data/id";
import { Employee } from "../Models/employee";

@Injectable({
  providedIn: "root",
})
export class AllModulesService {
  // Chats

  groups = {
    active: "",
    total: ["general", "video responsive survey", "500rs", "warehouse"],
  };
  members = {
    active: "Mike Litorus",
    total: [
      { name: "John Doe", count: 3 },
      { name: "Richard Miles", count: 0 },
      { name: "John Smith", count: 7 },
      { name: "Mike Litorus", count: 9 },
    ],
  };

  // Api Methods for All modules

  public apiurl;

  // Headers Setup
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }

  private handleErrorLogin(error: any) {
    return error;
  }

  // Get Method Api
  get(type): Observable<Employee[]> {
    this.apiurl = `api/${type}`;

    return this.http
      .get<Employee[]>("https://onehr-employee-service.azurewebsites.net/api/employees?code=Misb/EhYlskAxKeOQtibZr7ttHdH0FSrMyH/0TBB4zLKUcO0KVEJmw==")
      .pipe(tap(), catchError(this.handleError));
  }

  // Post Method Api
  add(user: any, type): Observable<any> {
    this.apiurl = `https://onehr-employee-service.azurewebsites.net/api/employees?code=R0USqHH5Btohh0iqORO9c6VLTUzaOX6jtNp2onQaa6aasaZlrMRwFQ==`;
    user.id = null;
    return this.http
      .post<any>(this.apiurl, user, this.httpOptions)
      .pipe(
        map(() => user),
        catchError(this.handleError)
      );
  }

   // Post Method Api
   login(user: any, type): Observable<any> {
    this.apiurl = `https://onehr-employee-service.azurewebsites.net/api/employees/login?code=DMHUMzPoAhEZq4nvzck9fbKareaj18eRcfjXGoCfZfNmGwow6xk0dg==`;
    //user.id = null;
    console.log(this.http
      .post<any>(this.apiurl, user, this.httpOptions))
    return this.http
      .post<any>(this.apiurl, user, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  // Update Method Api
  update(user: any, type): Observable<any> {
    this.apiurl = `api/${type}`;
    const url = `${this.apiurl}/${user.id}`;
    return this.http.put<any>(url, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  // Delete Method Api
  delete(id: id, type): Observable<id> {
    this.apiurl = `api/${type}`;
    const url = `${this.apiurl}/${id}`;
    return this.http
      .delete<id>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
