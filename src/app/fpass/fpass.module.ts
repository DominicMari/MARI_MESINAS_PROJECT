import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FpassPageRoutingModule } from './fpass-routing.module';

import { FpassPage } from './fpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FpassPageRoutingModule
  ],
  declarations: [FpassPage]
})
export class FpassPageModule {}
