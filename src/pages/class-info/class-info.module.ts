import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassInfoPage } from './class-info';

@NgModule({
  declarations: [
    ClassInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassInfoPage),
  ],
})
export class ClassInfoPageModule {}
