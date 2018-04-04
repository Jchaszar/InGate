import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivisionModalPage } from './division-modal';

@NgModule({
  declarations: [
    DivisionModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DivisionModalPage),
  ],
})
export class DivisionModalPageModule {}
