import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
//capacitor plugins
import {Plugins, CameraResultType} from '@capacitor/core';
import { ToastController } from '@ionic/angular';
const {Camera, Geolocation, Toast, LocalNotifications }= Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public toastController:ToastController) {}

  async localnoti(msg:any){
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "BYOC",
          body: "Maklumat diskaun",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }//localnoti

  async showtoast(msg:any){
    const toast=await this.toastController.create({
      message: msg,
      duration: 5000,
      color: 'warning',//success=hijau, warning=oren, danger=merah
    });
    await toast.present();
  }

  lat:any;
  long:any;
  async geolocate(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat=coordinates.coords.latitude;
    this.long=coordinates.coords.longitude;
    this.showtoast("Koordinat Latitude:"+this.lat+" Longitude:"+this.long);
    console.log('Current position:', coordinates);
  }

  imageElement: any ="";
  async tangkapgambar(){
    //opearsi guna kamera
    const image = await Camera.getPhoto({
      quality: 90,
      //allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    //or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.imageElement.src = imageUrl;
  }//end 
}
