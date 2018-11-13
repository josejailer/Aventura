import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { PostPopover } from '../pages/speaker-list/post-popover';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EstablecimientosPage } from '../pages/establecimientos/establecimientos';
import { DetailLocalPage } from '../pages/detail-local/detail-local';
import {HttpModule} from '@angular/http';

//Providers
import { AuthService } from '../providers/auth/auth-service';
import{EstudianteService} from '../providers/auth/estudiante.service'
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { ImagePicker } from '@ionic-native/image-picker';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Base64 } from '@ionic-native/base64';
import { Geolocation } from '@ionic-native/geolocation';
// import services 

// Import library firbease
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import pages
// end import pages
import { TermsPage } from '../pages/terms/terms';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {RegistroLugaresPage} from '../pages/registro-lugares/registro-lugares';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { MapPage } from '../pages/map/map';
import {AdministradorPage} from '../pages/administrador/administrador'
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { UsuarioPage } from '../pages/usuario/usuario';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { FavoritesPage } from '../pages/favorites/favorites'
import { SlidersPage} from '../pages/sliders/sliders';
import { Camera } from '@ionic-native/camera';
import { PrincipalPage } from '../pages/principal/principal';
import{LoginLugaresPage} from '../pages/login-lugares/login-lugares'
import { GalleryPostPage } from '../pages/gallery-post/gallery-post';
import{ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import { DetailPage } from '../pages/detail/detail';
import { ModalVerMasPage } from '../pages/modal-ver-mas/modal-ver-mas'
import { ModalPublicationLocalPage } from '../pages/modal-publication-local/modal-publication-local';
import { Config } from '../providers/config';
import { GalleryPosterComponent } from './gallery-poster/gallery-poster';
import { CitiesProvider } from '../providers/cities/cities';
const firebaseConfig = {
 /* apiKey: "AIzaSyCa4Rg3iAaSYp1XnqfwmZDA95Kcsy1c5_g",
  authDomain: "adaventure-d4d5e.firebaseapp.com",
  databaseURL: "https://adaventure-d4d5e.firebaseio.com",
  projectId: "adaventure-d4d5e",
  storageBucket: "adaventure-d4d5e.appspot.com",
  messagingSenderId: "648450091349"
*/

  apiKey: "AIzaSyCHthOzqJFKTRH0Q0_TC06dSUsYTf7pHHY",
    authDomain: "prueba-bda12.firebaseapp.com",
    databaseURL: "https://prueba-bda12.firebaseio.com",
    projectId: "prueba-bda12",
    storageBucket: "prueba-bda12.appspot.com",
    messagingSenderId: "1073113290610"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    MapPage,
    AdministradorPage,
    PopoverPage,
    SlidersPage,
    PrincipalPage,
    SchedulePage,
    ScheduleFilterPage,
    SpeakerListPage,
    FavoritesPage,
    RegisterPage,
    UsuarioPage,
    LoginLugaresPage,
    RegistroLugaresPage,
    ForgotPasswordPage,
    GalleryPostPage,
    DetailPage,
    ModalVerMasPage,
    ModalPublicationLocalPage,
    PostPopover,
    EstablecimientosPage,
    DetailLocalPage,
    TermsPage,
    GalleryPosterComponent
     
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    MapPage,
    AdministradorPage,
    SlidersPage,
    PrincipalPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SpeakerListPage,
    FavoritesPage,
    RegisterPage,
    UsuarioPage,
    LoginLugaresPage,
    ForgotPasswordPage,
    RegistroLugaresPage,
    GalleryPostPage,
    DetailPage,
    ModalVerMasPage,
    ModalPublicationLocalPage,
    TermsPage,
    PostPopover,
    EstablecimientosPage,
    DetailLocalPage,
    GalleryPosterComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AuthService,
    NativeGeocoder,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase,
    EstudianteService,
    GooglePlus,
    Facebook,
    Config,
    ImagePicker, 
    Base64,
    CitiesProvider,
    Geolocation
  ]
})
export class AppModule {}
