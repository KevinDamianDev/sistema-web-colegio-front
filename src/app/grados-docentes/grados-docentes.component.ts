import { Component } from '@angular/core';
import { Grado } from '../grupos/grado';
import { GradoService } from '../grupos/grado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-grados-docentes',
  templateUrl: './grados-docentes.component.html',
  styleUrls: ['./grados-docentes.component.css']
})
export class GradosDocentesComponent {

  docenteId: number | null = null;
  periodoId: number | null = null;

    grados: Grado[] = [];
  
    //selectedDocenteId: number | null = null;
  
    constructor(private gradoService: GradoService,
      private router: Router,
      private activate: ActivatedRoute) { }
  
   
  
      ngOnInit(): void {
        this.obtenerParametros();
        this.obtenerGrados();
      }

 
        seleccionarGrado(grado: Grado) {
          console.log('grado seleccionado:', grado.nombreGrado);
         
         if(this.docenteId!=null && this.periodoId!=null && grado!=null  ){

          this.router.navigate(['/cursosgrados'], {
            queryParams: { docenteId: this.docenteId, gradoId:grado.idGrado, periodoId: this.periodoId }
          });
          }
        }


      obtenerParametros(): void {
        this.activate.queryParams.subscribe(params => {
          this.docenteId = params['docenteId'] ? Number(params['docenteId']) : null;
          this.periodoId = params['periodoId'] ? Number(params['periodoId']) : null;
    
          console.log('ID del docente:', this.docenteId);
          console.log('ID del período:', this.periodoId);
        });
      }




      obtenerGrados(): void {
        this.gradoService.getGradosPersonaPeriodo(this.docenteId!, this.periodoId!).subscribe(
          (data) => {
            this.grados = data;
            console.log('Grados obtenidos:', this.grados);
          },
          (error) => {
            console.error('Error al obtener los grados', error);
          }
        );
      }

}
