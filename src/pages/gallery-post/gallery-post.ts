import { Component } from '@angular/core';
import { 
  ViewController, 
  NavParams, 
  ActionSheetController, 
  Platform,
  LoadingController, 
  ToastController } from 'ionic-angular';
 
import { NavController  } from 'ionic-angular';
 import { AuthService } from '../../providers/auth/auth-service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuarios } from '../../providers/auth/user';
import {SpeakerListPage} from '../speaker-list/speaker-list' 
import { EstudianteService } from '../../providers/auth/estudiante.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Targetas } from '../../providers/auth/targetas';

@Component({
  selector: 'page-gallery-post',
  templateUrl: 'gallery-post.html'
})
export class GalleryPostPage {
  /*
   targetas: Targetas= new Targetas();
   usuarios: Usuarios= new Usuarios();
   public datos   : any;
   //date:DateTimeData;
   contactName: string;
  contactKey: string;
  imgPath: string;
  fileToUpload: any;
     //datos$: Observable<Targetas[]>;toLocaleString  toLocaleDateString
     public filmImage  	   : any;
     date: string = (new Date().toDateString());
     private base64Image : string;

   usuario:Observable<any>;
  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public viewCtrl        : ViewController, 
    public navParams       : NavParams,
    public actionSheetCtrl : ActionSheetController,
    public loadingCtrl     : LoadingController,
    public toastCtrl       : ToastController,
    public platform        : Platform,    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
     private imagePicker: ImagePicker,
     private camera: Camera,
    private estudianteService: EstudianteService
  ) {
   this.usuarioActivo();
  }
 
  usuarioActivo(){
    this.datos= this.authService.getUsuario();
    }
  
    addTargetas() {
      this.targetas.nombreUser=this.angularFireAuth.auth.currentUser.displayName;
      this.targetas.fecha=this.date;
      this.targetas.id_targeta=Date.now();
      this.targetas.id_user = this.angularFireAuth.auth.currentUser.uid;
       this.targetas.perfilURL=this.angularFireAuth.auth.currentUser.photoURL;
     
      this.estudianteService.addItem(this.targetas).then(ref => {
       // this.toast.show(`${item.name} added!`);
      // this.navCtrl.setRoot(SpeakerListPage);
      this.dismiss();
      });
    } 
    dismiss() { 
      this.viewCtrl.dismiss();
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
*/
 /* selectImage()
  {
     this._IMG.selectImage()
     .then((data) =>
     {
        this.filmImage = data;
     });
  }


  escolherFoto() {
    this.imagePicker.hasReadPermission()
      .then(hasPermission => {
        if (hasPermission) {
          this.pegarImagem();
        } else {
          this.solicitarPermissao();
        }
      }).catch(error => {
        console.error('Erro ao verificar permissão', error);
      });
  }
  solicitarPermissao() {
    this.imagePicker.requestReadPermission()
      .then(hasPermission => {
        if (hasPermission) {
          this.pegarImagem();
        } else {
          console.error('Permissão negada');
        }
      }).catch(error => {
        console.error('Erro ao solicitar permissão', error);
      });
  }
  pegarImagem() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1, //Apenas uma imagem
      outputType: 1 //BASE 64
    })
      .then(results => {
        if (results.length > 0) {
          this.imgPath = 'data:image/png;base64,' + results[0];
          this.fileToUpload = results[0];
        } else {
          this.imgPath = '';
          this.fileToUpload = null;
        }
      })
      .catch(error => {
        console.error('Erro ao recuperar a imagem', error);
      });
  }

  doCapture() {
    if (this.platform.is('cordova')) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Take a photo from...',
        buttons: [
          {
            text : 'Camera',
            icon :'camera',
            handler : ()=> {
             // this.photoFromCamera().then(imgData => this.gallery.photo = imgData);
            }
          },
          {
            text : 'Library',
            icon :'images',
            handler : ()=> {
            //  this.photoFromLibrary().then(imgData => this.gallery.photo = imgData);
            }
          },{
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    }
  }

  photoFromCamera() {
  //  return Camera.getPicture({sourceType: Camera.PictureSourceType.CAMERA});
  }

  photoFromLibrary() {
   // return Camera.getPicture({sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
  }
  
  doCancel() {
    this.viewCtrl.dismiss();
  }

  
handleError(err){
  var toast = this.toastCtrl.create({
      duration: 3000,
      message: err,
  });
  toast.present();
  this.navCtrl.setRoot(SpeakerListPage);
}
  */
}