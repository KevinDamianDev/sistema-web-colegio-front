import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Grado } from './grado';
import { GradoService } from './grado.service';
import { RouterModule } from '@angular/router'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grado',
 // standalone: true,
//imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './grado.component.html'
})
export class GradoComponent {

    grados: Grado[] = [];
    
      paginatedGrados: Grado[] = [];
      currentPage = 1;
      itemsPerPage = 5;
      ceil = Math.ceil;
      searchTerm: string = ''; 
    
    
      constructor(private gradoserv: GradoService){}
    
      ngOnInit(): void {
        this.gradoserv.getGrados().subscribe(
          pers => {
            this.grados = pers;
            console.log('TAMAÑO DE grados', this.grados.length);
            this.updatePaginatedGrados();
          }
        );
      }
    
      
      updatePaginatedGrados() {
        let filteredGrados = this.grados;

        if (this.searchTerm.trim() !== '') { //  Evitar búsquedas vacías
            const term = this.searchTerm.toLowerCase(); // Convertir todo a minúsculas
            filteredGrados = this.grados.filter(grado =>
                grado.nombreGrado.toLowerCase().includes(term) // Comparar en minúsculas
            );
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, filteredGrados.length);
        this.paginatedGrados = filteredGrados.slice(startIndex, endIndex);
    }
      
      changePage(newPage: number) {
        this.currentPage = newPage;
        this.updatePaginatedGrados();
      }
    
    
      search(): void {
        this.updatePaginatedGrados();
      }
  
 /* delete(grado: Grado): void{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    
      swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: `¿Seguro que deseas eliminar el grado ${grado.nombreGrado} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.gradoserv.delete(grado.idGrado).subscribe(
            response => {
              this.paginatedGrados = this.paginatedGrados.filter(p => p!==grado)
              swalWithBootstrapButtons.fire(
                'Grado Eliminado!',
                `Grado ${grado.nombreGrado} eliminado con exito..!`, 
                'success'
              )
            }
          )
    
        }
      });
    }*/

      delete(grado: Grado): void {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
      
        swalWithBootstrapButtons.fire({
          title: '¿Estás seguro?',
          text: `¿Seguro que deseas eliminar el grado ${grado.nombreGrado}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.gradoserv.delete(grado.idGrado).subscribe(response => {
              
              // Eliminar el grado de la lista principal
              this.grados = this.grados.filter(p => p !== grado);
              
              // Recalcular la paginación
              this.updatePaginatedGrados();
      
              // Si la página actual está vacía después de la eliminación, retrocede una página
              if (this.paginatedGrados.length === 0 && this.currentPage > 1) {
                this.currentPage--;
                this.updatePaginatedGrados();
              }
      
              // Mostrar mensaje de éxito
              swalWithBootstrapButtons.fire(
                'Grado Eliminado!',
                `Grado ${grado.nombreGrado} eliminado con éxito..!`,
                'success'
              );
            });
          }
        });
      }
      










  }


