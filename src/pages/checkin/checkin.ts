import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';

/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  public fname;
  public lname;
  public number_id;
  
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService
  ) {
    this.fname = navParams.get("DATA_FNAME");
    this.lname = navParams.get("DATA_LNAME");
    this.number_id = navParams.get("NUMBER_ID");
  }

  protected check_in_shop() {
    let daynow = new Date().toLocaleString();    
    const afList = this.fdb.list('/check_in/');
    afList.push({ 
      number_id: this.number_id
      ,check_in_time : daynow
      ,fname : this.fname
      ,lname : this.lname
    });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe(); 
    this.toastService.Success_Toast('เช็คอินแล้ว');
  }


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad CheckinPage');
  }

}
