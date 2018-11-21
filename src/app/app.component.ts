import { Component, Injectable, OnInit } from '@angular/core';
import { Reservoir } from "./reservoir/model/reservoir";
import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
//var resers ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  reservoirs: any;
  apiUrl: string = 'http://localhost:8080/reservoirs';

  constructor(private http: HttpClient) {
    this.http.get(this.apiUrl).subscribe(data => {
      this.reservoirs = data;
    });

    // this.try();




  }

  // async try() {
  //   await sleep(1000);
  //   this.prints();
  //   this.r1 = this.reservoirs[1];
  // }




  // gets(){
  //   return this.http.get(this.apiUrl).subscribe(data => {
  //     this.reservoirs = data;
  //   });
  // }

  // prints(){
  //   console.log(this.reservoirs);
  // }


  changeLevels() {
    this.reservoirs[0].level = Math.floor(Math.random() * (4000 - 1500 + 1)) + 500;
    this.reservoirs[1].level = Math.floor(Math.random() * (4000 - 1500 + 1)) + 500;
    this.reservoirs[2].level = Math.floor(Math.random() * (4000 - 1500 + 1)) + 500;
    this.reservoirs[3].level = Math.floor(Math.random() * (4000 - 1500 + 1)) + 500;
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

