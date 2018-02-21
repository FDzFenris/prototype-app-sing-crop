import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user_all= [];
  public myInput;
  
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private barcodeScanner: BarcodeScanner,    
    public fdb : AngularFireDatabase,
    
  )

  {   
    this.fdb.list('/admin_user/').valueChanges().subscribe(_data=>{

      this.user_all = _data;
      console.log( this.fdb.list('/admin_user/'));
    });
 
  }




  

  add_firebase(data: NgForm){
    this.fdb.list("/admin_user/").push(data.value);
  }
    
  delete_firebase (i){
    this.fdb.list("/admin_user/").remove(this.user_all[i].$key);
  }


   public scan() {
     
      this.barcodeScanner.scan().then((barcodeData) => {        

      console.log("scanner")
        alert("type"+barcodeData.format+ " data "+barcodeData.text);
      
      }, (err) => {
        console.log('ไม่สามารถเชื่อมต่อได้ _ '+err);
      
      });
    }




  


  }
