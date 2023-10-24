import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Fase } from './fase';
import { FasesService } from './fases.service';

@Component({
  selector: 'app-fases',
  templateUrl: './fases.component.html'
})
export class FasesComponent {

  fases : Fase[];

  constructor(private faseService: FasesService){}

  ngOnInit():void {
    this.faseService.getFases().subscribe(
      p => this.fases = p  
    );
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
