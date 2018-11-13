import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPage } from './usuario';

@NgModule({
  declarations: [
    UsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioPage),
  ],
  exports: [
    UsuarioPage
  ]
})
export class UsuarioPageModule {}
//"angularfire2": "^5.0.0-rc.11",