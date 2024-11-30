import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';  // Import your LoginPage component
import { LoginPageRoutingModule } from './login-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LoginPage],  // Declare the LoginPage component here
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule  // Import routing module for lazy-loaded routes
  ],
})
export class LoginModule { }