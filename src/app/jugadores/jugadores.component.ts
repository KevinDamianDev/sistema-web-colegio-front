import { Component } from '@angular/core';
import { Jugador } from './jugador';
import { JugadorService } from './jugador.service';
import Swal from 'sweetalert2';
import { ModalJugadorServiceService } from './detalle/detalle-jugador/modal-jugador-service.service';
import { EquipoJugador } from './equipo-jugador';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../evento/evento.service';
import { Evento } from '../evento/evento';
import { Equipo } from '../equipos/equipo';
import { EquipoService } from '../equipos/equipo.service';
import { AuthService } from '../personas/auth.service';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html'
})
export class JugadoresComponent {

  jugadores : Jugador[];
  jugadorSeleccionado: Jugador;
  equipoJugador: EquipoJugador[];
  mensajeJugadores: string;

  evento: Evento;
  idEvento: number;
 // nombreEvento: string;

  equipo: Equipo;
  idEquipo: number;
  nombreEquipo: string;

  public checkboxSeleccionado: boolean = false;
  public botonesHabilitados: boolean = false;

  constructor(
    private jugadorService: JugadorService,
    private modalService: ModalJugadorServiceService, 
    private activate: ActivatedRoute,
    private eventoService: EventoService, 
    private equipoService: EquipoService,
    public auth: AuthService){}


    ngOnInit():void {
      this.cargarEquiposJugadorsByEquipo();
      this.modal();
      this.cargarEvento();

    }

   modal(): void{
      this.modalService.notifica.subscribe(e =>{
        this.cargarEquiposJugadorsByEquipo();
      })
    }


// CARGA LOS EQUIPOS_JUGADORES SEGUN EQUIPO
cargarEquiposJugadorsByEquipo(): void {
  this.activate.params.subscribe(params =>{
    var idEquipo =  params['id']
    console.log('idEquipo' + idEquipo)
    if(idEquipo){
      this.idEquipo = idEquipo;
      this.jugadorService.getEquiposJugadoresByEquipo(idEquipo).subscribe({
        next: (value: any) =>{
            this.equipoJugador = value;
            console.log('equipoJugador:::', JSON.stringify(this.equipoJugador, null, 2));
        },
        error: (error: any) =>{
          this.mensajeJugadores = error.error.mensaje;
          //console.log('mensajeError:::' + this.mensajeError)
        }
      });
      // CARGA EQUIPO
      this.equipoService.getEquipo(idEquipo).subscribe({
        next: (value: any) =>{
          this.equipo = value;
          this.nombreEquipo= this.equipo.nombreEquipo;
        }
      })
      }
  })
}

cargarEvento(): void {
  this.activate.params.subscribe((params) => {
    const idEvento = params['idEvento'];
    console.log('idEvento' + idEvento)
    if (idEvento) {
      this.eventoService.getEvento(idEvento).subscribe((e) => {
        this.evento = e;
        this.idEvento= e.idEvento;
        //this.nombreEvento = e.nombreEvento;
      });       
    }
  });
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
    

// ELIMINA UN EQUIPO_JUGADOR

    eliminarEquipoJugador(idEquipoJugador: number): void{
      console.log('idEquipoJugador:::' +idEquipoJugador)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    
      swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: `¿Seguro que deseas eliminar el jugador del equipo ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(' this.equipoGrupo ELIMINAR::::'+JSON.stringify(this.equipoGrupo, null, 2));
          this.jugadorService.deleteEquipoJugador(idEquipoJugador).subscribe(
            response => {
              this.cargarEquiposJugadorsByEquipo();
              swalWithBootstrapButtons.fire(
                'Jugador Eliminado!',
                `Jugador eliminado del equipo..!`,
                'success'
              )
            }
          )
    
        }
        //location.reload();
      });
    }
    toggleBotones() {
      this.botonesHabilitados = !this.botonesHabilitados;
    }
}
