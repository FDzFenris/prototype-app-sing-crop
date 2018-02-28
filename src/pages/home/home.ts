import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { user } from '../user/user'
import { CheckinPage } from '../checkin/checkin'

import { AngularFireDatabase } from 'angularfire2/database';
//////อ้างอิงจาก//////
///// https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md
//////อ้างอิงจาก//////


import { ToastService } from '../../providers/toastService';

import { Http, Headers, RequestOptions } from "@angular/http";






declare var google:any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user_all= [];
  check_in_all= [];
  public todo = <any>{};
  public lat_people= [];
  public long_people= [];

  @ViewChild('map') mapRef:ElementRef;

  map:any;
  
  constructor(
    public navCtrl: NavController, 
    public platform: Platform,   
    private barcodeScanner: BarcodeScanner,    
    public fdb : AngularFireDatabase,
    public toastService: ToastService,
    public http:Http,
   
  ){
    
    this.fdb.list('/all_user/').snapshotChanges().map(actions => {
       this.user_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
       //return items.map(item => item.key);
    });
    

    this.fdb.list('/check_in/').snapshotChanges().map(actions => {
      this.check_in_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
      //console.log( this.check_in_all);
   }).subscribe(items => {
      //return items.map(item => item.key);
   });
    /////////กรณี แบบเดิม  v.4.0  (ใช้ไม่ได้แล้ว)////////
   /*  this.fdb.list('/all_user/').valueChanges().subscribe(_data=>{

      this.user_all = _data;
      console.log(this.user_all);
    }); */
    

  }


   cha(a1,a2){
   
   /*  let post_to_api = {}
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://maps.googleapis.com/maps/api/geocode/json?latlng='+19.9200283+','+99.861371, JSON.stringify(post_to_api), options)
    .subscribe(data => { */
      //console.log(data);

        //let api_google_map = JSON.parse(data['_body']);

        //console.log(api_google_map);
        return a1+"/"+a2;

        //console.log(data_api2);


      

     /*  }); */
    
     
   }

  check(){
   
    console.log('load map');
    //console.log(this.mapRef);

   const localtion = new google.maps.LatLng(19.9200254, 99.8613899);

    const options={
      center : localtion,
      zoom:15,
      tilt: 30,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
 

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

 find_livefrom(lat=0,long=0){
      let post_to_api = {}

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long, JSON.stringify(post_to_api), options)
      .subscribe(data => {
        //console.log(data);

    let api_google_map = JSON.parse(data['_body']);

  console.log(api_google_map);

  
    //console.log(data_api2);


   

  }, error => {
     console.log(error); 
  });
 } 


 get_location(){
  this.toastService.getGeo()
 
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

    ionViewDidLoad(){
     //this.check();
 
    }
  
  }

  
