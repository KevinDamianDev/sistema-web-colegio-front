import { Component } from '@angular/core';
import { Jugador } from './jugador';
import { JugadorService } from './jugador.service';
import Swal from 'sweetalert2';
import { ModalJugadorServiceService } from './detalle/detalle-jugador/modal-jugador-service.service';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html'
})
export class JugadoresComponent {

  jugadores : Jugador[];
  jugadorSeleccionado: Jugador;


  
  constructor(private jugadorService: JugadorService,
    private modalService: ModalJugadorServiceService){}


    ngOnInit():void {
      this.jugadorService.getJugadores().subscribe(
        p => this.jugadores = p  
      );
  
      this.modalService.notifica.subscribe(e =>{
        this.jugadores = this.jugadores.map(eO =>{
          if(e.idJugador == eO.idJugador){
            eO.foto = e.foto;
          }
          return eO;
        })
      })
    }
  
    delete(jugador: Jugador): void{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    
      swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: `¿Seguro que deseas eliminar al jugador ${jugador.nombreJugador} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.jugadorService.delete(jugador.idJugador).subscribe(
            response => {
              this.jugadores = this.jugadores.filter(p => p!==jugador)
              swalWithBootstrapButtons.fire(
                'Jugador Eliminado!',
                `Jugador ${jugador.nombreJugador} eliminado con exito..!`,
                'success'
              )
            }
          )
    
        }
      });
    }
  
  
    abrirModal(jugador: Jugador){
      this.jugadorSeleccionado=jugador;
      this.modalService.abrirModal();
    }
    

}
