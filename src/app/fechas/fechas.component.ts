import { Component } from '@angular/core';
import { Fecha } from './fecha';
import { FechasService } from './fechas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html'
})
export class FechasComponent {

  fechas : Fecha[];

  constructor(private fechaService: FechasService){}

  ngOnInit():void {
    this.fechaService.getFechas().subscribe(
      p => this.fechas = p  
    );
  }
  delete(fecha: Fecha): void{
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

}
