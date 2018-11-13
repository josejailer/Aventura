import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroLugaresPage } from './registro-lugares';

@NgModule({
  declarations: [
    RegistroLugaresPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroLugaresPage),
  ],
})
export class RegistroLugaresPageModule {}
