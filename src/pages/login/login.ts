import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { Events } from 'ionic-angular';
import { PrincipalPage } from "../principal/principal";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Usuarios = new Usuarios();
  showUser: boolean = false;
  public items: any;
  errorMessage: string = '';

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public events: Events,
  ) {
  }

  // go to register page
  irRegister() {
    this.nav.setRoot(RegisterPage);
  }

  login() {
    if (this.user.email === "" || this.user.email === undefined || this.user.password === "" || this.user.password === undefined) {
      this.presentAlert("", "Por favor complete todos los campos")
    } else {
      this.authService.signInWithEmailAndPassword(this.user).then(res => {
        console.log(res);
        this.popToRoot();
      }).catch((error) => {
        this.presentAlert("Upss...", "Ocurrio un error vuelve a intentarlo")
      });
    }
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(res =>{
      })
      .catch((error) => {
        this.presentAlert("Upss...", "Ocurrio un error vuelve a intentarlo")
      });
  }

  LoginnWithGoogle() {
    this.authService.nativeGoogleLogin()
      .then(res => {
      })
      .catch((error) => {
        this.presentAlert("Upss...", "Ocurrio un error vuelve a intentarlo")
      });
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
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
    //this.authService.resetPassword()
    /*  let forgot = this.forgotCtrl.create({
        title: '¿Recuperar Contraceña?',
        message: "Ingrese su Email para enviarle un enlace para restablecer su contraseña.",
      inputs: [
          {
            name: 'email',
            placeholder: 'Email',
            type: 'email'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancelar clicked');
            }
          },
          {
            text: 'Enviar',
            handler: data => {
              console.log('Enviar clicked');
              let toast = this.toastCtrl.create({
                message: 'Email Enviado Exitosamente',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            }
          }
        ]
      });
      forgot.present();*/
  }

  popToRoot() {
    this.navCtrl.setPages([
      { page: HomePage }
    ]);
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
