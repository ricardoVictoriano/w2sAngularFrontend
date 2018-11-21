import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reservoir } from "./model/reservoir";

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.css']
})

export class ReservoirComponent {
  res = new Reservoir();


  constructor() {
  }

  try(){
    this.res.id = "R27";
    this.res.designation = "Cambambe";
    this.res.capacity = 4000;
    this.res.level = 3120;
    this.res.ph = 7.2;
    this.res.chlorine = 1.8;
    this.res.lat = "-9.753974";
    this.res.lon = "14.496803 ";
  
  }


  



}






