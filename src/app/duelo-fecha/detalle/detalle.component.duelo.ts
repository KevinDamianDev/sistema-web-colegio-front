import { Component, Input } from '@angular/core';
import { AsignarEquipoGrupoService } from 'src/app/asignar-equipos/asignar-equipo-grupo.service';
import { EquipoGrupoDuelo } from 'src/app/asignar-equipos/equipo-grupo-duelo';
import { Duelo } from 'src/app/duelos/duelo';
import { ModalJugadorServiceService } from 'src/app/jugadores/detalle/detalle-jugador/modal-jugador-service.service';
import { Goles } from './goles';
import { DueloService } from 'src/app/duelos/duelo.service';

@Component({
  selector: 'app-detalle-duelo',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponentDuelo {

  @Input() duelo: Duelo;

  equipoGrupoDuelos: EquipoGrupoDuelo[];
  mensaje: string;
  titulo: string = "Detalle del duelo."
  goles: Goles[] = [];


  constructor(
    public modalService: ModalJugadorServiceService,
    private asignarDueloService: DueloService
  ){}

  ngOnInit(): void {
    this.cargarEquipoGrupoDueloByDuelo();
    this.cargarGolesyDuelo()
  }




  cerrarModal(){
    this.modalService.cerrarModal();
    this.cargarEquipoGrupoDueloByDuelo();
  }

  // CARGO EQUIPOS_GRUPOS POR DUELO
  cargarEquipoGrupoDueloByDuelo(): void{
    this.asignarDueloService.getEquiposGruposDuelosByDuelo(this.duelo.idDuelo).subscribe({
      next :(value: any)=>{
        this.equipoGrupoDuelos = value;
        //console.log('this.equipoGrupoDuelos::: --> ', JSON.stringify(this.equipoGrupoDuelos, null, 2));
      },
      error: (error: any) =>{
        this.mensaje = error.error.mensaje;
      }

    })
  }

  // CARGO GOLES DE UN DUELO
  cargarGolesyDuelo(): void{
    this.asignarDueloService.getGolesByDuelo(this.duelo.idDuelo).subscribe({
      next :(value: any)=>{
        this.goles = value;
      },
      error: (error: any) =>{
        this.mensaje = error.error.mensaje;
      }

    })
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
            minutoGol: gol.minutoGol,
            nombreJugador: gol.equipoJugador.jugador.nombreJugador,
          });
          equipos[equipoId].cantidadGoles++;
        }
      }
    }
    
    return equipos;
  }
  



isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0;
}








}
