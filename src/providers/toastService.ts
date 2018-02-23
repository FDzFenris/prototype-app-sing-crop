import {Injectable} from "@angular/core";
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {
  constructor(private toastCtrl: ToastController) {
      // ...
  }

  Success_Toast() {
    
        let toast = this.toastCtrl.create({
          message: 'อัพเดทข้อมูลสำเร็จ',
          duration: 1500,
          position: 'bottom',
          cssClass: "toast-success"
        });
      
        toast.onDidDismiss(() => {
          //console.log('Dismissed toast');
        });
      
        toast.present();
      
  }

  Error_Toast() {
    
    let toast = this.toastCtrl.create({
      message: 'อัพเดทข้อมูลไม่สำเร็จ',
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