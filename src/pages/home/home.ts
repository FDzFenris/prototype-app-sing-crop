import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


import { AngularFireDatabase } from 'angularfire2/database';


//////อ้างอิงจาก//////
///// https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md
//////อ้างอิงจาก//////

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  encodeData : string ;
  encodedData : {} ;
  user_all= [];
  public todo = <any>{};
  
  constructor(
    public navCtrl: NavController, 
    public platform: Platform,   
    private barcodeScanner: BarcodeScanner,    
    public fdb : AngularFireDatabase,
    
  ){
    
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


  

 /*  add_firebase(data: NgForm){
   /////////กรณี  v.4.0  (ใช้งานได้)////////
    this.fdb.list("/all_user/").push(data.value);
  } */

  add_firebase(){
    /////////กรณี  v.5.0  (ใช้งานได้)////////
    const afList = this.fdb.list('/all_user/');
    afList.push({ fname: this.todo.fname_update,lname: this.todo.lname_update,number_id: this.todo.number_id,phone: this.todo.phone  });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe(); 
  }
    
  delete_firebase (item){
    
    console.log('remove key : '+item);
    this.fdb.list("/all_user/").remove(item);
  }

  update_firebase(item){
    console.log(this.todo);
    console.log(this.fdb.list("/all_user/").update(item,{ fname: this.todo.fname_update,lname: this.todo.lname_update,number_id: this.todo.number_id,phone: this.todo.phone  }));

  }




   public scan() {
     
      this.barcodeScanner.scan().then((barcodeData) => {        

      console.log("scanner")
        alert("type"+barcodeData.format+ " data "+barcodeData.text);
      
      }, (err) => {
        console.log('ไม่สามารถเชื่อมต่อได้ _ '+err);
      
      });
    }

   /*  public getbarcode(){
   
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

        console.log(encodedData);
        this.encodedData = encodedData;

      }, (err) => {
        console.log("Error occured : " + err);
        });                 
     } */

  


  
  
  }

  
