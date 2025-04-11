import { Component } from '@angular/core';
import { Evento } from '../evento/evento';
//import { Fase } from '../fases/curso';
import { EventoService } from '../evento/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { FasesService } from '../fases/cursos.service';
//import { Fecha } from '../fechas/fecha';
import { Location } from '@angular/common';
import { Equipo } from '../equipos/equipo';
import { ModalService } from '../equipos/detalle/modal.service';
import { EquipoService } from '../equipos/equipo.service';
import Swal from 'sweetalert2';
import { EventoEquipo } from '../equipos/evento-equipo';
import { AuthService } from '../personas/auth.service';
import { Goles } from '../duelo-fecha/detalle/goles';
@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html'
})
export class DetalleEventoComponent {

 /* public evento: Evento = new Evento();
  //f//ases: Fase[];
  fechas: Fecha[];
  errores : string;
  equipos: Equipo[]=[];
  erroresEquipo : string;

  goles: Goles[];
  mensajeGoles: string;

  // VARIABLES EQUIPO

  equipoSeleccionado: Equipo;

  eventoEquipo:EventoEquipo;

  constructor(
    private eventoService: EventoService,
    private activate: ActivatedRoute, 
    private location: Location, 
    private modalService: ModalService,
    private equipoService: EquipoService, 
   // private faseService: FasesService,
    public auth: AuthService){}


    // OPCIONES FASES
    public checkboxSeleccionado: boolean = false;
    public botonesHabilitados: boolean = false;

    // OPCIONES EQUIPO
    public checkboxSeleccionadoEquipo: boolean = false;
    public botonesHabilitadosEquipo: boolean = false;


    jugadoresConGoles: any[] = []; // Asigna aquí la lista de jugadores con goles
    equiposConGoles: any[] = [];

  ngOnInit(): void {
    //this.cargarEvento();
    this.cargarGolesByEvento();

    this.modalService.notifica.subscribe(e =>{
      this.equipos = this.equipos.map(eO =>{
        if(e.idEquipo == eO.idEquipo){
          eO.foto = e.foto;
        }
        return eO;
      })
    })

  }

  /*
  cargarEvento(): void {
    this.activate.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        // CARGA DATA DE EVENTO
        this.eventoService.getEvento(id).subscribe((e) => {
          this.evento = e;
        }); 
        // CARGA DATA DE FASES DE EVENTO
        this.eventoService.getFasesEvento(id).subscribe(          
            (s) =>{
              this.fases = s
            } ,   
                     
             err =>{
              this.errores = err.error.mensaje as string;
            });
            // CARGA DATA DE EQUIPOS DE EVENTO
        this.eventoService.getEquipoEvento(id).subscribe(
          equipo => {
            this.equipos = equipo;
          },
          error =>{
            this.erroresEquipo = error;
          }
        )
        
      }
    });
  }
*/
 /* toggleBotones() {
    this.botonesHabilitados = !this.botonesHabilitados;
  }
  toggleBotonesEquipo() {
    this.botonesHabilitadosEquipo = !this.botonesHabilitadosEquipo;
  }

cancelar() {
  this.location.back(); // Esto navegará hacia atrás en la historia de navegación
}


deleteEquipo(equipo: Equipo): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `¿Seguro que deseas eliminar el equipo ${equipo.nombreEquipo} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.eventoEquipo = new EventoEquipo();
      this.eventoEquipo.equipo = equipo;
      this.eventoEquipo.evento = this.evento;

      console.log(' this.eventoEquip::::'+JSON.stringify(this.eventoEquipo, null, 2));
      this.eventoService.eliminarEventoEquipo(this.eventoEquipo).subscribe(
        response => {
          this.equipos = this.equipos.filter(p => p!==equipo)
          swalWithBootstrapButtons.fire(
            'Equipo Eliminado!',
            `Equipo ${equipo.nombreEquipo} eliminado con exito..!`,
            'success'
          )
        }
      )

    }
  });
}


abrirModal(equipo: Equipo){
  this.equipoSeleccionado=equipo;
  this.modalService.abrirModal();
}

/*delete(fase: Fase): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `¿Seguro que deseas eliminar la fase ${fase.nombreFase} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.faseService.delete(fase.idFase).subscribe(
        response => {
          this.fases = this.fases.filter(p => p!==fase)
          swalWithBootstrapButtons.fire(
            'Fase Eliminada!',
            `Fase ${fase.nombreFase} eliminada con exito..!`,
            'success'
          )
        }
      )

    }
  });
}*/

/*
cargarGolesByEvento(): void {
  this.activate.params.subscribe((params) => {
    const id = params['id'];
    if (id) {
      // CARGA DATA DE EVENTO
      this.eventoService.getGolesByEvento(id).subscribe({
      next : (value : any) =>{
        this.goles = value;
        //console.log('this.goles::: --> ', JSON.stringify(this.goles, null, 2));
        this.jugadoresConGoles = this.agruparPorJugador();
        this.equiposConGoles = this.agruparPorEquipo();
      },
      error : (error: any)=>{
        this.mensajeGoles = error.error.mensaje;
      }
      });     
     }
  });
}

agruparPorEquipo(): any[] {
  if (this.goles && this.goles.length > 0) {
    const equiposMap = new Map<number, any>();

    this.goles.forEach((gol) => {
      const equipo = gol.equipoJugador.equipo;

      if (equiposMap.has(equipo.idEquipo)) {
        equiposMap.get(equipo.idEquipo).cantidadGoles++;
      } else {
        equiposMap.set(equipo.idEquipo, {
          idEquipo: equipo.idEquipo,
          nombreEquipo: equipo.nombreEquipo,
          cantidadGoles: 1,
        });
      }
    });

    const equiposAgrupados = Array.from(equiposMap.values());
    equiposAgrupados.sort((a, b) => b.cantidadGoles - a.cantidadGoles);

    return equiposAgrupados;
  } else {
    console.error('No hay datos de goles disponibles.');
    return [];
  }
}


agruparPorJugador(): any[] {
  if (this.goles && this.goles.length > 0) {
    const jugadoresMap = new Map<number, any>();

    this.goles.forEach((gol) => {
      const jugador = gol.equipoJugador.jugador;
      const equipo = gol.equipoJugador.equipo.nombreEquipo;

      if (jugadoresMap.has(jugador.idJugador)) {
        jugadoresMap.get(jugador.idJugador).cantidadGoles++;
      } else {
        jugadoresMap.set(jugador.idJugador, {
          idJugador: jugador.idJugador,
          nombreJugador: jugador.nombreJugador,
          equipo: equipo,
          cantidadGoles: 1,
        });
      }
    });

    const jugadoresAgrupados = Array.from(jugadoresMap.values());
    jugadoresAgrupados.sort((a, b) => b.cantidadGoles - a.cantidadGoles);

    return jugadoresAgrupados;
  } else {
    console.error('No hay datos de goles disponibles.');
    return [];
  }
}

/*

// Suponiendo que 'this.goles' contiene los datos de los goles
agruparPorJugador(): any[] {

  if (this.goles && this.goles.length > 0) {
    // Resto del código para agrupar los goles por jugador

    const jugadoresMap = new Map<number, any[]>();

    this.goles.forEach((gol) => {
      const jugador = gol.equipoJugador.jugador;
      const equipo = gol.equipoJugador.equipo.nombreEquipo;
  
      if (jugadoresMap.has(jugador.idJugador)) {
        const jugadorExistente = jugadoresMap.get(jugador.idJugador);
        if (jugadorExistente) {
          jugadorExistente.push({
            idJugador: jugador.idJugador,
            nombreJugador: jugador.nombreJugador,
            equipo: equipo,
          });
        }
      } else {
        jugadoresMap.set(jugador.idJugador, [{
          idJugador: jugador.idJugador,
          nombreJugador: jugador.nombreJugador,
          equipo: equipo,
        }]);
      }
    });
  
    // Convertir el mapa de jugadores a una matriz de objetos
    const jugadoresAgrupados: any[] = [];
    jugadoresMap.forEach((value) => {
      const cantidadGoles = value.length;
      const jugador = value[0];
      jugador.cantidadGoles = cantidadGoles;
      jugadoresAgrupados.push(jugador);
    });
  
    // Ordenar por la cantidad de goles (opcional)
    jugadoresAgrupados.sort((a, b) => b.cantidadGoles - a.cantidadGoles);
  
    return jugadoresAgrupados;

  } else {
    // Manejo si this.goles es indefinido o vacío
    console.error('No hay datos de goles disponibles.');
    return [];
  }

 
  
}
*/















}
