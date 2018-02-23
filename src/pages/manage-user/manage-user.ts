import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';
/**
 * Generated class for the ManageUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-user',
  templateUrl: 'manage-user.html',
})
export class ManageUserPage {
  private todouser = <any>{} ;
  public key_user;
  private title : string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
    ) {
      this.key_user = navParams.get("key_user");
 
  }
  
  

  
   add_firebase(){  
    /////////กรณี  v.5.0  (ใช้งานได้)////////
    
    if(this.todouser.fname_update==null || this.todouser.lname_update==null || this.todouser.number_id==null || this.todouser.phone==null){
      this.toastService.Error_Toast();
    }
    else{
     /*  this.fdb.list('/all_user/', ref => ref.orderByChild('number_id').equalTo(this.todouser.number_id)).valueChanges().subscribe(_data=>{
        let myJSON11 = JSON.parse(JSON.stringify(_data));            
        this.todouser.fname_update =myJSON11[0].number_id;
 */

        const afList = this.fdb.list('/all_user/');
        afList.push({ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
        const listObservable = afList.snapshotChanges();
        listObservable.subscribe(); 
        this.todouser = {};
        this.navCtrl.pop();


        /* if(this.todouser.number_id == myJSON11[0].number_id){

          console.log('haveeeeeeeeeeee');
        }
        else{
          console.log('no haveeeeee');

          const afList = this.fdb.list('/all_user/');
          afList.push({ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
          const listObservable = afList.snapshotChanges();
          listObservable.subscribe(); 
          this.todouser = {};
        } */

     // });


        
        
  
    }
  }


   update_firebase(item_key){
    console.log('key :'+item_key+' data'+this.todouser);
    this.fdb.list("/all_user/").update(item_key,{ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
      
    this.toastService.Success_Toast();
    this.todouser = {};
    this.navCtrl.pop();
  }




   ionViewDidLoad() {

    let elem_save = <HTMLElement>document.querySelector(".button_save");
    let elem_update = <HTMLElement>document.querySelector(".button_update");

    if(this.key_user==null){
      this.title = "ADD USER";
      elem_update.style.display = 'none';
      elem_save.style.display = 'flex';
      
      this.todouser = {};
      
    }
    else{
      //console.log('user_key:'+this.key_user);    
      this.title = "EDIT USER";
      elem_update.style.display = 'flex';
      elem_save.style.display = 'none';
     
  
   
        this.fdb.list('/all_user/', ref => ref.orderByKey().equalTo(this.key_user)).valueChanges().subscribe(_data=>{
          console.log(_data);
          let myJSON = JSON.parse(JSON.stringify(_data));
         
    
          this.todouser.fname_update =myJSON[0].fname;
          this.todouser.lname_update =myJSON[0].lname;
          this.todouser.number_id =myJSON[0].number_id;
          this.todouser.phone =myJSON[0].phone;
    
          });
      


    }

  }


}
