import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#dc3545",
    b: "#6610f2",
  };
  public lineColors = {
    a: "#dc3545",
    b: "#6610f2",
  };
  public userName123: string;
  public isAdmin123: string;

  constructor(private route: ActivatedRoute) {
//     this.userName= this.route.snapshot.paramMap.get('username');
//     this.isAdmin= this.route.snapshot.paramMap.get('isadmin');
// console.log(route);
//     console.log("user :" + this.route.snapshot.paramMap.get('username'));
//     console.log("isAdmin :" + this.isAdmin);
// this.route.queryParams.subscribe(params => {
//   // this.name = params['name'];

//    this.userName123= params['username123'];
//    this.isAdmin123= params['isadmin123'];

//    console.log("user :" + params['username123']);
//    console.log("isAdmin :" + params['isadmin123']);
//  });
  }

  ngOnInit() {

    
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];
  }
}
