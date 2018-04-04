import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivisionInfoPage } from './division-info';

@NgModule({
  declarations: [
    DivisionInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DivisionInfoPage),
  ],
})
export class DivisionInfoPageModule {}
