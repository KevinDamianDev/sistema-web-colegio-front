import { Component } from '@angular/core';
import Swal from 'sweetalert2';
//import { Fase } from '../../curso';
import { Evento } from 'src/app/evento/evento';
import { EventoService } from 'src/app/evento/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { FasesService } from '../../cursos.service';
import { Location } from '@angular/common';
import { Curso } from '../../curso';
import { CursosService } from '../../cursos.service';
import { AuthService } from 'src/app/personas/auth.service';
@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html'
})
export class CursoFormComponent {

    titulo: string = 'Registro de cursos'
    public curso: Curso = new Curso();
    //fases: Fase[];
    //faseExiste: Fase;
   // nombreFase: string;
   // idFaseExiste: number;
    ngOnInit(): void {
      this.cargarCurso();
     // this.cargarFase();
      //this.faseService.getFases().subscribe(ca=>this.fases=ca);
    }
  
    constructor(private cursoService: CursosService,
      private router: Router,
      private activate: ActivatedRoute,  public auth: AuthService){}
  
 
      cargarCurso():void{
        this.activate.params.subscribe(params =>{
          var id =  params['id']
          if(id){
            this.cursoService.getCurso(id).subscribe(
              (e) => this.curso = e)
            }
        })
      }
      public create(): void{
        this.cursoService.create(this.curso).subscribe(
          json =>{
            Swal.fire('Nuevo Curso', `Curso  ${json.curso.nombreCurso} ha sido creado con éxito! `, 'success')
            this.router.navigate(['/cursos'])
            
          } 
        )
      }
    
    
      update(): void{
        this.cursoService.updateCurso(this.curso)
        .subscribe(p =>{
          this.router.navigate(['/cursos' ])
          Swal.fire('Curso actualizado', `Curso  ${p.curso.nombreCurso} ha sido actualizado con éxito! `, 'success')
    
        }
     ) }


}
