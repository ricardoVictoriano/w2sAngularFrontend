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
  mainLastSize = "";
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
    console.log(" [" + this.reservoirs[0].lat + ", " + this.reservoirs[0].lon + "] ");

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

  closeAssetsDiv() {

    var assetsMenu = document.getElementById("assetsDivInside");
    assetsMenu.style.display = "none";


    var mainDiv = document.getElementById("mainDiv");
    mainDiv.style.left = "2%";

    if (mainDiv.style.width == "82.5%") {
      mainDiv.style.width = "96%";
      this.mainLastSize = mainDiv.style.width;
    }
    else {
      mainDiv.style.width = "74.5%";
      this.mainLastSize = mainDiv.style.width;
    }



    var botCollapse = document.getElementById("btnCloseLeft");
    botCollapse.style.display = "none";

    var botOpen = document.getElementById("btnOpenLeft");
    botOpen.style.display = "grid";
  }

  openAssetsDiv() {

    var assetsMenu = document.getElementById("assetsDivInside");
    assetsMenu.style.display = "block";


    var mainDiv = document.getElementById("mainDiv");
    mainDiv.style.left = "15.5%";


    if (mainDiv.style.width == "96%") {
      mainDiv.style.width = "82.5%";
      this.mainLastSize = mainDiv.style.width;
    }
    else {
      mainDiv.style.width = "61%";
      this.mainLastSize = mainDiv.style.width;
    }


    var botCollapse = document.getElementById("btnCloseLeft");
    botCollapse.style.display = "grid";

    var botOpen = document.getElementById("btnOpenLeft");
    botOpen.style.display = "none";
  }


  closeRight() {

    var rightDiv = document.getElementById("alertsPanelInside");

    rightDiv.style.display = "none";

    var rightAllDiv = document.getElementById("rightAllDiv");
    rightAllDiv.style.width = "2%";
    rightAllDiv.style.zIndex = "0";
    rightAllDiv.style.height = "auto";
    rightAllDiv.style.bottom = "10%";
    rightAllDiv.style.top = "10%";


    var md = document.getElementById("mainDiv");
    md.style.right = "2%";

    if (md.style.width == "74.5%") {
      // alert("yes");
      md.style.width = "96%";
      this.mainLastSize = md.style.width;
    }
    else {
      // alert("no");
      md.style.width = "82.5%";
      this.mainLastSize = md.style.width;
    }

    // alert(md.style.width);

    var btnOpenRight = document.getElementById("btnOpenRight");
    btnOpenRight.style.display = "block";
    btnOpenRight.style.background = "url('../assets/imgs/left.png') no-repeat";

    var btnCloseRight = document.getElementById("btnCloseRight");
    btnCloseRight.style.display = "none";
  }



  openRight() {
    var right = document.getElementById("rightAllDiv");

    if (right.style.width == "2%") {
      var btOp = document.getElementById("btnOpenRight");
      btOp.style.background = "url('../assets/imgs/enlarge.png') no-repeat";
      // btOp.style.display = "none";

      var btCl = document.getElementById("btnCloseRight");
      btCl.style.display = "grid";


      right.style.display = "block";
      right.style.width = "23%";
      right.style.zIndex = "0";
      right.style.height = "auto";
      right.style.bottom = "10%";
      right.style.top = "10%";

      var rightDivInside = document.getElementById("alertsPanelInside");
      rightDivInside.style.display = "block";

      var main = document.getElementById("mainDiv");
      // alert(main.style.width);
      if (main.style.width == "82.5%") {
        main.style.width = "61%";
        this.mainLastSize = main.style.width;
      }
      else {
        main.style.width = "74.5%";
        this.mainLastSize = main.style.width;
      }
    }
    else {

      if (right.style.width == "100%") {
        var btnClose = document.getElementById("btnCloseRight");
        var btn = document.getElementById("btnOpenRight");
        btn.style.background = "url('../assets/imgs/enlarge.png') no-repeat";
        btnClose.style.display = "grid";
        right.style.width = "23%";
        right.style.zIndex = "0";
        right.style.height = "auto";
        right.style.bottom = "10%";
        right.style.top = "10%";

      }
      else {
        var btn = document.getElementById("btnOpenRight");
        var btnClose = document.getElementById("btnCloseRight");
        btnClose.style.display = "none";
        btn.style.background = "url('../assets/imgs/minimize.png') no-repeat";
        right.style.width = "100%";
        right.style.height = "100%";
        right.style.zIndex = "8000";
        right.style.background = "white";
        right.style.top = "0";
        right.style.bottom = "0";

      }
    }
  }


  pop() {

    var mainDiv = document.getElementById("mainDiv").outerHTML;

    window.open("localhost:4200");

  }




  enlarge() {

    var main = document.getElementById("mainDiv");
    var btnColapse = document.getElementById("btnCollapse");
    // alert(this.mainLastSize);



    if (main.style.width == "100%") {

      if (this.mainLastSize == "61%" || this.mainLastSize == "undefined" || this.mainLastSize == "") {
        main.style.width = "61%";
        main.style.top = "10%";
        main.style.height = "auto";
        main.style.bottom = "10%";
        main.style.left = "15.5%";
        main.style.right = "23%";
        btnColapse.style.background = "url('../assets/imgs/enlarge.png') no-repeat";

      }

      if (this.mainLastSize == "96%") {
        main.style.width = "96%";
        main.style.top = "10%";
        main.style.height = "auto";
        main.style.bottom = "10%";
        main.style.left = "2%";
        main.style.right = "2%";
        btnColapse.style.background = "url('../assets/imgs/enlarge.png') no-repeat";
      }
      else {
        if (this.mainLastSize == "82.5%") {
          main.style.width = "82.5%";
          main.style.top = "10%";
          main.style.height = "auto";
          main.style.bottom = "10%";
          main.style.left = "15.5%";
          main.style.right = "2%";
          btnColapse.style.background = "url('../assets/imgs/enlarge.png') no-repeat";
        }
        else {
          if (this.mainLastSize == "74.5%") {
            main.style.width = "74.5%";
            main.style.top = "10%";
            main.style.height = "auto";
            main.style.bottom = "10%";
            main.style.left = "2%";
            main.style.right = "23%";
            btnColapse.style.background = "url('../assets/imgs/enlarge.png') no-repeat";
          }

        }
      }


    }
    else {


      main.style.width = "100%";
      main.style.height = "100%";
      main.style.top = "0";
      main.style.right = "0";
      main.style.left = "0";
      main.style.bottom = "0";
      main.style.zIndex = "50";
      btnColapse.style.background = "url('../assets/imgs/minimize.png') no-repeat";

    }

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

