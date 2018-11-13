import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{LoginLugaresPage} from '../login-lugares/login-lugares'

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Slide {
  title: string;
  description: string;
  image: string;
}
@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  slides: Slide[];
  showSkip = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

 irUsuario(){
this.navCtrl.push(LoginPage)
  }
  irEstablesimiento(){
    this.navCtrl.push(LoginLugaresPage)

  }
 
}
