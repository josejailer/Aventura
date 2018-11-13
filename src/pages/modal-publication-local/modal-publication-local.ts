import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service'
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ModalPublicationLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-publication-local',
  templateUrl: 'modal-publication-local.html',
})
export class ModalPublicationLocalPage {
  @ViewChild('myNav') nav: NavController;
  photePublication : any = ""
  publication : any
  local : any
  options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 300,
    targetHeight: 300,
    quality: 100,
    allowEdit: false,
    correctOrientation: false,
    saveToPhotoAlbum: true
  }
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService,
    private camera: Camera
  ) {
    this.local = navParams.get('local')
  }

  ionViewDidLoad() {
  }

  publicar(){
    if(this.publication !== undefined && this.publication !== ""){
      console.log((this.photePublication));
      
      let publicacion = {
        textoPublicacion : this.publication,
        photeURL : this.local.perfilURL,
        phote : this.photePublication,
        registerUnique : this.local.registerUnique,
        local : this.local,
        fechaPublicacion : new Date().getTime()
      }
      this.authService.setPublication(publicacion).then(res=>{
      })
    }else{
      this.showAlert("Completa todos los campos antes de publicar...")
    }
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData
      this.authService.uploadImage(base64Image).then(res => {
        this.photePublication = res
        console.log((this.photePublication));
      }).catch(error => {
        console.log(error);
      })
      
      
    }, (err) => {
      console.log(err)
    });
  }

  showAlert(text) {
    const alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}