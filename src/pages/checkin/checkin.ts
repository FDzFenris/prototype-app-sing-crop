import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';
import { Geolocation } from '@ionic-native/geolocation';

import {GoogleMaps
  ,GoogleMap
  //,GoogleMapsEvent
  //,Marker,GoogleMapsAnimation,MyLocation
} from '@ionic-native/google-maps';

 declare var google;
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

  mapReady: boolean = false;
  @ViewChild('map') mapElement: ElementRef;
  public map:GoogleMap;
    
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
    public googleMaps: GoogleMaps,
    private geolocation: Geolocation
  ) {
    this.fname = navParams.get("DATA_FNAME");
    this.lname = navParams.get("DATA_LNAME");
    this.number_id = navParams.get("NUMBER_ID");
  }
 
  protected check_in_shop() {
   
      this.geolocation.getCurrentPosition().then((resp) => {     
      //this.location = [{lat:resp.coords.latitude,long:resp.coords.longitude}];   


      let daynow = new Date().toLocaleString();    
      const afList = this.fdb.list('/check_in/');
      afList.push({ 
        number_id: this.number_id
        ,check_in_time : daynow
        ,fname : this.fname
        ,lname : this.lname
        ,lat : resp.coords.latitude
        ,long : resp.coords.longitude
      });
      const listObservable = afList.snapshotChanges();
      listObservable.subscribe(); 
      this.toastService.Success_Toast('เช็คอินแล้ว');
      

      }).catch((error) => {
        alert('กรุณาเปิดgps');
      });

     
      
      
    
    
    
  }

  
  loadMap() {
 
    console.log('map load');
    this.geolocation.getCurrentPosition().then((resp) => {   
     
      let latLng = new google.maps.LatLng( resp.coords.latitude,resp.coords.longitude);
   
      let mapOptions = {
        center: latLng,
        zoom: 10,
        tilt: 30,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
     
    });
    
  }



  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad CheckinPage');
  }

}
