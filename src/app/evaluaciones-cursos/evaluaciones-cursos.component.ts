import { Component } from '@angular/core';
import { Evaluacion } from './evaluacion';
import { EvaluacionServiceService } from './evaluacion-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluaciones-cursos',
  templateUrl: './evaluaciones-cursos.component.html',
  styleUrls: ['./evaluaciones-cursos.component.css']
})
export class EvaluacionesCursosComponent {
  docenteId: number | null = null;
  periodoId: number | null = null;
  gradoId: number | null = null;
  cursoId: number | null = null;

    evaluaciones: Evaluacion[] = [];
  
    //selectedDocenteId: number | null = null;
  
    constructor(private evaluacionservice: EvaluacionServiceService,
      private router: Router,
      private activate: ActivatedRoute) { }
  
   
  
      ngOnInit(): void {
        this.obtenerParametros();
        this.obtenerEvaluaciones();
      }

 
       /* seleccionarGrado(grado: Grado) {
          console.log('grado seleccionado:', grado.nombreGrado);
         
         if(this.docenteId!=null && this.periodoId!=null && grado!=null  ){

          this.router.navigate(['/cursosgrados'], {
            queryParams: { docenteId: this.docenteId, gradoId:grado.idGrado, periodoId: this.periodoId }
          });
          }
        }*/


      obtenerParametros(): void {
        this.activate.queryParams.subscribe(params => {
          this.docenteId = params['docenteId'] ? Number(params['docenteId']) : null;
          this.periodoId = params['periodoId'] ? Number(params['periodoId']) : null;
          this.gradoId = params['gradoId'] ? Number(params['gradoId']) : null;
          this.cursoId = params['cursoId'] ? Number(params['cursoId']) : null;
    
         // console.log('ID del docente:', this.docenteId);
          //console.log('ID del período:', this.periodoId);
        });
      }




      obtenerEvaluaciones(): void {
        this.evaluacionservice.getEvaluacionesCursoPersonaPeriodoGrado(this.docenteId!, this.gradoId!, this.periodoId!, this.cursoId!).subscribe(
          (data) => {
            this.evaluaciones = data;
            //console.log('Grados obtenidos:', this.grados);
          },
          (error) => {
            console.error('Error al obtener las evaluaciones', error);
          }
        );
      }
}
