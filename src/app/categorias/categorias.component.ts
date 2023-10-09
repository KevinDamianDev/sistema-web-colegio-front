import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent {

  categorias : Categoria[];

  constructor(private categoriaService: CategoriaService){}


  ngOnInit():void {
    this.categoriaService.getCategorias().subscribe(
      p => this.categorias = p  
    );
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
            this.categorias = this.categorias.filter(p => p!==categoria)
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
