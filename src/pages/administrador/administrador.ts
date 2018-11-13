import { Component } from '@angular/core';
import { NavController, LoadingController,  ModalController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { CitiesProvider } from '../../providers/cities/cities'

/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {
  categoryPush : any
  categoriaNombre : any
  subCategoriaNombre : any
  loader: any
  image: any
  perfilURL : any
  comment : any
  sendComment : boolean
  constructor(public platform: Platform,
    private authService: AuthService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public cities: CitiesProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministradorPage');
    console.log(this.cities.cities);
    console.log(this.cities.categorys);
    
    
  }

  newCat(){
    this.showPrompt("Nombre", "Asigna un nombre a la Categoría", 'categoria')
  }

  newSubCat(){
    this.showPrompt("Nombre", "Asigna un nombre a la Subcategoría", 'subcategoria')
  }

  createSubcategory() {
    this.authService.pushNewSubCategory(this.categoryPush, this.subCategoriaNombre).then(res =>{
      console.log(res);
      this.getCategorys()
    })
  }

  getCategorys(){
    this.cities.getCategorys().then(res =>{
      this.cities.categorys = res
    }).catch(error =>{
      error
    })
  }

  createCategory(){
    this.authService.pushCategory(this.categoriaNombre).then(res =>{
      this.getCategorys()
    }).catch(err =>{
      console.log(err);
      
    })
  }

  addComent(){
    this.CommentAdmin("Comentario", "Escribe tu comentario y estara disponible para todos los usuarios")
  }

  showRadio(title) {
    let alert = this.alertCtrl.create();
    alert.setTitle(title);
    for (let i in this.cities.categorys){
      alert.addInput({
        type: 'radio',
        label: this.cities.categorys[i].nombre,
        value: this.cities.categorys[i].nombre,
        checked: false
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        if (data !== undefined) {
          this.categoryPush = data
          this.createSubcategory()
        }
        
      }
    });
    alert.present();
  }

  showPrompt(title, message, tipo) {
    const prompt = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
          text: 'Save',
          handler: data => {
            if (data.title !== "" && tipo === 'subcategoria') {
              this.subCategoriaNombre = data.title
              this.showRadio("Se asigna a:")
            }else if(data.title !== "" && tipo === 'categoria'){
              this.categoriaNombre = data.title
              this.createCategory()
            }
          }
        }
      ]
    });
    prompt.present();
  }

  CommentAdmin(title, message, ) {
    const prompt = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [
        {
          name: 'Comentario',
          placeholder: 'Comentario'
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
          text: 'Save',
          handler: data => {
            if (data.title !== "") {
              this.comment = data.Comentario
              if(this.perfilURL){
                this.sendComment = true
              }
            }
          }
        }
      ]
    });
    prompt.present();
  }

  publicComent(){
      this.authService.publicComment(this.comment, this.perfilURL).then(res =>{
        console.log(res);
        this.sendComment = false
        this.getCommentAdmin()
      }).catch(err =>{
        console.log(err);
      })
  }
  
  getCommentAdmin(){

  }

handleFiles(file) {
    this.presentLoading("Actualizando Imagen de local...")
    let img = file.srcElement.files[0];
    let myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.authService.uploadImage(this.image.substring(this.image)).then(res => {
        this.perfilURL = res
        if(this.comment){
          this.sendComment = true
        }
        this.hideLoading()
      }).catch(error => {
        console.log(error);
        this.hideLoading()
      })
    }
    myReader.readAsDataURL(img);
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
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
