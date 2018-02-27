import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
 // GoogleMap,
  //GoogleMapsEvent,
  //GoogleMapOptions,
  //CameraPosition,
  MarkerOptions,
  Marker
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

  @ViewChild('map') mapElement: ElementRef;
  public map: any;
    
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
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
      let latLng = new google.maps.LatLng(19.9200254, 99.8613899);
   
      let mapOptions = {
        center: latLng,
        zoom: 10,
        tilt: 30,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
     
      this.addMarker();
    
  }
  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>FDz!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map, marker);
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }



  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad CheckinPage');
  }

}
