
import { Component } from "@angular/core";
import { IonicPage, NavController, AlertController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HomePage } from "../home/home";
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { Events } from 'ionic-angular';
import { RegistroLugaresPage } from "../registro-lugares/registro-lugares";
import { PrincipalPage } from "../principal/principal";
/**
 * Generated class for the LoginLugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-lugares',
  templateUrl: 'login-lugares.html',
})
export class LoginLugaresPage {
  usuario: Usuarios = new Usuarios();


  showUser: boolean = false;
  public items: any;
  errorMessage: string = '';


  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
  }

  // go to register page
  irRegistroLugares() {
    this.nav.setRoot(RegistroLugaresPage);
  }

  loginLugares() {
    if (this.usuario.email == null || this.usuario.email == "" || this.usuario.password == null || this.usuario.password == "") {
      this.presentAlert("", "Por favor complete todos los campos")
    } else {
      if (!this.checkEmail(this.usuario.email)) {
        this.presentAlert("", "Email incorrecto")
      } else {
        this.authService.signInWithEmailAndPassword(this.usuario)
          .then((res: any) => {
            this.popToRoot();
          }).catch((err) => {
            this.presentAlert("Upss...", "Ocurrio un error por favor vuelve a intentarlo")
          });
      }
    }
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter your email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Reseting your password...'
            });
            loading.present();
            this.authService.resetPassword(data.email)
              .then(() => {
                loading.dismiss();
                let toast = this.toastCtrl.create({
                  message: 'Email was sended successfully',
                  duration: 3000,
                  position: 'top',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
              })
              .catch(err => {
                loading.dismiss();
                alert(err.message);
              });

          }
        }
      ]
    });
    forgot.present();
  }

  resetPassword() {
    this.navCtrl.push(PrincipalPage);
  }

  popToRoot() {
    this.navCtrl.setPages([
      { page: HomePage }
    ]);
  }

  checkEmail(email) {
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)) {
      return false;
    } else {
      return true;
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