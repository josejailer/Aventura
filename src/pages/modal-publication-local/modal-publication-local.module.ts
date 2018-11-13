import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPublicationLocalPage } from './modal-publication-local';

@NgModule({
  declarations: [
    ModalPublicationLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPublicationLocalPage),
  ],
})
export class ModalPublicationLocalPageModule {}
