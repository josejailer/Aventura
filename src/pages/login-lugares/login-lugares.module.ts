import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginLugaresPage } from './login-lugares';

@NgModule({
  declarations: [
    LoginLugaresPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginLugaresPage),
  ],
})
export class LoginLugaresPageModule {}
