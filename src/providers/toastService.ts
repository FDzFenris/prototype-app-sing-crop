import {Injectable} from "@angular/core";
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {
  constructor(private toastCtrl: ToastController) {
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


  
}