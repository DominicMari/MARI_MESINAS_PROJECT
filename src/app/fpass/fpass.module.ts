import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FpassPageRoutingModule } from './fpass-routing.module';

import { ForgotPasswordPage } from './fpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FpassPageRoutingModule
  ],
  declarations: [ForgotPasswordPage]
})
export class FpassPageModule {}