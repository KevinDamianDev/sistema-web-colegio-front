import { Component } from '@angular/core';
import { Categoria } from '../../categoria';
import { CategoriaService } from '../../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent {

  titulo: string = 'Registro de categorias.'
  public categoria: Categoria = new Categoria();


  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private activate: ActivatedRoute){}

    ngOnInit(): void {
      this.cargarCategoria();
      
    }

    cargarCategoria():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.categoriaService.getCategoria(id).subscribe(
            (categoria) => this.categoria = categoria)
          }
      })
    }

    public create(): void{
      this.categoriaService.create(this.categoria).subscribe(
        json =>{
          this.router.navigate(['/categorias'])
          Swal.fire('Nueva Categoria', `Categoria  ${json.categoria.nombreCategoria} ha sido creado con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.categoriaService.updateCategoria(this.categoria)
      .subscribe(p =>{
        this.router.navigate(['/categorias'])
        Swal.fire('Categoria actualizada', `Categoria  ${p.categoria.nombreCategoria} ha sido actualizada con éxito! `, 'success')
  
      }
   ) }

}
