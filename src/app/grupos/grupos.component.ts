import { Component } from '@angular/core';
import { Grupo } from './grupo';
import { GrupoService } from './grupo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html'
})
export class GruposComponent {

  
  grupos : Grupo[];

  constructor(private grupoService: GrupoService){}

  ngOnInit():void {
    this.grupoService.getGrupos().subscribe(
      p => this.grupos = p  
    );
  }
  delete(grupo: Grupo): void{
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
