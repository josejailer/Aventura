import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CitiesProvider {
  cities : any
  categorys : any
  constructor() {
    console.log('Hello CitiesProvider Provider');
  }

  getCities_1() {
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

  getCities() {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Ciudades_1')
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

  getCategorys() {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/AdventureApp/Categorias')
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

}
