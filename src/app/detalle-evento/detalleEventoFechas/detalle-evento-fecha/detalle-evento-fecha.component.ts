import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fase } from 'src/app/fases/fase';
import { FasesService } from 'src/app/fases/fases.service';
import { Fecha } from 'src/app/fechas/fecha';
import { Grupo } from 'src/app/grupos/grupo';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FechasService } from 'src/app/fechas/fechas.service';
import { GrupoService } from 'src/app/grupos/grupo.service';
@Component({
  selector: 'app-detalle-evento-fecha',
  templateUrl: './detalle-evento-fecha.component.html'
})
export class DetalleEventoFechaComponent {

  constructor(private faseService: FasesService,  private route: ActivatedRoute, private location: Location,
    private fechaService: FechasService, private grupoService: GrupoService){}
  public fase: Fase = new Fase();

  fechas : Fecha[];
  errores: string;
  erroresGrupo: string;
  //nombreEvento: string;
  grupos: Grupo[];

  public checkboxSeleccionado: boolean = false;
  public botonesHabilitados: boolean = false;

  public checkboxSeleccionadoGrupo: boolean = false;
  public botonesHabilitadosGrupo: boolean = false;

  idEvento: number;

  ngOnInit(): void {

    this.cargarFechasByFase();
  }


  cargarFechasByFase(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      //const n   = params['nE'];
      
      if (id) {
        this.faseService.getFase(id).subscribe((e) => {
          this.fase = e;
          this.idEvento= this.fase.evento.idEvento;
          console.log('idEvento' , this.idEvento)

          this.faseService.getFechasFase(id).subscribe(          
            (s) => {
              this.fechas = s
            },
             err =>{
              this.errores = err.error.mensaje as string;
            })
          //  this.nombreEvento = n;

            this.faseService.getGruposFase(id).subscribe(
              (g) => {
                this.grupos = g;
              },
              errorGrupo=>{
                this.erroresGrupo = errorGrupo.error.mensaje as string;
              }
            )

        });
      }
    });
  }

  toggleBotones() {
    this.botonesHabilitados = !this.botonesHabilitados;
  }

  toggleBotonesGrupo() {
    this.botonesHabilitadosGrupo = !this.botonesHabilitadosGrupo;
  }

  cancelar() {
    this.location.back(); 
  }

  deleteFecha(fecha: Fecha): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar la fecha ${fecha.nombreFecha} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.fechaService.delete(fecha.idFecha).subscribe(
          response => {
            this.fechas = this.fechas.filter(p => p!==fecha)
            swalWithBootstrapButtons.fire(
              'Fecha Eliminada!',
              `Fecha ${fecha.nombreFecha} eliminada con exito..!`,
              'success'
            )
          }
        )
  
      }
    });
  }
  deleteGrupo(grupo: Grupo): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar el grupo ${grupo.nombreGrupo} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoService.delete(grupo.idGrupo).subscribe(
          response => {
            this.grupos = this.grupos.filter(p => p!==grupo)
            swalWithBootstrapButtons.fire(
              'Grupo Eliminado!',
              `Grupo ${grupo.nombreGrupo} eliminado con exito..!`,
              'success'
            )
          }
        )
  
      }
    });
  }



}
