import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController} from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { EstudianteService } from "../../providers/auth/estudiante.service";
import { EstablecimientosPage } from '../establecimientos/establecimientos';
import { Ciudades } from '../../providers/auth/ciudades';
import { DomSanitizer} from '@angular/platform-browser';
import { AuthService } from '../../providers/auth/auth-service'
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{ name: string, isChecked: boolean }> = [];
  public movies: any;
  public ciudades: Ciudades = new Ciudades();
  itemList: any[];
  public sumaIndustrial: any;
  city
  Establishments : any = []
  @ViewChild('myNav') nav: NavController;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public estudianteService: EstudianteService,
    public authService: AuthService,
    private _sanitizer: DomSanitizer
  ) {
    console.log(navParams.get('Establishments'));
    
    this.Establishments =navParams.get('Establishments')
    console.log(this.Establishments);
  }

  goEstablishments(category) {
    console.log(category);
    let arr : any = []
    for (let i in category){
      if(typeof category[i] === "object"){
        arr.push(category[i])
      }
    }
    console.log(arr);
    
      // this.modalCtrl.create(EstablecimientosPage, { city : this.city, category: category }).present();
      this.modalCtrl.create(EstablecimientosPage, {category : arr}).present();  
  }


  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
