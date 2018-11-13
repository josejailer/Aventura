import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import {EstudianteService} from "../../providers/auth/estudiante.service";
import { Targetas } from '../../providers/auth/targetas';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
   targetas: Targetas= new  Targetas();
     public movies   : any;
     
     datos: Observable<any>;
   
  constructor(public navCtrl: NavController,
      public params         : NavParams,

    public estudianteService: EstudianteService) {
  
    this.movies = firebase.database().ref('/AdventureApp/Targetas');
 
         let movie 		    = params.get('movie')
             ;
         this.targetas.id_targeta	    = movie.id_targeta;
         this.targetas.fecha	= movie.fecha;
         this.targetas.descripcion   	= movie.descripcion;
         this.targetas.nombreUser   	= movie.nombreUser;
         this.targetas.perfilURL    	= movie.perfilURL;
         this.targetas.imagenUrl       = movie.imagenUrl;
         this.targetas.id_user        = movie.id_user;
 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  
   

}
