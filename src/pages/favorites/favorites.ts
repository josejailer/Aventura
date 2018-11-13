import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service'
import { DetailLocalPage } from '../detail-local/detail-local'
 /**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthService,
    public modalCtrl: ModalController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  verMas(item){
    this.authService.getLocalId(item).then(res =>{
      console.log(res);
      this.modalCtrl.create(DetailLocalPage, {local : res}).present();
    }).catch(erro =>{
      console.log(erro);
      
    }) 
  }

}
