import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

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

  mapReady: boolean = false;
  @ViewChild('map') mapElement: ElementRef;
  map:any;
    
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation
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
        ,lat : this.lat_con
        ,long : this.long_con
      });
      const listObservable = afList.snapshotChanges();
      listObservable.subscribe(); 
      this.toastService.Success_Toast('เช็คอินแล้ว');
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

    this.Loading(500);
 
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

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }
  addInfoWindow(marker, content){
   
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }



  ionViewDidLoad() {
    this.Loading(1000);
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
