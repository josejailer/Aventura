import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth/auth-service';
 

import { NavController, 
         NavParams, 
         ToastController, 
         LoadingController,
         AlertController,
         Platform } from 'ionic-angular';
 
import { Usuarios } from '../../providers/auth/user';
  


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  user: Usuarios = new Usuarios();
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
  private authService: AuthService,

    public platform: Platform
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  onSubmit() {
    
      let loading = this.loadingCtrl.create();
      loading.present();
      this.authService.resetPassword(this.user.email)
        .then(_=> {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Sent Mail',
            subTitle: 'Check your email for a link to reset your password. If it doesn\'t appear within a few minutes, check your spam folder.',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.doPageLogin();
                }
              },
            ]
          }).present();
        }, (error)=> {
          loading.dismiss();
          this.toastCtrl.create({message: error.message, duration: 300})
            .present();
        });
     
  }

  doPageLogin() {
    this.navCtrl.pop();
  }

  doEmailUs() {
    if(!this.platform.is('cordova')) {
      this.toastCtrl.create({
        message:'You can\'t open Email composer. You can only open this on mobile devices',
        duration:4500}
      ).present()
      return;
    }
    console.log("open email box");
 

  
  }

}
