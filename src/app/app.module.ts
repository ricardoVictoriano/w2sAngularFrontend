import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReservoirComponent } from './reservoir/reservoir.component';
import { HttpModule } from "@angular/http";
import { AgmCoreModule } from "@agm/core";

const appRoutes: Routes = [
 // { path: '', component: HomeComponent },
 // { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ReservoirComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBH64wu9vaz2LptRnAnoDCBYQ9zANKIf8k'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
