import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { CitiesProvider } from '../../providers/cities/cities'
 

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  constructor(public platform: Platform,
    private authService: AuthService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public cities: CitiesProvider
  ) {
  }

  ionViewDidLoad() {
    for (let i in this.cities.cities) {
      for (let j in this.cities.categorys) {
        this.getLocal(this.cities.cities[i].nombre, this.cities.categorys[j].nombre)
      }
    }
  }

  getLocal(city, cate) {
    this.authService.local =  []
    this.authService.getLocalAll(city, cate).then(res => {
      let response: any = res
      if (response.length > 0) {
        for (let i in response) {
          this.authService.local.push(response[i])
        }
      }
    }).catch(error => {
      console.log("error Local: ", error);
    }
    )
  }

  editLocal(local, establecimiento) {
    this.openModal(local, establecimiento, 'edit')
  }

  newLocal() {
    this.openModal("", "", 'add')
  }

  openModal(local, establecimiento, action) {
    let modal = this.modalCtrl.create('ModalLocalPage', { local: local, establecimiento: establecimiento, action: action });
    modal.present();
  }

}
