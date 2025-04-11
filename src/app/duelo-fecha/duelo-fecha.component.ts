import { Component } from '@angular/core';
//import { FechasService } from '../fechas/fechas.service';
import { ActivatedRoute } from '@angular/router';
//import { FasesService } from '../fases/cursos.service';
import { Duelo } from '../duelos/duelo';
//import { Fase } from '../fases/curso';
//import { Fecha } from '../fechas/fecha';
import { DueloService } from '../duelos/duelo.service';
import Swal from 'sweetalert2';
import { AuthService } from '../personas/auth.service';
import { ModalJugadorServiceService } from '../jugadores/detalle/detalle-jugador/modal-jugador-service.service';

@Component({
  selector: 'app-duelo-fecha',
  templateUrl: './duelo-fecha.component.html'

})
export class DueloFechaComponent {

 /* duelos: Duelo[];
  idFecha: number;
  nombreFecha: string;
 // fase: Fase;
  idFase: number;
  fecha: Fecha;
  errorDuelos: string;

  public checkboxSeleccionado: boolean = false;
  public botonesHabilitados: boolean = false;

  dueloSeleccionado: Duelo;

  constructor( 
    //private faseService: FasesService, 
    private route: ActivatedRoute,
    private dueloService: DueloService,
    private fechaService: FechasService,
    public auth: AuthService,
    private modalService: ModalJugadorServiceService){}


  ngOnInit(): void {
    this.modal();
    //this.cargarFechasByFase();
  }

  abrirModal(duelo: Duelo){
    this.dueloSeleccionado=duelo;
    this.modalService.abrirModal();
  }

  modal(): void{
    this.modalService.notifica.subscribe(e =>{
     //this.cargarFechasByFase();
    })
  }

/*

  cargarFechasByFase(): void {
    this.route.params.subscribe((params) => {
      const idFecha = params['idFecha'];   
      const idFase = params['idFase'];   

      this.idFase = idFase;

      if (idFecha) {
        this.idFecha = idFecha;
        // OBTENGO DUELOS DE LA FECHA
        this.fechaService.getDuelosByFecha(idFecha).subscribe(
          (e) => {
          this.duelos = e;
        },
        (error)=>{
          this.errorDuelos = error.error.mensaje;
        }); 
        
        // OBTENGO FECHA
        this.fechaService.getFecha(idFecha).subscribe(
          (fecha)=>{
            this.fecha = fecha;
            this.nombreFecha = fecha.nombreFecha;
          }
        )

        // OBTENGO FASE
        this.faseService.getFase(idFase).subscribe(
          (f)=>{
            this.fase = f;
            //console.log(' this.fase ::::'+JSON.stringify(this.fase, null, 2));
          }
        )
      }
    });
  }*/

 /* toggleBotones() {
    this.botonesHabilitados = !this.botonesHabilitados;
  }


  
  delete(duelo: Duelo): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar el duelo ${duelo.nombreDuelo} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dueloService.delete(duelo.idDuelo).subscribe(
          response => {
            this.duelos = this.duelos.filter(p => p!==duelo)
            swalWithBootstrapButtons.fire(
              'Duelo Eliminado!',
              `Duelo ${duelo.nombreDuelo} eliminado con exito..!`,
              'success'
            )
          }
        )
  
      }
    });
  }*/
}
