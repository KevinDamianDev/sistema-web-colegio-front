import { Component } from '@angular/core';
import { Persona } from '../personas/persona';
import { AlumnoService } from './alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html'
})
export class AlumnosComponent {

  personas: Persona[] = [];
  
    paginatedPersonas: Persona[] = [];
    currentPage = 1;
    itemsPerPage = 15;
    ceil = Math.ceil;
    searchTerm: string = '';
  
  
    constructor(private alumnoService: AlumnoService){}
  
    ngOnInit(): void {
      this.alumnoService.getAlumnos().subscribe(
        pers => {
          this.personas = pers;
          console.log('TAMAÑO DE PERSONAS', this.personas.length);
          this.updatePaginatedPersonas();
        }
      );
    }
  
    
    updatePaginatedPersonas() {
      let filteredPersonas = this.personas;
    
      if (this.searchTerm) {
        filteredPersonas = this.personas.filter(persona =>
          persona.dniPersona.toString().includes(this.searchTerm) // Convertimos el número a string
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
