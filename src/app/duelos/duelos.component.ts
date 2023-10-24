import { Component } from '@angular/core';
import { Duelo } from './duelo';
import { DueloService } from './duelo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-duelos',
  templateUrl: './duelos.component.html'
})
export class DuelosComponent {
  duelos : Duelo[];

  constructor(private dueloService: DueloService){}
  ngOnInit():void {
    this.dueloService.getDuelos().subscribe(
      p => this.duelos = p  
    );
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
  }
}
