import { Component } from '@angular/core';
import { EquipoEstadistica } from '../equipo-estadistica';
import { ModalEstadisticaService } from './modal-estadistica.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GrupoService } from 'src/app/grupos/grupo.service';
import { Grupo } from 'src/app/grupos/grupo';
import { FasesService } from 'src/app/fases/fases.service';
import { Fase } from 'src/app/fases/fase';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalle-estadistica',
  templateUrl: './detalle-estadistica.component.html'
})
export class DetalleEstadisticaComponent {

  equipoEstadistica: EquipoEstadistica[];
  mensajeError: string;
  estadistica: EquipoEstadistica;
  grupo: Grupo;
  idGrupo: number;
  titulo: string = 'Actualización de estadisticas.'
  fase: Fase;
  idFase: number;
  ruta: string;

  constructor(private activate: ActivatedRoute,  private location: Location,private estadisticaService: ModalEstadisticaService,
    private grupoService: GrupoService, private router: Router, private faseService: FasesService ){}

  ngOnInit(): void {
   // this.cargaEstadisticaByEquipo();
   this.cargarEstadistica();
   this.cargarGrupo();
   this.cargarFase();
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

 cargarGrupo(): void{
  this.activate.params.subscribe((params) => {
    const idGrupo = params['idGrupo']; 
    console.log('idGrupo:  '+ idGrupo)   
    if(idGrupo){
      this.grupoService.getGrupo(idGrupo).subscribe(
        (g)=>{
          this.grupo = g;
          this.idGrupo = this.grupo.idGrupo;
        }
      )
    }

  })
}

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
}

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







