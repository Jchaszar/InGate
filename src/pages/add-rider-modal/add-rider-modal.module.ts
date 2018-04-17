import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRiderModalPage } from './add-rider-modal';

@NgModule({
  declarations: [
    AddRiderModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRiderModalPage),
  ],
})
export class AddRiderModalPageModule {}
