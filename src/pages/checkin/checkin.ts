import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from "@angular/http";
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

  public lat_con;
  public long_con;

  public live_zone;

  mapReady: boolean = false;
  @ViewChild('map') mapElement: ElementRef;
  map:any;
    
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
    public loadingCtrl: LoadingController,
    public http:Http,
    private geolocation: Geolocation
  ) {
    this.fname = navParams.get("DATA_FNAME");
    this.lname = navParams.get("DATA_LNAME");
    this.number_id = navParams.get("NUMBER_ID");
   
  }
 
  protected check_in_shop() {

    if (typeof this.lat_con === 'undefined' ||typeof this.lat_con === 'undefined'  ) {
    
      alert('เครื่องมีปัญหา ไม่พบพิกัด พิกัดตอนนี้ = '+this.lat_con+" / "+this.lat_con);}

      else{
        let apikey = "&key=AIzaSyCPXKNg-l4wH-60_vX5a7QBF7JnBdBabd0";
        let post_to_api = {};
        var link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        this.http.post(link+this.lat_con+','+this.long_con+apikey, JSON.stringify(post_to_api), options)
          .subscribe(data => { 
            let api_google_map = JSON.parse(data['_body']);
  
            this.live_zone =api_google_map.results[1].formatted_address;
          }, error => {
          
              alert(error);
          }); 
        
  
  
        let daynow = new Date().toLocaleString();    
        const afList = this.fdb.list('/check_in/');
        afList.push({ 
          number_id: this.number_id
          ,check_in_time : daynow
          ,fname : this.fname
          ,lname : this.lname
          ,lat : this.lat_con
          ,long : this.long_con
          ,live_zone : this.live_zone
        });
        const listObservable = afList.snapshotChanges();
        listObservable.subscribe(); 
        this.toastService.Success_Toast('เช็คอินแล้ว');

      }

      
  }
  Loading(time) {
    let loading = this.loadingCtrl.create({
      content: 'loading ...'
    });
  
    loading.present();
  
    setTimeout(() => {
    
      loading.dismiss();
    }, time);
  }
  loadMap(lat2,long2) {
    this.Loading(800);
    

    setTimeout(() => {
    
     
    

   

    if (typeof lat2 === 'undefined' ||typeof long2 === 'undefined'  ) {
     //lat2=0;long2=0;
     alert('เครื่องมีปัญหา ไม่พบพิกัด พิกัดตอนนี้ = '+lat2+" / "+long2);
      }
      else{
 
              //alert(lat2+"  / /  "+long2);


              //console.log('map load');
            
          
          // let lat2 =  this.lat_con;
            //let long2 =  this.long_con;
            //let latLng = new google.maps.LatLng( resp.coords.latitude,resp.coords.longitude);
            let latLng = new google.maps.LatLng(lat2,long2);
            let mapOptions = {
              center: latLng,
              zoom: 18,
              tilt: 30,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            
            this.addMarker();
          }
    }, 800);
    
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>ME!</h4>";         
   
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
    //this.Loading(1000);
    this.geolocation.getCurrentPosition().then((resp) => { 
      this.lat_con= resp.coords.latitude;
      this.long_con= resp.coords.longitude;
      this.loadMap(this.lat_con,this.long_con);
    }).catch((error) => {
      alert('กรุณาเปิดgps');
    });


    
   // console.log('ionViewDidLoad CheckinPage');
  }

}
