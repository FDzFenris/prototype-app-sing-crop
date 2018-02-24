import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';

import { ManageUserPage } from '../manage-user/manage-user'

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class user  {
  public firstParam;
  public secondParam; 
  user_all= [];
 
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public platform: Platform,   
     public toastService: ToastService,     
     public fdb : AngularFireDatabase){
 
    this.firstParam = navParams.get("firstPassed");
    this.secondParam = navParams.get("secondPassed");

  

              
          this.fdb.list('/all_user/').snapshotChanges().map(actions => {
            this.user_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
        }).subscribe(items => {
            //return items.map(item => item.key);
        });
        
        /////////กรณี แบบเดิม  v.4.0  (ใช้ไม่ได้แล้ว)////////
        /*  this.fdb.list('/all_user/').valueChanges().subscribe(_data=>{

          this.user_all = _data;
          console.log(this.user_all);
        }); */
        
  }

 
  Register() {
    this.navCtrl.push(ManageUserPage, {
      firstPassed: "ADMIN1",
      secondPassed: "ADMIN2"
    })
  }

  edit_user(key) {
    this.navCtrl.push(ManageUserPage, {
      key_user: key,    
    })
  }

  delete_firebase (item){
    
    console.log(this.toastService.ALear_Confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่ ?'));

    console.log('remove key : '+item);
    this.fdb.list("/all_user/").remove(item);
    this.toastService.Error_Toast('ลบข้อมูลสำเร็จแล้ว');
  }
 
  ionViewDidLoad() {
    console.log('LIVE IN USERPAGE');
  }
 
  goBack() {
    //console.log("popping");
    this.navCtrl.pop();    
  }
}