import { Component } from '@angular/core';
import { Periodo } from './periodo';
import { PeriodoService } from './periodo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html'
})
export class PeriodosComponent {

    periodos: Periodo[] = [];
      
        paginatedPeriodos: Periodo[] = [];
        currentPage = 1;
        itemsPerPage = 5;
        ceil = Math.ceil;
        searchTerm: string = ''; 
      
      
      constructor(private periodoService: PeriodoService){}
      
        ngOnInit(): void {
          this.periodoService.getPeriodos().subscribe(
            pers => {
              this.periodos = pers;
             // console.log('TAMAÑO DE grados', this.grados.length);
              this.updatePaginatedPeriodos();
            }
          );
        }
      
        
        updatePaginatedPeriodos() {
          let filteredPeriodos = this.periodos;
  
          if (this.searchTerm.trim() !== '') { //  Evitar búsquedas vacías
              const term = this.searchTerm.toLowerCase(); // Convertir todo a minúsculas
              filteredPeriodos = this.periodos.filter(perio =>
                  perio.nombrePeriodo.toLowerCase().includes(term) // Comparar en minúsculas
              );
          }
  
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = Math.min(startIndex + this.itemsPerPage, filteredPeriodos.length);
          this.paginatedPeriodos = filteredPeriodos.slice(startIndex, endIndex);
      }
        
        changePage(newPage: number) {
          this.currentPage = newPage;
          this.updatePaginatedPeriodos();
        }
      
      
        search(): void {
          this.updatePaginatedPeriodos();
        }
    

  
       /* delete(periodo: Periodo): void {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
        
          swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: `¿Seguro que deseas eliminar el periodo ${periodo.nombrePeriodo}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.periodoService.delete(periodo.idPeriodo).subscribe(response => {
                
                // Eliminar el grado de la lista principal
                this.periodos = this.periodos.filter(p => p !== periodo);
                
                // Recalcular la paginación
                this.updatePaginatedPeriodos();
        
                // Si la página actual está vacía después de la eliminación, retrocede una página
                if (this.paginatedPeriodos.length === 0 && this.currentPage > 1) {
                  this.currentPage--;
                  this.updatePaginatedPeriodos();
                }
        
                // Mostrar mensaje de éxito
                swalWithBootstrapButtons.fire(
                  'Periodo Eliminado!',
                  `Periodo ${periodo.nombrePeriodo} eliminado con éxito..!`,
                  'success'
                );
              });
            }
          });
        }*/

          delete(periodo: Periodo): void {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            });
          
            swalWithBootstrapButtons.fire({
              title: '¿Estás seguro?',
              text: `¿Seguro que deseas eliminar el periodo ${periodo.nombrePeriodo}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar!',
              cancelButtonText: 'No, cancelar!',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.periodoService.delete(periodo.idPeriodo).subscribe({
                  next: () => {
                    // Eliminar el periodo de la lista principal
                    this.periodos = this.periodos.filter(p => p !== periodo);
                    
                    // Recalcular la paginación
                    this.updatePaginatedPeriodos();
            
                    // Si la página actual está vacía después de la eliminación, retrocede una página
                    if (this.paginatedPeriodos.length === 0 && this.currentPage > 1) {
                      this.currentPage--;
                      this.updatePaginatedPeriodos();
                    }
            
                    // Mostrar mensaje de éxito
                    swalWithBootstrapButtons.fire(
                      'Periodo Eliminado!',
                      `Periodo ${periodo.nombrePeriodo} eliminado con éxito..!`,
                      'success'
                    );
                  },
                  error: (err) => {
                    console.error('Error al eliminar el período:', err);
                    
                    let errorMessage = 'No se pudo eliminar el periodo. Inténtalo de nuevo.';
                    
                    // Extraer mensaje del servidor si está disponible
                    if (err.error && err.error.mensaje) {
                      errorMessage = err.error.mensaje;
                    } else if (err.error && err.error.error) {
                      errorMessage = err.error.error;
                    }
          
                    // Mostrar mensaje de error con SweetAlert
                    Swal.fire({
                      title: 'Error al eliminar',
                      text: errorMessage,
                      icon: 'error'
                    });
                  }
                });
              }
            });
          }
          
        

}
