import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';

import { ToastService } from '../../providers/toastService';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class user  {
  public firstParam;
  public secondParam;
  private todouser = <any>{};
 
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public platform: Platform, 
     private toastService: ToastService,
     public fdb : AngularFireDatabase){
 
    this.firstParam = navParams.get("firstPassed");
    this.secondParam = navParams.get("secondPassed");
   // HomePage.checkhome();
   this.toastService.showToast();
  }

 

 
  add_firebase(){
   

    /////////กรณี  v.5.0  (ใช้งานได้)////////
    const afList = this.fdb.list('/all_user/');
    afList.push({ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe(); 
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage'+HomePage);
  }
 
  goBack() {
    console.log("popping");
    this.navCtrl.pop();
  }
}