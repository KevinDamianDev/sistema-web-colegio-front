import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalJugadorServiceService {


  modal: boolean= false;
  _notifica= new EventEmitter<any>();
  
    constructor() { }
  
    get notifica(): EventEmitter<any>{
      return this._notifica;
    }
  
  abrirModal(){
    this.modal=true;
  }
  
  cerrarModal(){
    this.modal=false;
  }
}
