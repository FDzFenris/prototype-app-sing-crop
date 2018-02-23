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
  public todouser = <any>{} ;
  public key_user:string = "";
  private title : string;
  public check_user_in_db;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
    ) {
      this.key_user = navParams.get("key_user");
 
  }
  
  

  
   add_firebase(){  
    /////////กรณี  v.5.0  (ใช้งานได้)////////
      /////////เช็คค่า ที่ส่งมาว่าว่างไหม////////
      if(this.todouser.fname_update==null || this.todouser.lname_update==null || this.todouser.number_id==null || this.todouser.phone==null){
        this.toastService.Error_Toast('เพิ่มข้อมูลไม่สำเร็จ');
      }
      else{
         /////////ส่ง number_id เข้าไปเช็คใน database ว่ามีค่าซ้ำไหม (เลขบัตรประชาชน)////////
        this.fdb.list('/all_user/', ref => ref.orderByChild('number_id').equalTo(this.todouser.number_id)).valueChanges().subscribe(_data=>{
          let jSONNOW = JSON.parse(JSON.stringify(_data)); 
         
              /////////หลังจากที่เช็คแล้ว ถ้า เป็น (emtpy หรือ .length!>0) และ number_id ไม่ใช่ null  //////////////
             //////////  แสดงว่ายังไม่มีค่าให้ทำการเพิ่มลง db ได้  ////////////////
          if(jSONNOW == "" && this.todouser.number_id!=null){
            const afList = this.fdb.list('/all_user/');
            afList.push({ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
            const listObservable = afList.snapshotChanges();
            listObservable.subscribe(); 
            this.todouser = {};  ////เคียค่าทั้งหมดให้ว่างเปล่า หลังจากเพิ่มข้อมูลลง db สำเร็จแล้ว/////
            this.navCtrl.pop(); ////กลับไปหน้าก่อนหน้านี้/////
            this.toastService.Success_Toast('เพิ่มข้อมูลเรียบร้อยแล้ว');
          }
           //////////  แสดงว่ามี number_id ใน db แล้ว ///////////////         
          else {            
            if(this.todouser.number_id!=null){  //////* เช็ค number_id อีกรอบว่ามีค่าไหม ถ้ามีแสดงว่ายังไม่ได้เคียค่าทั้งหมด*///////
              this.toastService.Error_Toast('เพิ่มข้อมูลไม่สำเร็จ เนื่องจากเลขบัตรประชาชนนี้มีการใช้งานแล้ว');
            }   
          }
       });       
           
           

       
      }
  }


   update_firebase(item_key){
    console.log('update key :'+item_key+' data'+this.todouser);
    this.fdb.list("/all_user/").update(item_key,{ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
      
    this.toastService.Success_Toast('แก้ไขข้อมูลเรียบร้อยแล้ว');
    this.todouser = <any>{};
    this.navCtrl.pop();
   
  }




   ionViewDidLoad() {

    //console.log(this.key_user.length);

    let elem_save = <HTMLElement>document.querySelector(".button_save");
    let elem_update = <HTMLElement>document.querySelector(".button_update");

    if(this.key_user==null){
     
      this.title = "ADD USER";
      elem_update.style.display = 'none';
      elem_save.style.display = 'flex';
      
      this.todouser = <any>{};
      
    }
    else if(this.key_user.length>0){

     

      //console.log('user_key:'+this.key_user);    
      this.title = "EDIT USER";
      elem_update.style.display = 'flex';
      elem_save.style.display = 'none';
     
  
   
        this.fdb.list('/all_user/', ref => ref.orderByKey().equalTo(this.key_user)).valueChanges().subscribe(_data=>{
         
          var  myJSON = JSON.parse(JSON.stringify(_data));
         
          //console.log(myJSON);
          if(myJSON==""){
           // console.log('myJson null');
          }
          else {
            //console.log('myJson not null');
          this.todouser.fname_update =myJSON[0].fname;
          this.todouser.lname_update =myJSON[0].lname;
          this.todouser.number_id =myJSON[0].number_id;
          this.todouser.phone =myJSON[0].phone;
          }
          });
      


    }

  }


}
