import {Injectable} from "@angular/core";
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ToastService {
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
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