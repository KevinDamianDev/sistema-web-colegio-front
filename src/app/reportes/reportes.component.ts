import { Component } from '@angular/core';
import { Categoria } from '../categorias/categoria';
import { CategoriaService } from '../categorias/categoria.service';
import { ReportesService } from './reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  categorias: Categoria[];
  categoriaSeleccionada: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private reportesService: ReportesService){}

    ngOnInit(): void {     
      this.categoriaService.getCategorias().subscribe(ca=>this.categorias=ca);
    }

      // OPCIONES FASES
      public checkboxSeleccionado: boolean = false;
      public botonesHabilitados: boolean = false;

      toggleBotones() {
        this.botonesHabilitados = !this.botonesHabilitados;
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
}
