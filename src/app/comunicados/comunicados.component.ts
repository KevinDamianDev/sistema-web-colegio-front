import { Component } from '@angular/core';
import { Comunicado } from './comunicado';
import { ComunicadoService } from './comunicado.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html'
})
export class ComunicadosComponent {

   comunicados: Comunicado[] = [];
   selectedComunicado: any = null;

    paginatedComunicados: Comunicado[] = [];
    currentPage = 1;
    itemsPerPage = 5;
    ceil = Math.ceil;
    searchTerm: string = '';
  
  
    constructor(private comunicadoService: ComunicadoService){}
  
    ngOnInit(): void {
      this.comunicadoService.getComunicados().subscribe(
        pers => {
          this.comunicados = pers;
          console.log('TAMAÑO DE PERSONAS', this.comunicados.length);
          this.updatePaginatedComunicados();
        }
      );
    }
    
    openModal(comunicado: Comunicado): void {
      this.selectedComunicado = comunicado;
    
      Swal.fire({
        title: comunicado.titulo,
        text: comunicado.descripcion,
        footer: `<small>Publicado: ${comunicado.fechaPublicacion}</small>`,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    }
    
    
    updatePaginatedComunicados() {
      let filteredComunicados = this.comunicados;
    
      if (this.searchTerm) {
        filteredComunicados = this.comunicados.filter(comu =>
          comu.titulo.toString().includes(this.searchTerm) // Convertimos el número a string
        );
      }
    
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, filteredComunicados.length);
      this.paginatedComunicados = filteredComunicados.slice(startIndex, endIndex);
    }
    
    changePage(newPage: number) {
      this.currentPage = newPage;
      this.updatePaginatedComunicados();
    }
  
  
    search(): void {
      this.updatePaginatedComunicados();
    }

     delete(comunicado: Comunicado): void {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            });
          
            swalWithBootstrapButtons.fire({
              title: '¿Estás seguro?',
              text: `¿Seguro que deseas eliminar el comunicado ${comunicado.titulo}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar!',
              cancelButtonText: 'No, cancelar!',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.comunicadoService.delete(comunicado.idComunicado).subscribe(response => {
                  
                  // Eliminar de la lista principal
                  this.comunicados = this.comunicados.filter(p => p !== comunicado);
                  
                  // Recalcular la paginación
                  this.updatePaginatedComunicados();
          
                  // Si la página actual está vacía después de la eliminación, retrocede una página
                  if (this.paginatedComunicados.length === 0 && this.currentPage > 1) {
                    this.currentPage--;
                    this.updatePaginatedComunicados();
                  }
          
                  // Mostrar mensaje de éxito
                  swalWithBootstrapButtons.fire(
                    'Comunicado Eliminado!',
                    `Comunicado ${comunicado.titulo} eliminado con éxito..!`,
                    'success'
                  );
                });
              }
            });
          }
          
  
}
