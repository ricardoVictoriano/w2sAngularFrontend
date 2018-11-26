import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { Reservoir } from './reservoir/model/reservoir';
import { Message } from "./message/model/message.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})





export class AppComponent {
  reservoirs: any;
  map;
  markerIconUrl = '../assets/imgs/pin.png';
  mapZoom = 14;
  apiUrl: string = 'http://localhost:8080/reservoirs';
  lat: number = 41.126663;
  lng: number = -8.636477;
  msgIndex: number = 0;
  alarms: Array<Message> = [];
  warnings: Array<Message> = [];



  retLevelByIndex(index: number, r: Reservoir) {
    let aux: number = this.retLevel(r.logs[index]);
    return aux;
  }

  async change() {
    await sleep(5000);
    let dAux: Date = new Date();
    dAux.setMinutes(Math.ceil(dAux.getMinutes() / 5) * 5);
    let index = this.findTime(dAux, this.reservoirs[0].logs);
    for (let i = index; i < this.reservoirs[0].logs.length; i++) {
      this.reservoirs[0].level = this.retLevelByIndex(i, this.reservoirs[0]);
      this.createMessage(this.reservoirs[0]);
      this.reservoirs[1].level = this.retLevelByIndex(i, this.reservoirs[1]);
      this.createMessage(this.reservoirs[1]);
      this.reservoirs[2].level = this.retLevelByIndex(i, this.reservoirs[2]);
      this.createMessage(this.reservoirs[2]);
      this.reservoirs[3].level = this.retLevelByIndex(i, this.reservoirs[3]);
      this.createMessage(this.reservoirs[3]);
      await sleep(5000);
    }

  }



  findTime(date: Date, logs: string[]) {
    let index: number;
    for (let i = 0; i < logs.length; i++) {
      if (this.retTime(logs[i]).getHours() == date.getHours() && this.retTime(logs[i]).getMinutes() == date.getMinutes()) {
        index = i;
        break;
      }
    }
    return index;

  }

  async print() {
    await sleep(500);
    console.log(" ["+this.reservoirs[0].lat+", "+this.reservoirs[0].lon+"] ");

  }

  constructor(private http: HttpClient) {



    this.http.get(this.apiUrl).subscribe(data => {
      this.reservoirs = data;
    });

    this.change();

    this.print();



  }


  retLevel(log: string) {
    let aux: string = log.substr(log.indexOf('level') + 8, 9);
    aux = aux.replace(',', '.');
    let l: number;
    l = +aux;
    return l;

  }




  createMessage(re: Reservoir) {
    let mes = new Message();
    mes.reservoirId = re.id;
    mes.timestamp = new Date().toLocaleString();
    mes.messageType = "null";
    let aux = this.msgIndex + 1;
    mes.id = "" + aux + "";
    let x: number;
    x = this.calculatePercentage(re);
    if (x > 85) {
      mes.messageType = "Warning";
      mes.content = "Water level on " + re.id + " is above 85% ";
    }
    else if (x < 25) {
      mes.messageType = "Alarm";
      mes.content = "Water level on " + re.id + " is below 25% ";
    }
    // console.log(mes.toString());

    if (mes.messageType !== "null") {
      if (mes.messageType === "Warning")
        this.warnings.push(mes);
      else if (mes.messageType === "Alarm")
        this.alarms.push(mes);
      this.msgIndex = this.msgIndex + 1;
    }
  }

  calculatePercentage(res: Reservoir) {
    return (res.level * 100) / res.capacity;
  }

  retTime(log: string) {
    let d = new Date();
    d.setHours(+log.substr(22, 2) as number);
    d.setMinutes(+log.substr(24, 2) as number);
    d.setSeconds(+log.substr(26, 2) as number);

    return d;
  }



}

function sleep(ms = 0) {

  return new Promise(r => setTimeout(r, ms));

}

