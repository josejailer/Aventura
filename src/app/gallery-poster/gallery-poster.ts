import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';

import { GalleryPostPage } from '../../pages/gallery-post/gallery-post';
import { Usuarios } from '../../providers/auth/user';
//import { UserProvider, UserModel } from '../../providers/user';

@Component({
  selector: 'gallery-poster',
  templateUrl: 'gallery-poster.html'
})
export class GalleryPosterComponent {
  public user   : any;
 
   usuario: Usuarios = new Usuarios();
  constructor(
    public modalCtrl : ModalController,
    private authService: AuthService

  ){
    this.usuarioCurren();

  }

  onPagePost() {
    let modal = this.modalCtrl.create(GalleryPostPage);
    modal.present();
  }
  usuarioCurren(){
    this.user= this.authService.getUsuario();
    }

    
}
