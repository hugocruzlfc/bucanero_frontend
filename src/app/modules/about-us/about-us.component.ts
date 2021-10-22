import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  
  position = {
    lat: 20.864702271410145,
    lng: -76.27002906137601     
  };
  label = {
    color: 'red',
    text: 'Cervecería Bucanero SA',
  }
  safeUrl: any;

  constructor( private _sanitizer: DomSanitizer ){
    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/AovOqd4oKfI');
  }

  ngOnInit(): void {
    
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   }
    // })
  } 



}
