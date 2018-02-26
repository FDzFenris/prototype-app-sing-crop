import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { user } from '../user/user'
import { CheckinPage } from '../checkin/checkin'

import { AngularFireDatabase } from 'angularfire2/database';

import { ToastService } from '../../providers/toastService';


//////อ้างอิงจาก//////
///// https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md
//////อ้างอิงจาก//////

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user_all= [];
  check_in_all= [];
  public todo = <any>{};
  
  constructor(
    public navCtrl: NavController, 
    public platform: Platform,   
    private barcodeScanner: BarcodeScanner,    
    public fdb : AngularFireDatabase,
    public toastService: ToastService
   
    
  ){
    
    this.fdb.list('/all_user/').snapshotChanges().map(actions => {
       this.user_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
       //return items.map(item => item.key);
    });
    

    this.fdb.list('/check_in/').snapshotChanges().map(actions => {
      this.check_in_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
   }).subscribe(items => {
      //return items.map(item => item.key);
   });
    /////////กรณี แบบเดิม  v.4.0  (ใช้ไม่ได้แล้ว)////////
   /*  this.fdb.list('/all_user/').valueChanges().subscribe(_data=>{

      this.user_all = _data;
      console.log(this.user_all);
    }); */
    
  }

  getlocation(){


   
  }
  
  manage_user() {
    this.navCtrl.push(user, {
      firstPassed: "ADMIN1",
      secondPassed: "ADMIN2"
    })
  }
  
  Check_in(data1,data2,data3) {
    this.navCtrl.push(CheckinPage, {
      DATA_FNAME: data1,
      DATA_LNAME: data2,
      NUMBER_ID: data3,
     
     
    })
  }


    public scan_checkin() {

      /////select * firebase //////  
    
      this.barcodeScanner.scan().then((barcodeData) => {        

        console.log("scanner")
        //alert("ชนิดของCODE: "+barcodeData.format+ " ข้อมูล: "+barcodeData.text);

        this.fdb.list('/all_user/', ref => ref.orderByChild('number_id').equalTo(barcodeData.text)).valueChanges().subscribe(_data=>{
          console.log(_data);
          var myJSON = JSON.parse(JSON.stringify(_data));
       
              if(_data.length>0){
                this.Check_in(myJSON[0].fname,myJSON[0].lname,barcodeData.text);                
            ////////////////////////// insert into    ////////////////////////////////////////////////
                 /*  const afList = this.fdb.list('/check_in/');
                  afList.push({ 
                    check_in: barcodeData.text
                    ,check_in_time : daynow
                    ,fname : myJSON[0].fname
                    ,lname : myJSON[0].lname 
                  });
                  const listObservable = afList.snapshotChanges();
                  listObservable.subscribe();  */

                }
                else{
                  this.toastService.Error_Toast('ไม่มีข้อมูลของบุคคลนี้');                 
                }

              });


       


      
      }, (err) => {
        console.log('ไม่สามารถเชื่อมต่อได้ _ '+err);
        alert('ไม่สามารถเชื่อมต่อได้ _ '+err);
      });
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

  
