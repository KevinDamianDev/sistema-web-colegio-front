import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Fase } from 'src/app/fases/curso';
//import { FasesService } from 'src/app/fases/cursos.service';
//import { Fecha } from 'src/app/fechas/fecha';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
//import { FechasService } from 'src/app/fechas/fechas.service';
import { AuthService } from 'src/app/personas/auth.service';
@Component({
  selector: 'app-detalle-evento-fecha',
  templateUrl: './detalle-evento-fecha.component.html'
})
export class DetalleEventoFechaComponent {
  /*constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private fechaService: FechasService, 
   // private grupoService: GrupoService,
    public auth: AuthService){}
  
//  public fase: Fase = new Fase();

  fechas : Fecha[];
  errores: string;
  erroresGrupo: string;
  //nombreEvento: string;
 // grupos: Grupo[];

  public checkboxSeleccionado: boolean = false;
  public botonesHabilitados: boolean = false;

  public checkboxSeleccionadoGrupo: boolean = false;
  public botonesHabilitadosGrupo: boolean = false;

  idEvento: number;

  ngOnInit(): void {

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
*/


}
