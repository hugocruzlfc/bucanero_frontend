
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Subject } from 'rxjs';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import {Location} from '@angular/common';
import { NotificationService } from '../notification/services/notification.service';

import { User } from './../shared/interfaces/users.interface';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //users$ = this.userService.users;
  users = Array<User>();
  modalTitle: string = '';
  modalButtom: string = '';
  btCanCe: string = '';
  intervalVariable : any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  userForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  private passwordSize = /[a-zA-z0-9]{6,16}/i;
  private celularLenght = /^([0-9]){8,8}$/;
  private dniLenght = /^([0-9]){11,11}$/;
  actionMode: number = 1;
  currenUser: any;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  roleDefault: any;

  constructor(private userService: UsersService,private fb: FormBuilder, private notificationService: NotificationService,
    private _location: Location, private cdref: ChangeDetectorRef) { 
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dni: [null, [Validators.required, Validators.pattern(this.dniLenght)]],
      celular: ['', [Validators.required, Validators.pattern(this.celularLenght)]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordSize)]],
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      info: true,
      retrieve: true,
      destroy: true,
      responsive: true,
      stateSave: true,
      columnDefs: [
        {
          targets:[0],
          orderData: [0,1]
        },
      ],
      language: {
        emptyTable:	"No hay datos disponibles.",
        zeroRecords:	"No se han encontrado coincidencias.",
        lengthMenu: 'Mostrar _MENU_  elementos',
        loadingRecords:	"Cargando...",
        processing:	"Procesando...",
        search: 'Buscar:',
        searchPlaceholder:	"Dato para buscar",
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: '??lt.',
          next: 'Sig.',
          previous: 'Ant.'
        },
        aria: {
					sortAscending:	"Ordenaci??n ascendente",
					sortDescending:	"Ordenaci??n descendente"
				}
   }
  }
  this.getUsers();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    
     }
  

  getUsers(){
    this.userService.getAllUser().subscribe(data => {
      const aux: any = data;
      if (aux) {
        this.users = aux;
        this.dtTrigger.next();
      }
     });
   }
 
  async workerUser(){
     if (this.actionMode == 1) {
        let newUser: User = this.userForm.value;
        this.userService.addNewUser(newUser).subscribe(data =>{
          this.getUsers();
          this.notificationService.success('Usuario creado correctamente',this.options);
        });
     } else { //editar
      var editUser: User = this.userForm.value;
      editUser.id =  this.currenUser.id;
      this.userService.editUser(editUser).subscribe(data=>{
        this.getUsers();
        this.notificationService.success('Usuario editado correctamente',this.options);
      });
     }
     this.userForm.reset();
     
  }
  
 showUser(item: User){
  this.userForm.patchValue({
    'name': item.name,
    'address':  item.address,
    'dni':  item.dni,
    'celular':  item.celular,
    'role': item.role,
    'email': item.email,
    'password': item.password
    })
 }

  modalMode(mode: number, item?: User){
    this.userForm.reset();
    switch(mode){
      case 1:{
        this.modalTitle = 'A??adir usuario';
        this.btCanCe = 'Cancelar'
        this.actionMode = 1;
        this.modalButtom = 'A??adir';
        this.roleDefault = "Tramitador";
       break;
      }
      case 2:{
        this.modalTitle = 'Detalles del usuario';
        this.btCanCe = 'Cerrar'
        this.actionMode = 3
        this.currenUser = item;
        this.showUser(this.currenUser)
       break;
      }
       case 3:{
        this.modalTitle = 'Editar usuario';
        this.btCanCe = 'Cancelar'
        this.actionMode = 2
        this.modalButtom = 'Editar'
        this.currenUser = item;
        this.showUser(this.currenUser)

       break;
      }
       case 4:{
        this.currenUser = item;
       break;
      }
    }

  }

  backClicked() {
    this._location.back();
  }

  deletUser(){
    this.userService.deletUser(this.currenUser).subscribe(data =>{
      this.getUsers();
        this.notificationService.warn('Usuario eliminado correctamente',this.options);
    })
  }

 

}
