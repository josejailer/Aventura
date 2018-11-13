import { Component, ViewChild } from '@angular/core';
import { CitiesProvider } from '../../providers/cities/cities'
import { AlertController, List, ModalController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { AuthService } from '../../providers/auth/auth-service'

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  itemList: any[];
  relationship = "normal"
  ciudad: any
  indice = 1
  public sumaIndustrial: any;

  @ViewChild('myNav') nav: NavController;
  loader: any
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public cities: CitiesProvider,
    public authService: AuthService
  ) {
    this.presentLoading("Cargando Ciudades...")
    this.getCities()
  }

  getCities() {
    this.cities.getCities_1().then(res => {
      this.ciudad = res
      console.log(this.ciudad);
      
      this.hideLoading()
    }).catch(error => {
      this.hideLoading()
      console.log(error);
    })
  }

  openCategories(Establishments){
    let arr = []
    for (let i in Establishments){
      arr.push(Establishments[i])
    }
    if (arr.length > 0) {
      this.modalCtrl.create(ScheduleFilterPage, { Establishments : arr}).present();
    }else{
      this.presentAlert("", "No exiten locales en esta ciudad.")
    }
    
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['Aceptar']
    });
    alert.present();
}

  segmentChanged(value) {
    this.relationship = value
    this.ciudad = this.ciudad
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

}
