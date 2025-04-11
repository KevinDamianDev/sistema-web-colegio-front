import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Curso } from './curso';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html'
})
export class CursosComponent {

 cursos: Curso[] = [];
     
       paginatedCursos: Curso[] = [];
       currentPage = 1;
       itemsPerPage = 5;
       ceil = Math.ceil;
       searchTerm: string = ''; 
     
     
       constructor(private cursoService: CursosService){}
     
       ngOnInit(): void {
         this.cursoService.getCursos().subscribe(
           pers => {
             this.cursos = pers;
             console.log('TAMAÑO DE CURSOS', this.cursos.length);
             this.updatePaginatedCursos();
           }
         );
       }
     
       
       updatePaginatedCursos() {
         let filteredCursos = this.cursos;
 
         if (this.searchTerm.trim() !== '') { //  Evitar búsquedas vacías
             const term = this.searchTerm.toLowerCase(); // Convertir todo a minúsculas
             filteredCursos = this.cursos.filter(curso =>
                 curso.nombreCurso.toLowerCase().includes(term) // Comparar en minúsculas
             );
         }
 
         const startIndex = (this.currentPage - 1) * this.itemsPerPage;
         const endIndex = Math.min(startIndex + this.itemsPerPage, filteredCursos.length);
         this.paginatedCursos = filteredCursos.slice(startIndex, endIndex);
     }
       
       changePage(newPage: number) {
         this.currentPage = newPage;
         this.updatePaginatedCursos();
       }
     
     
       search(): void {
         this.updatePaginatedCursos();
       }
   
 
       delete(curso: Curso): void {
         const swalWithBootstrapButtons = Swal.mixin({
           customClass: {
             confirmButton: 'btn btn-success',
             cancelButton: 'btn btn-danger'
           },
           buttonsStyling: false
         });
       
         swalWithBootstrapButtons.fire({
           title: '¿Estás seguro?',
           text: `¿Seguro que deseas eliminar el curso ${curso.nombreCurso}?`,
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: 'Sí, eliminar!',
           cancelButtonText: 'No, cancelar!',
           reverseButtons: true
         }).then((result) => {
           if (result.isConfirmed) {
             this.cursoService.delete(curso.idCurso).subscribe(response => {
               
               // Eliminar el grado de la lista principal
               this.cursos = this.cursos.filter(p => p !== curso);
               
               // Recalcular la paginación
               this.updatePaginatedCursos();
       
               // Si la página actual está vacía después de la eliminación, retrocede una página
               if (this.paginatedCursos.length === 0 && this.currentPage > 1) {
                 this.currentPage--;
                 this.updatePaginatedCursos();
               }
       
               // Mostrar mensaje de éxito
               swalWithBootstrapButtons.fire(
                 'Curso Eliminado!',
                 `Curso ${curso.nombreCurso} eliminado con éxito..!`,
                 'success'
               );
             });
           }
         });
       }
       
 


}
