import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the ModalVerMasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-ver-mas',
  templateUrl: 'modal-ver-mas.html',
})
export class ModalVerMasPage {
  @ViewChild('myNav') nav: NavController;
  local: any
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing,
    public geolocation: Geolocation) {
    this.local = navParams.get('local')
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
    this.waypoints = [
      {
        location: { lat: this.local.latitude, lng: this.local.latitude },
        stopover: true,
      }
    ];
  }

  ionViewDidLoad() {
    console.log(this.local);
    this.getPosition();
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

  socialSharFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint("Hey hay una gran oferta del local"+this.local.local.nombre+" miralo en: ", "", "Hey hay una gran oferta del local"+this.local.local.nombre+" miralo en: "+"www.google.com").then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  socialSharWhass(){
    this.socialSharing.shareViaWhatsApp("Hey hay una gran oferta del local: "+this.local.local.nombre+" miralo en: ", "", "www.google.com").then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
