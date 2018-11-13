import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginLugaresPage } from "../login-lugares/login-lugares";
import { Config } from '../../providers/config';
import { TermsPage } from '../terms/terms';
import { Observable } from 'rxjs/Observable';
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { CitiesProvider } from '../../providers/cities/cities'
/**
 * Generated class for the RegistroLugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import * as firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-registro-lugares',
    templateUrl: 'registro-lugares.html',
})
export class RegistroLugaresPage {
    usuarios: Usuarios = new Usuarios();
    public isterms = false;
    categorias$: Observable<any[]>;
    ciudades$: Observable<any[]>;
    mensaje: string;
    subCategories: any = []
    options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
    };
    constructor(public navCtrl: NavController, public nav: NavController,
        public loadingCtrl: LoadingController, public toastCtrl: ToastController,
        private authService: AuthService,
        public config: Config,
        private nativeGeocoder: NativeGeocoder,
        public cities: CitiesProvider,
        private alertCtrl: AlertController
    ) {
        this.ciudades$ = this.getCiudades();
        /* this.datos$= this.estudianteService
        .getCategorias()
        .snapshotChanges()
        .map(changes =>{
            return changes.map(c =>({
              key:c.payload.key,
              ...c.payload.val(),
            }));
            }); 
    */
        this.categorias$ = this.getCategorias();

    }

    getLocationMap() {
        this.nativeGeocoder.forwardGeocode('Colombia, ' + this.usuarios.ciudad + ', ' + this.usuarios.direccion, this.options)
            .then((
                coordinates: NativeGeocoderForwardResult[]) => {
                console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude)
                this.registerLugares(coordinates[0].latitude, coordinates[0].longitude)
            })
            .catch((error: any) => {
                console.log(error)
                this.presentAlert("", "La dirección ingresado no es correcta por favor verificala")
            });
    }





    getCategorias(): Observable<any> {
        return new Observable(observer => {
            firebase.database().ref('/AdventureApp/Categorias/').once('value', (items: any) => {
                let user: any = [];
                items.forEach((item) => {
                    user.push({
                        nombre: item.val().nombre,
                    });
                });
                observer.next(user);
                observer.complete();
            },
                (error) => {
                    console.log("Observer error: ", error);
                    console.dir(error);
                    observer.error(error)
                });
        });
    }

    getCiudades(): Observable<any> {
        console.log("get cities");
        return new Observable(observer => {
            firebase.database().ref('/AdventureApp/Ciudades_1/').once('value', (items: any) => {
                let user: any = [];
                items.forEach((item) => {
                    user.push({
                        nombre: item.val().nombre,
                    });
                });
                observer.next(user);
                observer.complete();
            },
                (error) => {
                    console.log("Observer error: ", error);
                    console.dir(error);
                    observer.error(error)
                });
        });
    }


    checkUserMarket() {
        if (this.isterms) {
        
            if (this.usuarios.nit == null || this.usuarios.nombre == null || this.usuarios.tipo_servicio == null
                || this.usuarios.direccion == null || this.usuarios.email == null || this.usuarios.password == null || this.usuarios.password == null || this.usuarios.nombreLocal == null
            ) {
                this.presentAlert("", "Por favor complete todos los campos")
            } else if (this.usuarios.password.length < 7) {
                this.presentAlert("", "La contraseña debe contener al menos 7 caracteres")
            } else {
                if (this.usuarios.perfilURL == null) {
                    this.usuarios.perfilURL = 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';
                }
                this.usuarios.userTipo = "local"
                this.getLocationMap();
                // this.registerLugares()
            }
        } else {
            this.presentAlert("", "Debes aceptar los terminos de uso")
        }
    }


    registerLugares(latitude, longitude) {
        this.authService.createUserWithEmailAndPasswordLugares(this.usuarios, latitude, longitude)
        //    .then(r => this.popToRoot()).catch(this.handleError);
        .then((res: any) => {
            console.log(res);
            
            this.popToRoot();
        }).catch((err) => {
            console.log(err);
            
            this.handleError(err)
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
        console.log(this.cities.categorys);
        
      }
      
      onChange(newVal) {
        this.subCategories = []
        this.getSubcategories(newVal)
      }

    popToRoot() {
        let loader = this.loadingCtrl.create({
            duration: 1000,
            content: 'Por Favor Espere...'
        });
        loader.present();
        this.navCtrl.setPages([
            { page: HomePage }
        ]);
    }

    handleError(err) {
        var toast = this.toastCtrl.create({
            duration: 3000,
            message: err,

        });
        toast.present();
    }
    // go to login page
    irLoginLugares() {
        this.navCtrl.setRoot(LoginLugaresPage);
    }

    goTerms() {
        this.navCtrl.push(TermsPage, null, this.config.navOptions);
    }
    clickTerm() {
        if (this.isterms) {
            this.goTerms();
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
}
