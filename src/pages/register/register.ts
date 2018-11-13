import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { Config } from '../../providers/config';
import { TermsPage } from '../terms/terms';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    usuarios: Usuarios = new Usuarios();
    public isterms = false;


    constructor(
        public navCtrl: NavController,
        public nav: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private authService: AuthService,
        public config: Config,
        public alertCtrl: AlertController
    ) { }


    register() {
        if (this.isterms) {
            if (this.usuarios.email == null || this.usuarios.password == null || this.usuarios.nombre == null) {
                this.presentAlert("", "Por favor complete todos los campos")
            } else if (!this.checkEmail(this.usuarios.email)) {
                this.presentAlert("", "Email incorrecto")
            } else if (this.usuarios.password.length < 7) {
                this.presentAlert("", "Por seguridad su contraseña debe contener al menos 7 caracteres")
            } else {
                if (this.usuarios.perfilURL == null) {
                    this.usuarios.perfilURL = 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';
                }
                this.usuarios.userTipo = "cliente"
                this.createUser()
            }
        } else {
            this.presentAlert("Política de privacidad", "Debes aceptar los terminos de uso")
        }
    }

    createUser() {
        console.log(this.usuarios);
        
        this.authService.createUserWithEmailAndPassword(this.usuarios)
            .then((res: any) => {
                console.log("res", res);
                
                this.popToRoot();
            }).catch((err) => {
                console.log("error: ", err);
                this.presentAlert("", err)
            });
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

    // go to login page
    irLogin() {
        this.navCtrl.setRoot(LoginPage);
    }

    goTerms() {
        this.navCtrl.push(TermsPage, null, this.config.navOptions);
    }

    clickTerm() {
        if (this.isterms) {
            this.goTerms();
        }
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
