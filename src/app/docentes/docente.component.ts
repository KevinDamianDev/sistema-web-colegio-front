import { Component, OnInit } from '@angular/core';
import { DocenteService } from './docente.service';
import { PeriodoService } from '../periodos/periodo.service';
import { Router } from '@angular/router';
import { Persona } from '../personas/persona';
import { Periodo } from '../periodos/periodo';
import { Modal } from 'bootstrap'; // Importa Bootstrap Modal

@Component({
  selector: 'app-docentes',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  
  personas: Persona[] = [];
  periodos: Periodo[] = [];
  paginatedPersonas: Persona[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  ceil = Math.ceil;
  searchTerm: string = '';
  selectedDocenteId: number | null = null;
  modalInstance: any; // Para manejar el modal de Bootstrap

  constructor(
    private docenteService: DocenteService,
    private router: Router,
    private periodoService: PeriodoService
  ) {}

  ngOnInit(): void {
    this.cargarDocentes();
    this.cargarPeriodos();
  }

  cargarDocentes(): void {
    this.docenteService.getDocentes().subscribe((pers) => {
      this.personas = pers;
      this.updatePaginatedPersonas();
    });
  }

  cargarPeriodos() {
    this.periodoService.getPeriodos().subscribe((data) => {
      this.periodos = data;
    });
  }

  openModal(docenteId: number) {
    this.selectedDocenteId = docenteId;

    // Obtiene el modal desde el DOM y lo inicializa con Bootstrap
    const modalElement = document.getElementById('periodoModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show(); // Muestra el modal correctamente
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide(); // Oculta el modal
    }
  }

  seleccionarPeriodo(periodo: Periodo) {
    console.log('Período seleccionado:', periodo.nombrePeriodo);
    this.closeModal();
    if (this.selectedDocenteId !== null) {
      this.router.navigate(['/docentegrados'], {
        queryParams: { docenteId: this.selectedDocenteId, periodoId: periodo.idPeriodo }
      });
    }
  }

  updatePaginatedPersonas() {
    let filteredPersonas = this.personas;

    if (this.searchTerm) {
      filteredPersonas = this.personas.filter(persona =>
        persona.dniPersona.toString().includes(this.searchTerm)
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
