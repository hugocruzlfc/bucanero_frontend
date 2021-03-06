import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {


  private rol = new BehaviorSubject<string>('En espera de un rol');
  public customRole = this.rol.asObservable();
  private name = new BehaviorSubject<string>('En espera de un nombre');
  public customName = this.name.asObservable();
  private userId = new BehaviorSubject<number>(0);
  public customUserId = this.userId.asObservable();

  constructor() {}
  
  public changeRole(newRol: string): void {
    this.rol.next(newRol);
  }

  public changeUserId(newUserId: number): void {
    this.userId.next(newUserId);
  }
  
  public changeUserName(newName: string): void {
    this.name.next(newName);
  }
}
