import { Component } from '@angular/core';
import { Evento } from '../evento/evento';
import { Fase } from '../fases/fase';
import { EventoService } from '../evento/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from '../fases/fases.service';
import { Fecha } from '../fechas/fecha';
import { Location } from '@angular/common';
import { Equipo } from '../equipos/equipo';
import { ModalService } from '../equipos/detalle/modal.service';
import { EquipoService } from '../equipos/equipo.service';
import Swal from 'sweetalert2';
import { EventoEquipo } from '../equipos/evento-equipo';
@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html'
})
export class DetalleEventoComponent {

  public evento: Evento = new Evento();
  fases: Fase[];
  fechas: Fecha[];
  errores : string;
  equipos: Equipo[];
  erroresEquipo : string;

  // VARIABLES EQUIPO

  equipoSeleccionado: Equipo;

  eventoEquipo:EventoEquipo;

  constructor(private eventoService: EventoService,
    private activate: ActivatedRoute, private location: Location, private modalService: ModalService,
    private equipoService: EquipoService, private faseService: FasesService){}

    // OPCIONES FASES
    public checkboxSeleccionado: boolean = false;
    public botonesHabilitados: boolean = false;

    // OPCIONES EQUIPO
    public checkboxSeleccionadoEquipo: boolean = false;
    public botonesHabilitadosEquipo: boolean = false;

  ngOnInit(): void {
    this.cargarEvento();

    this.modalService.notifica.subscribe(e =>{
      this.equipos = this.equipos.map(eO =>{
        if(e.idEquipo == eO.idEquipo){
          eO.foto = e.foto;
        }
        return eO;
      })
    })

  }

  cargarEvento(): void {
    this.activate.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        // CARGA DATA DE EVENTO
        this.eventoService.getEvento(id).subscribe((e) => {
          this.evento = e;
        }); 
        // CARGA DATA DE FASES DE EVENTO
        this.eventoService.getFasesEvento(id).subscribe(          
            (s) =>{
              this.fases = s
            } ,   
                     
             err =>{
              this.errores = err.error.mensaje as string;
            });
            // CARGA DATA DE EQUIPOS DE EVENTO
        this.eventoService.getEquipoEvento(id).subscribe(
          equipo => {
            this.equipos = equipo;
          },
          error =>{
            this.erroresEquipo = error;
          }
        )
        
      }
    });
  }

  toggleBotones() {
    this.botonesHabilitados = !this.botonesHabilitados;
  }
  toggleBotonesEquipo() {
    this.botonesHabilitadosEquipo = !this.botonesHabilitadosEquipo;
  }

cancelar() {
  this.location.back(); // Esto navegará hacia atrás en la historia de navegación
}


deleteEquipo(equipo: Equipo): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `¿Seguro que deseas eliminar el equipo ${equipo.nombreEquipo} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.eventoEquipo = new EventoEquipo();
      this.eventoEquipo.equipo = equipo;
      this.eventoEquipo.evento = this.evento;

      console.log(' this.eventoEquip::::'+JSON.stringify(this.eventoEquipo, null, 2));
      this.eventoService.eliminarEventoEquipo(this.eventoEquipo).subscribe(
        response => {
          this.equipos = this.equipos.filter(p => p!==equipo)
          swalWithBootstrapButtons.fire(
            'Equipo Eliminado!',
            `Equipo ${equipo.nombreEquipo} eliminado con exito..!`,
            'success'
          )
        }
      )

    }
  });
}


abrirModal(equipo: Equipo){
  this.equipoSeleccionado=equipo;
  this.modalService.abrirModal();
}

delete(fase: Fase): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `¿Seguro que deseas eliminar la fase ${fase.nombreFase} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.faseService.delete(fase.idFase).subscribe(
        response => {
          this.fases = this.fases.filter(p => p!==fase)
          swalWithBootstrapButtons.fire(
            'Fase Eliminada!',
            `Fase ${fase.nombreFase} eliminada con exito..!`,
            'success'
          )
        }
      )

    }
  });
}

}
