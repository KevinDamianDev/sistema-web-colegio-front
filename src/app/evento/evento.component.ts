import { Component } from '@angular/core';
import { Evento } from './evento';
import { EventoService } from './evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent {

  eventos : Evento[];

  constructor(private eventoService: EventoService){}

  ngOnInit():void {
    this.eventoService.getEventos().subscribe(
      p => this.eventos = p  
    );
  }
  delete(evento: Evento): void{
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
  }


}
