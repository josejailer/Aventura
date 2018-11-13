import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service'
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the DetailLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-local',
  templateUrl: 'detail-local.html',
})
export class DetailLocalPage {
  @ViewChild('myNav') nav: NavController;
  local : any
  comment : any
  isFavorite : boolean
  deleteFavorite : any
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    public geolocation: Geolocation
  ) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
    this.local = navParams.get('local')
    this.waypoints = [
      {
        location: { lat: Number(this.local.latitude), lng: Number(this.local.longitude) },
        stopover: true,
      }
    ];
    console.log(this.waypoints);
    
    this.getComment()
    this.getFavorites()
    this.getPosition();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailLocalPage');
  }

  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    let panelEle: HTMLElement = document.getElementById('panel');

    // create LatLng object
    this.myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute(){
    console.log(this.myLatLng);
    console.log("tengo latitud");
    
    this.bounds.extend(this.myLatLng);

    this.waypoints.forEach(waypoint => {
      var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);
    });

    this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      if(status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  

  }

  getFavorites(){
    this.authService.getFavorite(this.local.registerUnique, 'local').then(res =>{
      this.authService.favorite = res
      this.checkFavorite()
    }).catch(err =>{
      console.log(err);
    })
  }

  checkFavorite(){
    this.isFavorite = false

    
    
    for (let i in this.authService.favorite){

      if (this.authService.favorite[i].local === this.local.registerUnique && this.authService.favorite[i].user === this.authService.keyClient){
        this.isFavorite = true
        this.deleteFavorite = this.authService.favorite[i]
      }
    }
  }

  removeFavorite(){
    this.authService.removeFavorite(this.deleteFavorite.registerUnique).then(res =>{
      this.isFavorite = false
      this.getFavorites()
    }).catch(error =>{
      console.log(error);
      
    })
  }

  sendFavorite(){
    let favorite = {
      user : this.authService.keyClient,
      local : this.local.registerUnique,
      nombreLocal : this.local.nombre,
      ciudadLocal : this.local.ciudad,
      descripcion : this.local.descripcion,
      direccion : this.local.direccion,
      latitude : this.local.latitude,
      longitude : this.local.longitude,
      perfilURL : this.local.perfilURL,
      tipo_servicio : this.local.tipo_servicio,
      subcategoria : this.local.subcategoria
    }
    this.authService.pushFavorite(favorite).then(res =>{
      this.authService.getFavorite(this.local.registerUnique, 'local').then(res =>{
        this.authService.favorite = res
        this.checkFavorite()
      }).catch(err =>{
        console.log(err);
      })
    }).catch(error =>{
      console.log(error);
      
    })
  }

  publicComment(){
    this.presentPrompt()
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo Comentario',
      inputs: [
        {
          name: 'comentario',
          placeholder: 'Gran atención'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'send',
          handler: data => {
            this.sendComment(data.comentario)
          }
        }
      ]
    });
    alert.present();
  }

  socialSharFacebook(){
    this.socialSharing.share("Hey el local : "+this.local.nombre+" ya esta disponible en AventureApp, miralo en: ", null, "www.google.com").then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  socialSharWhass(){
    this.socialSharing.shareViaWhatsApp("Hey el local : "+this.local.nombre+" ya esta disponible en AventureApp, miralo en: ", "", "www.google.com").then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  getComment(){
    this.authService.getComment().then(res =>{
      this.comment = res
    }).catch(error =>{
      console.log(error);
    })
  }

  sendComment(comment){
    this.authService.sendComment({
      comentario : comment,
      perfilURL : this.authService.client.photoURL,
      registerUnique : this.local.registerUnique
    }).then(res =>{
      this.getComment()
    }).catch(error =>{
      console.log(error);
    })
  }

}
