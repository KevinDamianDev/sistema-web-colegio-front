import { Component } from '@angular/core';
import { Categoria } from '../categorias/categoria';
import { CategoriaService } from '../categorias/categoria.service';
import { ReportesService } from './reportes.service';
import { Evento } from '../evento/evento';
import { EventoService } from '../evento/evento.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'
})
export class ReportesComponent {

  categorias: Categoria[];
  categoriaSeleccionada: Categoria;

  eventos: Evento[];
  eventoSeleccionado: Evento;


  constructor(
    private categoriaService: CategoriaService,
    private reportesService: ReportesService,
    private eventoService: EventoService){}

    ngOnInit(): void {     
      this.categoriaService.getCategorias().subscribe(ca=>this.categorias=ca);
      this.eventoService.getEventos().subscribe(ev=>this.eventos=ev);
    }

      // OPCIONES REPORTE 1
      public checkboxSeleccionado: boolean = false;
      public botonesHabilitados: boolean = false;

      // OPCIONES REPORTE 2
      public checkboxSeleccionadoReporte2: boolean = false;
      public botonesHabilitadosReporte2: boolean = false;

      // OPCIONES REPORTE 3
      public checkboxSeleccionadoReporte3: boolean = false;
      public botonesHabilitadosReporte3: boolean = false;

      toggleBotones() {
        this.botonesHabilitados = !this.botonesHabilitados;
      }

      toggleBotonesReporte2() {
        this.botonesHabilitadosReporte2 = !this.botonesHabilitadosReporte2;
      }

      toggleBotonesReporte3() {
        this.botonesHabilitadosReporte3 = !this.botonesHabilitadosReporte3;
      }
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

      descargarReporte1(evento: number, tipo: string) {
        this.reportesService.descargarReporteEquiposByEvento(evento, tipo).subscribe(data => {
          const blob = new Blob([data], { type: tipo === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
      
          // Crear un enlace y asignarle el URL del blob
          const link = document.createElement('a');
          link.href = url;
      
          // Asignar un nombre al archivo con la extensión correcta
          const fecha = new Date().toISOString().slice(0, 10);
          const extension = tipo === 'PDF' ? 'pdf' : 'xlsx'; // Usar 'xlsx' como extensión para Excel
          link.download = `Reporte-${evento}-${fecha}.${extension}`;
      
          // Simular un clic en el enlace para iniciar la descarga y luego eliminar el enlace
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        }, error => {
          console.log('Error al descargar el archivo', error);
        });
      }

      descargarReporte3(categoria: number, tipo: string) {
        this.reportesService.descargarReporteJugadoresByCategoria(categoria, tipo).subscribe(data => {
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
}
