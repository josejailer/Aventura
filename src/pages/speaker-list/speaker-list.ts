import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, PopoverController } from 'ionic-angular';
import "rxjs/add/operator/map";
import { EstudianteService } from '../../providers/auth/estudiante.service';
import { Observable } from 'rxjs/Observable';
import { Targetas } from '../../providers/auth/targetas';
import { GalleryPostPage } from '../gallery-post/gallery-post';
import { DetailPage } from '../detail/detail';
import { PostPopover } from './post-popover';
import { ModalVerMasPage } from '../modal-ver-mas/modal-ver-mas'
// TODO remove

export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean | void;
}

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  //"firebase": "^5.4.2",
  targetas: Targetas = new Targetas();
  datos$: Observable<any[]>;
  estudianteList: any[];
  
  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private estudianteService: EstudianteService
    ) {

    this.datos$ = this.estudianteService
      .getTargetas()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });

    console.log(this.datos$);

  }


  presentModal() {
    let modal = this.modalCtrl.create(GalleryPostPage);
    modal.present();
  }


  editMovie(movie) {
    let params = { movie: movie },
      modal = this.modalCtrl.create(DetailPage, params);


    modal.present();
  }

  presentPostPopover() {
    let popover = this.popoverCtrl.create(PostPopover);
    popover.present();
  }

  verMas(item){
    console.log(item);
    let modal = this.modalCtrl.create(ModalVerMasPage, {local : item});
    modal.present();
  }

}

