import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoProject';
  firstName: string = "RICARDO";
  lastName: string = "VICTORIANO";
  city = 'LISBON';
  address = 'Av. dos Bons Amigos, 29';
  radioStatus: boolean;
  clickCount: number = 1;
  mouseOverCount: number = 1;
  keyPressedCount: number = 1;
  posts: object[];
  user = {
    userName: "",
    senha: ""
  }

  constructor() {

    this.getRadioStatus();
    this.posts = [
      { postTitle: 'Post 1' },
      { postTitle: 'Post 2' },
      { postTitle: 'Post 3' },
      { postTitle: 'Post 4' },
      { postTitle: 'Post 5' },
      { postTitle: 'Post 6' },
      { postTitle: 'Post 7' },
      { postTitle: 'Post 8' },
      { postTitle: 'Post 9' },
      { postTitle: 'Post 10' },
    ];
  }

  getRadioStatus() {
    this.radioStatus = true;
  }


  multiply(n1: number, n2: number) {
    return n1 * n2;
  }

  buttonClicked() {
    //alert("Você clicou!!!");
    console.log(`You've clicked ${this.clickCount++} time(s)`);
  }

  mousingOver() {
    console.log(`You've passed here ${this.mouseOverCount++} time(s)`);
  }

  keyPressing() {
    console.log(`You've pressed ${this.keyPressedCount++} key(s)`);

  }

  onSubmit(formulario: NgForm) {
    this.user.userName = formulario.value.username;
    this.user.senha = formulario.value.password;
    console.log(this.user);

    //console.log(`Username introduzido: ${this.user.userName}\n Senha introduzida: ${this.user.senha}`);

  }
}

