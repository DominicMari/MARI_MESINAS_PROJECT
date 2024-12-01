// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';

// @NgModule({
//   declarations: [AppComponent],
//   imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
//   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // If using Firebase Authentication
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp } from 'firebase/app';  // Import Firebase core module
import { getAuth } from 'firebase/auth';      // Import Firebase auth service

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), // Initializes Ionic module
    AppRoutingModule, // Routing module to handle navigation
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase with environment config
    AngularFireAuthModule, // If using Firebase Authentication
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Ionic routing strategy for better navigation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Initialize Firebase manually if required
    initializeApp(environment.firebaseConfig);
    const auth = getAuth();
  }
}
