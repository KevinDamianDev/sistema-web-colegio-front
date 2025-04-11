import { Component } from '@angular/core';
import { EquipoEstadistica } from '../equipo-estadistica';
import { ModalEstadisticaService } from './modal-estadistica.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { FasesService } from 'src/app/fases/cursos.service';
//import { Fase } from 'src/app/fases/curso';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalle-estadistica',
  templateUrl: './detalle-estadistica.component.html'
})
export class DetalleEstadisticaComponent {

  equipoEstadistica: EquipoEstadistica[];
  mensajeError: string;
  estadistica: EquipoEstadistica;
  idGrupo: number;
  titulo: string = 'Actualización de estadisticas.'
 // fase: Fase;
  idFase: number;
  ruta: string;

  constructor(private activate: ActivatedRoute,  private location: Location,private estadisticaService: ModalEstadisticaService,
     private router: Router){}

  ngOnInit(): void {
   // this.cargaEstadisticaByEquipo();
   this.cargarEstadistica();
  // this.cargarFase();
  }

  cargarEstadistica():void{
    this.activate.params.subscribe(params =>{
      var id =  params['id']
      console.log('idEstadistica:  '+ id)   
      if(id){
        this.estadisticaService.getEquipoEstadistica(id).subscribe(
          (value)=>{
            this.estadistica = value;
            console.log(' estadistica  ::::'+JSON.stringify(this.estadistica, null, 2));
          }
        );
        }
    })
  }

  cancelar() {
    this.location.back(); // Esto navegará hacia atrás en la historia de navegación
  }

  updateEstadistica(): void{
    this.estadisticaService.updateEquipoEstadistica(this.estadistica)
    .subscribe(p =>{
     // this.ruta = `/equiposGrupo;idFase=${this.idFase};idGrupo=${this.idGrupo}`;
      this.cancelar();
      //this.router.navigate([this.ruta])
      //[routerLink]="['/equiposGrupo', { idFase: fase.idFase, idGrupo: grupo.idGrupo }]"
      Swal.fire('Estadistica actualizada', `Las estadisticas se han actualizado con éxito! `, 'success')

    }
 )
 }


/*
cargarFase(): void{
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];    
    console.log('idFase:  '+ idFase)
    if(idFase){
      this.faseService.getFase(idFase).subscribe(
        (f)=>{
          this.fase = f;
          this.idFase = this.fase.idFase;
        }
      )
    }

  })
}*/

 /* cargaEstadisticaByEquipo(): void{
    this.route.params.subscribe((params) => {
      const idEquipoGrupo = params['id'];    
      console.log('idEquipoGrupo' + idEquipoGrupo)

      if(idEquipoGrupo){
        this.estadisticaService.getEstadisticaByEquipo(idEquipoGrupo).subscribe({
          next: (value: any) =>{
            this.equipoEstadistica = value;
            console.log(' equipoEstadistica  ::::'+JSON.stringify(this.equipoEstadistica, null, 2));
          },
          error: (error: any) =>{
            this.mensajeError = error.error.mensaje;
            console.log('mensajeError:::' + this.mensajeError)
          }
        });
      }
    })
  }*/

  }







