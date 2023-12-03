import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import Swal from 'sweetalert2';
import { ReportesService } from '../reportes/reportes.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent {

  categorias: Categoria[] = [];

  paginatedCategorias: Categoria[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  ceil = Math.ceil;

  searchTerm: string = '';


  constructor(private categoriaService: CategoriaService, private reportesService: ReportesService){}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
        this.updatePaginatedCategorias();
      }
    );
  }

 /* descargar(categoria: number, tipo: string) {
    this.reportesService.descargarReporte(categoria, tipo).subscribe(data => {
      const blob = new Blob([data], { type: tipo === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      console.log('Error al descargar el archivo', error);
    });
  }*/

  descargar(categoria: number, tipo: string) {
    this.reportesService.descargarReporte(categoria, tipo).subscribe(data => {
      const blob = new Blob([data], { type: tipo === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
  
      // Crear un enlace y asignarle el URL del blob
      const link = document.createElement('a');
      link.href = url;
  
      // Asignar un nombre al archivo con la extensión correcta
      const fecha = new Date().toISOString().slice(0, 10);
      const extension = tipo === 'PDF' ? 'pdf' : 'xlsx'; // Usar 'xlsx' como extensión para Excel
      link.download = `Reporte-${categoria}-${fecha}.${extension}`;
  
      // Simular un clic en el enlace para iniciar la descarga y luego eliminar el enlace
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    }, error => {
      console.log('Error al descargar el archivo', error);
    });
  }
  
  

  search(): void {
    this.updatePaginatedCategorias();
  }

  updatePaginatedCategorias() {
    let filteredCategorias = this.categorias;
    if (this.searchTerm) {
      filteredCategorias = this.categorias.filter(categoria =>
        categoria.nombreCategoria.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredCategorias.length);
    this.paginatedCategorias = filteredCategorias.slice(startIndex, endIndex);
  }
  

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedCategorias();
  }

  
  delete(categoria: Categoria): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar la categoria ${categoria.nombreCategoria} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(categoria.idCategoria).subscribe(
          response => {
            this.paginatedCategorias = this.paginatedCategorias.filter(p => p!==categoria)
            swalWithBootstrapButtons.fire(
              'Categoria Eliminada!',
              `Categoria ${categoria.nombreCategoria} eliminada con exito..!`,
              'success'
            )
          }
        )
  
      }
    });
  }

}
