import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstablecimientosPage } from './establecimientos';

@NgModule({
  declarations: [
    EstablecimientosPage,
  ],
  imports: [
    IonicPageModule.forChild(EstablecimientosPage),
  ],
})
export class EstablecimientosPageModule {}
