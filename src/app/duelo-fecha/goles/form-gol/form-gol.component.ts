import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignarEquipoGrupoService } from 'src/app/asignar-equipos/asignar-equipo-grupo.service';
import { EquipoGrupoDuelo } from 'src/app/asignar-equipos/equipo-grupo-duelo';
import { Duelo } from 'src/app/duelos/duelo';
import { DueloService } from 'src/app/duelos/duelo.service';
import { Equipo } from 'src/app/equipos/equipo';
import { EquipoJugador } from 'src/app/jugadores/equipo-jugador';
import { JugadorService } from 'src/app/jugadores/jugador.service';
import { Goles } from '../../detalle/goles';
import Swal from 'sweetalert2';
import { ModalJugadorServiceService } from 'src/app/jugadores/detalle/detalle-jugador/modal-jugador-service.service';
@Component({
  selector: 'app-form-gol',
  templateUrl: './form-gol.component.html',
  styleUrls: ['./form-gol.component.css']
})
export class FormGolComponent {

  equipoGrupoDuelos: EquipoGrupoDuelo[];
  mensaje: string;
  goles: Goles[] = [];
  duelo: Duelo;

  nombreDuelo: string;
  idDuelo: number;
  
  constructor(
    public modalService: ModalJugadorServiceService,
    private dueloService: DueloService, 
    private activate: ActivatedRoute, 
  ){}

  ngOnInit(): void {
    this.cargarDuelo();

  }

  cargarDuelo(): void{
    this.activate.params.subscribe((params) => {
      const idDuelo = params['idDuelo'];
      if(idDuelo){
        this.dueloService.getDuelo(idDuelo).subscribe({
          next:(value: any)=>{
            this.duelo = value;
            this.nombreDuelo = this.duelo.nombreDuelo;
            this.idDuelo = this.duelo.idDuelo;
            this.cargarEquipoGrupoDueloByDuelo();
            //console.log('this.goles::: --> ', JSON.stringify(this.goles, null, 2));
          }
        })
      }
    })
  }



  // CARGO EQUIPOS_GRUPOS POR DUELO
  cargarEquipoGrupoDueloByDuelo(): void{
    if(this.idDuelo){
      this.dueloService.getEquiposGruposDuelosByDuelo(this.idDuelo).subscribe({
        next :(value: any)=>{
          this.equipoGrupoDuelos = value;
          this.cargarGolesyDuelo();
          //console.log('this.equipoGrupoDuelos::: --> ', JSON.stringify(this.equipoGrupoDuelos, null, 2));
        },
        error: (error: any) =>{
          this.mensaje = error.error.mensaje;
        }
  
      })
    }

  }

  // CARGO GOLES DE UN DUELO
  cargarGolesyDuelo(): void{
    if(this.idDuelo){
      this.dueloService.getGolesByDuelo(this.idDuelo).subscribe({
        next :(value: any)=>{
          this.goles = value;
        },
        error: (error: any) =>{
          this.mensaje = error.error.mensaje;
        }
  
      })
    }

  }

  agruparGolesPorEquipo() {
    const equipos = {};
  
    if (this.equipoGrupoDuelos) {  // Verificar si this.equipoGrupoDuelos no es undefined
      this.equipoGrupoDuelos.forEach(equipoGrupoDuelo => {
        const equipo = equipoGrupoDuelo.equipoGrupo.equipo;
        equipos[equipo.idEquipo] = {
          nombreEquipo: equipo.nombreEquipo,
          goles: [],
          cantidadGoles: 0,
        };
      });
    }
  
    for (const gol of this.goles) {
      if (gol && gol.equipoJugador && gol.equipoJugador.equipo) {
        const equipoId = gol.equipoJugador.equipo.idEquipo;
    
        if (equipos[equipoId]) {
          equipos[equipoId].goles.push({
            idGol: gol.idGol,
            minutoGol: gol.minutoGol,
            nombreJugador: gol.equipoJugador.jugador.nombreJugador,
            nombreEquipo: gol.equipoJugador.equipo.nombreEquipo,
            idEquipo: gol.equipoJugador.equipo.idEquipo
          });
          equipos[equipoId].cantidadGoles++;
        }
      }
    }
    
    return equipos;
  }
  
  delete(gol: Goles): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar el registro ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dueloService.deleteGol(gol.idGol).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Registro eliminado con exito..!`,
              'success'
            )
          }
        )
  
      }
     location.reload();
      
    });
  }
  //duelo: Duelo;
  //nombreDuelo: string;
 // idDuelo: number;
  //equipo: Equipo;
  //idEquipo: number;
 // equipoJugador: EquipoJugador[];
  //mensajeEquipoJugador: string;
  //equipoGrupoDuelo: EquipoGrupoDuelo[];
 // mensajeGoles: string;

  //goles: Goles[];

 /* ngOnInit(): void {
    this.cargarGolesByDuelo();
    this.cargarDuelo();
    
  }*/

 /* constructor(
    private activate: ActivatedRoute, 
    private dueloservice: DueloService, 
    private jugadorService: JugadorService ){}

 /* cargarEquipoGrupoDuelo(): void {
    this.activate.params.subscribe((params) => {
      const idDuelo = params['idDuelo'];
      if (idDuelo) {
        // CARGA 
        this.equipoGrupoDueloService.getEquiposGruposDuelosByDuelo(idDuelo).subscribe(          
            (s) =>{
              this.equipoGrupoDuelo = s;
              console.log('this.equipoGrupoDuelo::: --> ', JSON.stringify(this.equipoGrupoDuelo, null, 2));
            },                       
             err =>{
              this.mensajeEquipoJugador = err.error.mensaje;
            });      
      }
    });
  }*/

 /* cargarGolesByDuelo(): void{
    this.activate.params.subscribe((params) => {
      const idDuelo = params['idDuelo'];
      if(idDuelo){
        this.dueloservice.getGolesByDuelo(idDuelo).subscribe({
          next:(value: any)=>{
            this.goles = value;
            console.log('this.goles::: --> ', JSON.stringify(this.goles, null, 2));
          },
          error :(error: any)=>{
            this.mensajeGoles = error.error.mensaje;
            console.log('mensaje: ' +this.mensajeGoles)
          }
        })
      }
    })
  }

  cargarDuelo(): void{
    this.activate.params.subscribe((params) => {
      const idDuelo = params['idDuelo'];
      if(idDuelo){
        this.dueloservice.getDuelo(idDuelo).subscribe({
          next:(value: any)=>{
            this.duelo = value;
            this.nombreDuelo = this.duelo.nombreDuelo;
            this.idDuelo = this.duelo.idDuelo;
            //console.log('this.goles::: --> ', JSON.stringify(this.goles, null, 2));
          }
        })
      }
    })
  }

*/












  
}
