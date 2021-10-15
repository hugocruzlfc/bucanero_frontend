import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from "../notification/services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ruta: string = '';
  userName =  '';
  isAdmin: boolean = false;
  
  constructor(private router: Router,private route: ActivatedRoute, 
          public notificationService: NotificationService) { 
            const navigation = this.router.getCurrentNavigation();
            let user = navigation?.extras?.state;
            this.userName = user?.name;
            if (user?.role == 'Administrador') {
              this.isAdmin = true;
              
            };
          }

  ngOnInit(): void {
  }
  

  changeMenu(options: number){
    switch(options){
       case 1:{
           this.ruta = 'crearContrato';
           break;
       }
       case 2:{
           this.ruta = 'verContrato';
           break;
       }
       case 3:{
           this.ruta = 'adjuntarContrato';
           break;
       }
       case 4:{
           this.ruta = 'exportToExcel';
           break;
       }
       case 5:{
           this.ruta = 'admin';
           break;
       }
       case 6:{
           this.ruta = 'help';
           break;
       }
       case 7:{
           this.ruta = 'aboutUs';
           break;
       }
    }
    
  }

  logout(){
    this.router.navigate(['login']);
  }
}
