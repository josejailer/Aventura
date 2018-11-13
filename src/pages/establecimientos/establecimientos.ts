import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { EstudianteService } from "../../providers/auth/estudiante.service";
import { Ciudades } from '../../providers/auth/ciudades';
import { AuthService } from '../../providers/auth/auth-service'
import { DetailLocalPage } from '../detail-local/detail-local';

@IonicPage()
@Component({
  selector: 'page-establecimientos',
  templateUrl: 'establecimientos.html',
})
export class EstablecimientosPage {
  public ciudades: Ciudades = new Ciudades();
  local : any = []
  subcategory : any 
  subcategoria : any
  categorias : any = []
  @ViewChild('myNav') nav: NavController;
  constructor(
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public estudianteService: EstudianteService,
    public authService: AuthService,
    public navParams: NavParams
  ) {
    // this.getLocals(navParams.get('city'), navParams.get('category'))
    this.categorias = navParams.get('category')
    console.log(this.categorias);
    
  }

  getLocals(city, category){

    // this.authService.getLocal(city, category).then(res =>{
    //   this.local = res
    //   console.log(this.local);
    //   this.getCategories(category)
    // }).catch(error =>{
    //   console.log(error);
    // })
  }

  getCategories(category){
    this.authService.getCategories(category).then(res =>{
      this.subcategory = res
    }).catch(error =>{
      console.log(error);
    })
  }

  openModalLocal(local){
    this.modalCtrl.create(DetailLocalPage, {local: local}).present();
  }
  

}
