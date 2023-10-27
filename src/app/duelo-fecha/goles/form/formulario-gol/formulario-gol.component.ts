import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goles } from 'src/app/duelo-fecha/detalle/goles';
import { Duelo } from 'src/app/duelos/duelo';
import { DueloService } from 'src/app/duelos/duelo.service';
import { Equipo } from 'src/app/equipos/equipo';
import { EquipoService } from 'src/app/equipos/equipo.service';
import { EquipoJugador } from 'src/app/jugadores/equipo-jugador';
import { JugadorService } from 'src/app/jugadores/jugador.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-gol',
  templateUrl: './formulario-gol.component.html'
})
export class FormularioGolComponent {

  duelo: Duelo;
  equipo: Equipo;
  public goles: Goles = new Goles();

  nombreEquipo: string;
  equipoJugadores: EquipoJugador[];
  public titulo: string = 'Registro de marcadores'

  constructor(
    private activate: ActivatedRoute, 
    private dueloservice: DueloService, 
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private location: Location ){}

    ngOnInit(): void {
      this.cargarDuelo();
      this.cargarEquipo();
      this.cargarGol();
      this.cargarEquipoJugador();
      
    }

    cargarGol(): void{
      this.activate.params.subscribe((params) => {
        const idGol = params['id'];     
        if(idGol){
          //console.log('idGol:' + idGol)
          this.dueloservice.getGol(idGol).subscribe({
            next:(value: any)=>{
              this.goles = value;
            }
          })
        }
      })
    }


  cargarDuelo(): void{
    this.activate.params.subscribe((params) => {
      const idDuelo = params['idDuelo'];
     // console.log('duelo:' + idDuelo)
      if(idDuelo){
        this.dueloservice.getDuelo(idDuelo).subscribe({
          next:(value: any)=>{
            this.duelo = value;
            //this.nombreDuelo = this.duelo.nombreDuelo;
           // this.idDuelo = this.duelo.idDuelo;
            //console.log('this.goles::: --> ', JSON.stringify(this.goles, null, 2));
          }
        })
      }
    })
  }

  cargarEquipo(): void{
    this.activate.params.subscribe((params) => {
      const idEquipo = params['idEquipo'];
      //console.log('idEquipo:' + idEquipo)
      if(idEquipo){
        this.equipoService.getEquipo(idEquipo).subscribe({
          next:(value: any)=>{
            this.equipo = value;
            this.nombreEquipo = this.equipo.nombreEquipo;
           // this.idDuelo = this.duelo.idDuelo;
            //console.log('this.goles::: --> ', JSON.stringify(this.goles, null, 2));
          }
        })
      }
    })
  }

  compararEquipoJugador(o1:EquipoJugador, o2: EquipoJugador){
    if(o1===undefined && o2===undefined){
      return true; 
    }
      return o1==null || o2==null?false: o1.idEquipoJugador===o2.idEquipoJugador;
  }


  // CARGA LOS EQUIPOS JUGADORES DE UN EQUIPO
  cargarEquipoJugador(): void{
    this.activate.params.subscribe((params) => {
      const idEquipo = params['idEquipo'];
      if(idEquipo){
        this.jugadorService.getEquiposJugadoresByEquipo(idEquipo).subscribe({
          next:(value: any)=>{
            this.equipoJugadores = value;
            //console.log('this.equipoJugador::: --> ', JSON.stringify(this.equipoJugadores, null, 2));
          }
        })
      }
    })
  }


  public create(): void{
    this.goles.duelo = this.duelo;
    this.dueloservice.createGol(this.goles).subscribe(
      json =>{
        //this.router.navigate(['/eventos'])
        this.regresar();
        Swal.fire('Nuevo Marcador', `Registro ha sido creado con éxito! `, 'success')
      } 
    )
  }


  update(): void{
    this.dueloservice.updateGol(this.goles)
    .subscribe(p =>{
      this.regresar();
     // this.router.navigate(['/eventos'])
      Swal.fire('Actualizado', `Registro ha sido actualizado con éxito! `, 'success')

    }
 ) }

 regresar() {
  this.location.back(); // Esto navegará hacia atrás en la historia de navegación
}







}
