import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//////อ้างอิงจาก//////
///// https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md
//////อ้างอิงจาก//////

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_all= [];
 
  
  constructor(
    public navCtrl: NavController,
    public bootstap :NgbModule,
    public platform: Platform,
    private barcodeScanner: BarcodeScanner,    
    public fdb : AngularFireDatabase,
    
  ){
    
    this.fdb.list('/admin_user/').snapshotChanges().map(actions => {
       this.user_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
       //return items.map(item => item.key);
    });
    
    /////////กรณี แบบเดิม  v.4.0  (ใช้ไม่ได้แล้ว)////////
   /*  this.fdb.list('/admin_user/').valueChanges().subscribe(_data=>{

      this.user_all = _data;
      console.log(this.user_all);
    }); */
 
  }




  

  add_firebase(data: NgForm){
    this.fdb.list("/admin_user/").push(data.value);

    /////////กรณี  v.5.0  (ใช้งานได้)////////
   /*  const afList = this.fdb.list('/admin_user/');
    afList.push({ name: 'item' });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe(); */
  }
    
  delete_firebase (item){
    
    console.log('remove key : '+item);
    this.fdb.list("/admin_user/").remove(item);
  }

  update_firebase(item,username_data){
    console.log(username_data);
    console.log(this.fdb.list("/admin_user/").update(item,{ username: username_data })
  );

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
