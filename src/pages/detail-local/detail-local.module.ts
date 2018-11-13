import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailLocalPage } from './detail-local';

@NgModule({
  declarations: [
    DetailLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailLocalPage),
  ],
})
export class DetailLocalPageModule {}
