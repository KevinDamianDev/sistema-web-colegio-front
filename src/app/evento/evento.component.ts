import { Component } from '@angular/core';
import { Evento } from './evento';
import { EventoService } from './evento.service';
import Swal from 'sweetalert2';
import { AuthService } from '../personas/auth.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent {

  eventos : Evento[]= [];

  paginatedEventos: Evento[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  ceil = Math.ceil;
  searchTerm: string = '';

  constructor(private eventoService: EventoService, public auth: AuthService){}

  ngOnInit():void {
    this.cargarEventos();
  
  }
  search(): void {
    this.updatePaginatedEventos();
  }

  cargarEventos(): void{
    this.eventoService.getEventos().subscribe(
      p =>{
        this.eventos = p;    
        this.updatePaginatedEventos();
      }
    );
   
  }


  updatePaginatedEventos() {
    let filteredEventos = this.eventos;
    if (this.searchTerm) {
      filteredEventos = this.eventos.filter(evento =>
        evento.nombreEvento.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredEventos.length);
    this.paginatedEventos = filteredEventos.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedEventos();
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
