import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuarios } from './user';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private ciudadesListRef;
  Establishments : any
  local : any = []
  client : any
  keyClient : any
  user : any
  favorite : any = []
  commentAdmin : any = []
  constructor(private angularFireAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private facebook: Facebook,
    public afiredatabase: AngularFireDatabase,
  ) { 
    this.user = firebase.auth().currentUser;
  }
  us: any;

  createUser(user: Usuarios) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  getUsuario(): Observable<any> {
    return new Observable(observer => {
      firebase.database().ref('/AdventureApp/Usuarios/').orderByKey()
        .equalTo(this.angularFireAuth.auth.currentUser.uid).once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            user.push({
              displayName: item.val().displayName,
              perfilURL: item.val().perfilURL,
              email: item.val().email,
              id: this.angularFireAuth.auth.currentUser.uid,

            });
          });
          observer.next(user);
          observer.complete();
        },
          (error) => {
            observer.error(error)
          });

    });
  }

  createUserWithEmailAndPassword(usuarios: Usuarios) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuarios.email, usuarios.password).then(value => {
        this.us = value.user;
        this.us.updateProfile(
          { displayName: usuarios.nombre, photoURL: usuarios.perfilURL }
        );
        this.angularFireAuth.auth.updateCurrentUser(this.us);
        this.afiredatabase.list('/AdventureApp/Usuarios/').update(this.angularFireAuth.auth.currentUser.uid, {
          displayName: usuarios.nombre, email: usuarios.email, perfilURL: usuarios.perfilURL, userTipo : usuarios.userTipo
        });
        resolve(true);
      }).catch((err) => {
        console.log(err);

        reject(err);
      });
    })
    return promise;
  }

  createUserWithEmailAndPasswordLugares(usuarios: Usuarios, latitude, longitude) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuarios.email, usuarios.password).then(value => {
        this.us = value.user;
        console.log("this.pudateProfileDispleayUsuarios, ", usuarios);
        this.us.updateProfile({ displayName: usuarios.nombre, photoURL: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' });
        console.log("this.us.updateProfile ", this.us);
        this.angularFireAuth.auth.updateCurrentUser(this.us);
        this.afiredatabase.list('/AdventureApp/Usuarios/').update(this.angularFireAuth.auth.currentUser.uid, {
          nit: usuarios.nit,
          displayName: usuarios.nombre,
          tipo_Servicio: usuarios.tipo_servicio,
          dirección: usuarios.direccion,
          ciudad: usuarios.ciudad,
          email: usuarios.email,
          perfilURL: usuarios.perfilURL,
          userTipo : usuarios.userTipo
        });
        console.log("this.us updateCurretUser ", this.us);
        this.angularFireAuth.auth.updateCurrentUser(this.us);
        console.log("lo que va establecimiento: ", usuarios);
        usuarios.latitude = latitude;
        usuarios.longitude = longitude
        usuarios.nombre = usuarios.nombreLocal
        this.ciudadesListRef = firebase.database().ref('/AdventureApp/Ciudades').child(usuarios.ciudad).child('Establecimientos')
          .child(usuarios.tipo_servicio).push(usuarios);
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    })
    return promise;
  }

  

  signIn(usuarios: Usuarios) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuarios.email, usuarios.password);
  }

  signInWithEmailAndPassword(usuarios: Usuarios) {
    var promise = new Promise((resolve, reject) => {
      console.log(usuarios);
      this.angularFireAuth.auth.signInWithEmailAndPassword(usuarios.email, usuarios.password).then(res => {
        console.log(res);
        resolve(res)
      }).catch((error) => {
        reject(error);
      })
    })
    return promise;
  }


  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '648450091349-k1ies0a10h4atdodmf1vom34sblj6n9f.apps.googleusercontent.com',
        'offline': true,
      }).then(res => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(res => {
        }).catch(error => {
          return error
        })
      })
    } catch (error) {
      return error
    }
  }

  signInWithFacebook() {
    return this.facebook.login(["email", "public_profile", "user_friends"]).then(res => {
      return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
    })
      .catch(error => {
        return error
      })
  }

  signOut() //: firebase.Promise<any>
  {
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        var provider = this.angularFireAuth.auth.currentUser.providerData[i];
        if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) { // Se for o gooogle
          return this.signOutFirebase();
          //  });
        } else if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) { // Se for facebook
          return this.facebook.logout()
            .then(() => {
              return this.signOutFirebase();
            })
        }
      }
    }

    return this.signOutFirebase();
  }

  private signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  getEstablishments() {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Ciudades')
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            user.push(item.val())
          });
          resolve(user)
        },
          (error) => {
            reject(error)
          });
    });
    return promise
  }

  getLocal(city, tipo) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Ciudades').child(city).child('/Establecimientos').child('/' + tipo)
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            if (typeof item.val() === "object") {
              let response = item.val()
              response.registerUnique = item.key
              user.push(response)
            }
          });
          resolve(user)
        },
          (error) => {
            reject(error)
          });
    });
    return promise
  }

  getLocalId(item) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Ciudades').child(item.ciudadLocal).child('/Establecimientos').child('/' + item.tipo_servicio)
      .child(item.local)
        .once('value', (items: any) => {
          resolve(items.val())
        },
          (error) => {
            reject(error)
          });
    });
    return promise
  }

  getLocalAll(city, cate){
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Ciudades').child(city).child('/Establecimientos')
      .child(cate).orderByChild('registerUnique').equalTo(this.angularFireAuth.auth.currentUser.uid)
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            // console.log(item); 
            // console.log(item.key);
            // console.log(item.val());
            // console.log(typeof item.val());
            if (typeof item.val() === "object") {
              // item.val().push({registerUnique : "hola"})
              let response = item.val()
              response.registerUnique = item.key
              user.push(response)
            }
          });
          resolve(user)
        },
          (error) => {
            reject(error)
          });

    });
    return promise
  }

  getCategories(category){
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Categorias').child(category).child('/subcategorias')
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            // console.log(item.key);
            // console.log(typeof item.val());
            if (typeof item.val() === "object") {
              // item.val().push({registerUnique : "hola"})
              let response = item.val()
              user.push(response)
            }
          });
          resolve(user)
        },
          (error) => {
            reject(error)
          });

    });
    return promise
  }

  getComment(){
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Comentarios')
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            console.log(item);
            
            // console.log(item.key);
            console.log( item.val());
            if (typeof item.val() === "object") {
              // item.val().push({registerUnique : "hola"})
              let response = item.val()
              user.push(response)
            }
          });
          console.log(user);
          
          resolve(user)
        },
          (error) => {
            reject(error)
          });

    });
    return promise
  }

  sendComment(comment){
    console.log(comment);    
    var promise = new Promise((resolve, reject) => {
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Comentarios').push(comment).then(res =>{
        resolve(res)
      })
    });
    return promise
  }

  updateLocal(local) {
    var promise = new Promise((resolve, reject) => {
      this.afiredatabase.list('/AdventureApp/Ciudades/' + local.ciudad + '/Establecimientos/' + local.tipo_servicio + '/').update(local.registerUnique, local
      ).then(res => {
        resolve('200');
      })
        .catch(error => {
          reject(error);
        });
    });
    return promise
  }

  // setGalleryLocal(local, phote) {
  //   var promise = new Promise((resolve, reject) => {
  //     this.afiredatabase.list('/AdventureApp/Ciudades/' + local.ciudad + '/Establecimientos/' + local.tipo_servicio + '/')
  //     .update(local.registerUnique, local
  //     ).then(res => {
  //       resolve('200');
  //     })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  //   return promise
  // }

  addLocal(local){
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Ciudades').child(local.ciudad).child('Establecimientos')
      .child(local.tipo_servicio).push(local).then(res =>{
        // local.registerUnique = res.key
        // this.updateLocal(local)
        resolve("200")
      })
    })
    return promise
  }

  setPublication (publicacion) {
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Publicaciones')
      .push(publicacion).then(res =>{
        console.log(res);
        
        // local.registerUnique = res.key
        // this.updateLocal(local)
        resolve("200")
      })
    })
    return promise
  }

  pushFavorite(favorite){
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Favoritos')
      .push(favorite).then(res =>{
        console.log(res);
        resolve("200")
      })
    })
    return promise
  }

  getFavorite(key, filter){
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Favoritos')
      .orderByChild(filter).equalTo(key)
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
              let response = item.val()
              response.registerUnique = item.key
              user.push(response)
          });
          resolve(user)
        },
          (error) => {
            reject(error)
          });

    });
    return promise
  }

  removeFavorite(key){
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Favoritos')
      .child(key)
      .remove()
      .then(res =>{
        console.log(res);
        resolve("200")
      })
    })
    return promise
  }

  publicComment(comentario, urlImg){
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/ComentariosAdmin')
      .push({comentario : comentario, img : urlImg}).then(res =>{
        resolve("200")
      })
    })
    return promise
  }

  getCommentAdmin(){
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/ComentariosAdmin')
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
              let response = item.val()
              user.push(response)
          });
          console.log(user);
          
          resolve(user)
        },
          (error) => {
            reject(error)
          });
    });
    return promise
  }

  pushCategory(category){
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Categorias')
      .child(category)
      .set({nombre : category}).then(res =>{
        resolve("200")
      })
    })
    return promise
  }

  pushNewSubCategory(categoria, subcategoria){
    var promise = new Promise((resolve, reject) =>{
      this.ciudadesListRef = firebase.database().ref('/AdventureApp/Categorias')
      .child(categoria).child('subcategorias').child(subcategoria)
      .set({nombre : subcategoria}).then(res =>{
        resolve("200")
      })
    })
    return promise
  }


  uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'movie-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;
      return new Promise((resolve, reject) =>{
         storageRef       = firebase.storage().ref('images/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');
         parseUpload.on('state_changed', (_snapshot) =>{
         },
         (_err) =>{
            reject(_err);
         },
         (success) =>{
           parseUpload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
         });
      });
   }

}
