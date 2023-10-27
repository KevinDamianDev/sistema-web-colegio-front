import { Component } from '@angular/core';
import { EventoService } from '../evento.service';
import { Evento } from '../evento';
import { AuthService } from 'src/app/personas/auth.service';
import { EventoPersonaServiceService } from 'src/app/evento-persona/evento-persona-service.service';
import { EventoPersona } from 'src/app/evento-persona/evento-persona';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html'

})
export class MisEventosComponent {

  misEventos : EventoPersona[];
  idUsuarioLogueado: number;

  mensaje : string;

  constructor(
    private eventoPersonService: EventoPersonaServiceService, 
    public auth: AuthService ){}

  ngOnInit():void {
    this.cargarMisEventos();
  }

  cargarMisEventos(): void{
    this.idUsuarioLogueado = this.auth.usuario.idPersona;
    this.eventoPersonService.getEventosByPersona(this.idUsuarioLogueado).subscribe(
      ev =>{
         this.misEventos = ev  
      },
      err=>{
        this.mensaje = err.error.mensaje;
      }
      
    );
  }

 
 /* delete(evento: Evento): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar el evento ${evento.nombreEvento} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventoService.delete(evento.idEvento).subscribe(
          response => {
            this.eventos = this.eventos.filter(p => p!==evento)
            swalWithBootstrapButtons.fire(
              'Evento Eliminado!',
              `Evento ${evento.nombreEvento} eliminado con exito..!`,
              'success'
            )
          }
        )
  
      }
    });
  }*/


}
