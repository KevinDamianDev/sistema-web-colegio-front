import { Component } from '@angular/core';
import { Curso } from '../fases/curso';
import { CursosService } from '../fases/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../personas/persona.service';
import { Persona } from '../personas/persona';

@Component({
  selector: 'app-cursos-grados',
  templateUrl: './cursos-grados.component.html',
  styleUrls: ['./cursos-grados.component.css']
})
export class CursosGradosComponent {


  docenteId: number | null = null;
  gradoId: number | null = null;
  periodoId: number | null = null;

  cursos: Curso[] = [];

  personas: Persona[] = [];


  constructor(private cursoService: CursosService, private personaService: PersonaService, private router: Router,
    private activate: ActivatedRoute) { }


  ngOnInit(): void {
    this.obtenerParametros();
    this.obtenerCursos();
    this.obtenerAlumnos();
  }




  /*    seleccionarGrado(grado: Grado) {
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
      this.gradoId = params['gradoId'] ? Number(params['gradoId']) : null;
      this.periodoId = params['periodoId'] ? Number(params['periodoId']) : null;

      console.log('ID del docente:', this.docenteId);
      console.log('ID del grado:', this.gradoId);
      console.log('ID del período:', this.periodoId);
    });
  }




  obtenerCursos(): void {
    this.cursoService.getCursosPersonaPeriodoGrado(this.docenteId!, this.gradoId!, this.periodoId!).subscribe(
      (data) => {
        this.cursos = data;
        console.log('Cursos obtenidos:', this.cursos);
      },
      (error) => {
        console.error('Error al obtener los cursos', error);
      }
    );
  }


  obtenerAlumnos(): void {
    this.personaService.getAlumnosPersonaPeriodoGrado(this.docenteId!, this.gradoId!, this.periodoId!).subscribe(
      (data) => {
        this.personas = data;
        this.updatePaginatedPersonas();
        console.log('Alumnos obtenidos:', this.personas);
      },
      (error) => {
        console.error('Error al obtener los alumnos', error);
      }
    );
  }

  seleccionarCurso(curso: Curso) {
    // console.log('curso seleccionado:', grado.nombreGrado);

    if (this.docenteId != null && this.periodoId != null && this.gradoId != null) {

      this.router.navigate(['/evaluacioncurso'], {
        queryParams: { docenteId: this.docenteId, gradoId: this.gradoId, periodoId: this.periodoId, cursoId: curso.idCurso }
      });
    }
  }



  paginatedPersonas: Persona[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  ceil = Math.ceil;
  searchTerm: string = '';

  updatePaginatedPersonas() {
    let filteredPersonas = this.personas;
    if (this.searchTerm) {
      filteredPersonas = this.personas.filter(persona =>
        persona.apellidosPersonas.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredPersonas.length);
    this.paginatedPersonas = filteredPersonas.slice(startIndex, endIndex);
  }
  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedPersonas();
  }


  search(): void {
    this.updatePaginatedPersonas();
  }


}
