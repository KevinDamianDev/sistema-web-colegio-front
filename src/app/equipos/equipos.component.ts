import { Component } from '@angular/core';
import { Equipo } from './equipo';
import { EquipoService } from './equipo.service';
import Swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';
@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent {

  equipos : Equipo[];
  equipoSeleccionado: Equipo;

  constructor(private equipoService: EquipoService,
    private modalService: ModalService){}

  ngOnInit():void {
    this.equipoService.getEquipos().subscribe(
      p => this.equipos = p  
    );

    this.modalService.notifica.subscribe(e =>{
      this.equipos = this.equipos.map(eO =>{
        if(e.idEquipo == eO.idEquipo){
          eO.foto = e.foto;
        }
        return eO;
      })
    })
  }

  delete(equipo: Equipo): void{
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
        this.equipoService.delete(equipo.idEquipo).subscribe(
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
  

}
