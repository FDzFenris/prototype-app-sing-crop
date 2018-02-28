import {Injectable,ViewChild, ElementRef  } from "@angular/core";
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
//import { GoogleMaps,GoogleMap,GoogleMapsEvent} from '@ionic-native/google-maps';


@Injectable()
export class ToastService {
  //public localStorage=[];


  


  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private nativeStorage: NativeStorage,
  
   
  ) {
      // ...
  }

  Success_Toast(msg) {
    
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 1500,
          position: 'bottom',
          cssClass: "toast-success"
        });
      
        toast.onDidDismiss(() => {
          //console.log('Dismissed toast');
        });
      
        toast.present();
      
  }

  Error_Toast(msg) {
    
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      cssClass: "error-success"
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  
}

getGeo(){
    this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    //console.log(resp.coords.latitude);
    //console.log(resp.coords.longitude);
    //console.log(resp);
    this.nativeStorage.setItem('lat',""+resp.coords.latitude);
    this.nativeStorage.setItem('long',""+resp.coords.longitude);
    alert(resp.coords.latitude+"/"+resp.coords.longitude);
    //console.log(`lat:${this.nativeStorage.getItem('lat')}`) ;
    }).catch((error) => {
    //alert('Error getting location'+JSON.stringify(error));
    });
}



ALear_Confirm(msg) {
  let alert = this.alertCtrl.create({
    title: 'CONFIRM BOX',
    message: msg,
    buttons: [
      {
        text: 'ยกเลิก',
     
        handler: () => {
          
          console.log('Cancel clicked');
          return false;
        }
      },
      {
        text: 'ยืนยัน',
        handler: () => {
          console.log('Buy clicked');
          return true;
        }
      }
    ]
  });
  alert.present();
}


  


}

