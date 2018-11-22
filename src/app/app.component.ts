import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { Reservoir } from './reservoir/model/reservoir';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  reservoirs: any;
  map;
  apiUrl: string = 'http://localhost:8080/reservoirs';
  lat: number = 38.753367;
  lng: number = -9.144698;

  constructor(private http: HttpClient) {
    this.http.get(this.apiUrl).subscribe(data => {
      this.reservoirs = data;
    });

    this.try();
  }

  retAlerts(r: Reservoir) {
    let date: Date = new Date();
    let log: string = r.logs[501];
    // console.log(log.substr(14,14));
    date.setHours(+log.substr(22,2) as number);
    date.setMinutes(+log.substr(24,2) as number);
    date.setSeconds(+log.substr(26,2) as number);
    console.log(date.toLocaleString());
  }

  async try() {
    await sleep(500);
    this.prints();
    this.retAlerts(this.reservoirs[2]);
  }




  // gets(){
  //   return this.http.get(this.apiUrl).subscribe(data => {
  //     this.reservoirs = data;
  //   });
  // }

  prints() {
    console.log(this.reservoirs);
    // console.log(this.reservoirs[2].id);
  }




  // async try() {
  //   await sleep(1000);

  //   while (true) {
  //     let lastLevels: number[];
  //     for (let k = 0; k < this.reservoirs.length; k++) {
  //       lastLevels = this.reservoirs[k].level;
  //     }
  //     await sleep(3000);
  //     this.changeLevels();

  //     for (let i = 0; i < this.reservoirs.length; i++) {
  //       this.reservoirs[i].level = Math.floor(Math.random() * (4000 - 1500 + 1)) + 500;
  //       if (this.reservoirs[i].level < lastLevels[i]) {
  //         document.getElementById("asset-level").style.color = "red";
  //       }
  //       else if (this.reservoirs[i].level > lastLevels[i]) {
  //         document.getElementById("asset-level").style.color = "green";
  //       }
  //       lastLevels[i] = this.reservoirs[i].level;

  //     }
  //   }

  // }




}

function sleep(ms = 0) {

  return new Promise(r => setTimeout(r, ms));

}

