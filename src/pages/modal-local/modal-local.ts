import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { CitiesProvider } from '../../providers/cities/cities'
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalPublicationLocalPage } from '../modal-publication-local/modal-publication-local'
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer} from '@angular/platform-browser';
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
/**
 * Generated class for the ModalLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-local',
  templateUrl: 'modal-local.html',
})
export class ModalLocalPage {
  @ViewChild('myNav') nav: NavController;
  local: any
  establecimiento: any
  loader: any
  imgProfile: File
  fileToUpload: File = null;
  image: any
  actionLocal: any
  subCategories: any = []
  regData = { avatar: '', email: '', password: '', fullname: '' };
  imgPreview = 'assets/imgs/blank-avatar.jpg';
  galery: any = []
  galeryLocal: any = []
  countRequest = 0
  laittude: any
  longitude: any
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public cities: CitiesProvider,
    public angularFireAuth: AngularFireAuth,
    public modalCtrl: ModalController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private _sanitizer: DomSanitizer,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.actionLocal = navParams.get('action')
    if (navParams.get('action') === "edit") {
      this.local = navParams.get('local')
      this.establecimiento = navParams.get('establecimiento')
    } else {
      this.local = {
        ciudad: "",
        direccion: "",
        email: "",
        latitude: "",
        longitude: "",
        nit: "",
        nombre: "",
        password: "",
        perfilURL: "https://firebasestorage.googleapis.com/v0/b/adaventure-d4d5e.appspot.com/o/images%2Fcali.png?alt=media&token=d75da7bd-7d42-4373-9a37-43da129b3a75",
        registerUnique: "",
        tipo_servicio: "",
        subcategoria: ""
      }
    }
  }

  ionViewDidLoad() {
  }

  getLocationMap(local) {
    this.nativeGeocoder.forwardGeocode('Colombia, ' + local.ciudad + ', ' + local.direccion, this.options)
      .then((
        coordinates: NativeGeocoderForwardResult[]) => {
        console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude)
        local.latitude = coordinates[0].latitude
        local.longitude = coordinates[0].longitude
        this.setNewLocal(local)
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  getSubcategories(categories) {
    for (let i in this.cities.categorys) {
      if (this.cities.categorys[i].nombre === categories) {
        for (let j in this.cities.categorys[i].subcategorias) {
          this.subCategories.push(this.cities.categorys[i].subcategorias[j].nombre)
        }
      }
    }
  }

  onChange(newVal) {
    this.subCategories = []
    this.getSubcategories(newVal)
  }

  editLocal(local) {
    this.presentLoading("Actualizando registro...")
    this.authService.updateLocal(local).then(res => {
      this.hideLoading()
      this.updateEstablishments()
    }).catch(error => {
      console.log(error);
    })
  }

  addNewLocal(local) {
    this.getLocationMap(local)
    console.log(this.galeryLocal);
  }

  setNewLocal(local){
    local.registerUnique = this.angularFireAuth.auth.currentUser.uid
    local.local = this.galeryLocal
    console.log(local);
    this.presentLoading("Añadiendo registro...")
    this.authService.addLocal(local).then(res => {
      this.hideLoading()
      this.updateEstablishments()
    }).catch(error => {
      console.log(error);
      this.hideLoading()
    })
  }

  handleFiles(file, local) {
    this.presentLoading("Actualizando Imagen de local...")
    let img = file.srcElement.files[0];
    let myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.authService.uploadImage(this.image.substring(this.image)).then(res => {
        local.perfilURL = res
        this.hideLoading()
      }).catch(error => {
        console.log(error);
        this.hideLoading()
      })
    }
    myReader.readAsDataURL(img);
  }

  readThis(inputValue: any): void {
    let imgFormat: any;
    var file: File = inputValue.files[0]; var myReader: FileReader = new FileReader(); var separador = "."; var arregloDeImg = file.name.split(separador);
    if (arregloDeImg[1] === "png") {
      imgFormat = 22
    } else {
      imgFormat = 23
    }
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.authService.uploadImage(this.image.substring(imgFormat, this.image.length)).then(res => {
      }).catch(error => {
        console.log(error);
      })
    }
    myReader.readAsDataURL(file);
  }

  updateEstablishments() {
    this.authService.local = []
    for (let i in this.cities.cities) {
      for (let j in this.cities.categorys) {
        this.getLocal(this.cities.cities[i].nombre, this.cities.categorys[j].nombre)
      }
    }
    this.viewCtrl.dismiss();
  }

  getLocal(city, cate) {
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

  openGalery() {
    this.presentLoading("Subiendo galeria")
    let options = {
      maximumImagesCount: 2
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.uploadImage(base64File, results.length)
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => { });
  }

  uploadImage(base64Image, contRequest) {
    this.authService.uploadImage(base64Image).then(res => {
      this.countRequest = this.countRequest + 1
      this.galeryLocal.push(res)
      if (this.countRequest >= contRequest) {
        this.hideLoading()
      }
    }).catch(error => {
      this.countRequest = this.countRequest + 1
      if (this.countRequest >= contRequest) {
        this.hideLoading()
      }
    })
  }

  newPublications() {
    let modal = this.modalCtrl.create(ModalPublicationLocalPage, { local: this.local });
    modal.present();
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  hideLoading() {
    this.loader.dismiss();
  }

}
