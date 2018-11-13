import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Targetas } from './targetas';
 
@Injectable()
export class EstudianteService {
  user: any;
  private datosListRef = this.db.list('/AdventureApp/Publicaciones');
  private ciudadesListRef = this.db.list('/AdventureApp/Ciudades/');
 

  constructor(private db: AngularFireDatabase,
  ) {
  }


  getTargetas() {
    return this.datosListRef;
  }

  getCiudades() {
    console.log(this.ciudadesListRef);
    
    return this.ciudadesListRef;
  }

  getEstablecimientos() {
    return this.ciudadesListRef;
  }



  addItem(item: Targetas) {
    return this.datosListRef.push(item);
  }


}
