import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginPage } from '../login/login';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
 
list : AngularFireList<any>;
loader : any
image: any
  datos: Observable<Usuarios[]>;
  user
  item : any
  public movi   : any;
  constructor(public navCtrl: NavController,
    private authService: AuthService,
    public loadingCtrl: LoadingController

  ) { 
    this.usuarioCurren();
  }
 
  usuarioCurren(){
  this.authService.getUsuario().subscribe(res =>{
    this.item = res[0]
  })
}

  handleFiles(file, local){
    this.presentLoading("Actualizando Imagen de perfil...")
    let img = file.srcElement.files[0];
    let myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.authService.uploadImage(this.image.substring(this.image)).then(res => {
        console.log(res);
        this.item.perfilURL = res
        this.hideLoading()
      }).catch(error => {
        console.log(error);
        this.hideLoading()
      })
    }
    myReader.readAsDataURL(img);
  }


  editProfile() {
    console.log(this.item);
    
  }
  
  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }//parent.parent.

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  hideLoading(){
    this.loader.dismiss();
  }

}