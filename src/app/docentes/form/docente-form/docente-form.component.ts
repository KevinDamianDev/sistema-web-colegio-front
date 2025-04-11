import { Component } from '@angular/core';
import { Docente } from '../../docente';
import { DocenteService } from '../../docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/personas/auth.service';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html'
})
export class DocenteFormComponent {

  titulo: string = 'Registro de Docentes.'
  public docente: Docente = new Docente();


  constructor(private docenteService: DocenteService,
    private router: Router,
    private activate: ActivatedRoute,
    public auth: AuthService){}

  /*  ngOnInit(): void {
      this.cargarCategoria();
      
    }*/
/*
    cargarCategoria():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.categoriaService.getCategoria(id).subscribe(
            (categoria) => this.categoria = categoria)
          }
      })
    }*/

   /* public create(): void{
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
   ) }*/

}
