import { Component } from '@angular/core';
import { EquipoGrupoService } from './equipo-grupo.service';
//import { FasesService } from '../fases/cursos.service';
import { ActivatedRoute } from '@angular/router';
//import { Fase } from '../fases/curso';
import { EquipoGrupo } from '../asignar-equipos/equipo-grupo';
import { ModalEstadisticaService } from './estadisticas/detalle-estadistica/modal-estadistica.service';
import { forkJoin } from 'rxjs';
import { EquipoEstadistica } from './estadisticas/equipo-estadistica';
import { AuthService } from '../personas/auth.service';

@Component({
  selector: 'app-equipo-grupo',
  templateUrl: './equipo-grupo.component.html'
})
export class EquipoGrupoComponent {

  idFase: number;
 // fase: Fase;

  mensajeEquipoGrupo: string;

  //grupo: Grupo;
  nombreGrupo: string;

  equiposGrupos: EquipoGrupo[] = [];
  equipoEstadisticas: EquipoEstadistica[] = [];

  public checkboxSeleccionado: boolean = false;
  public botonesHabilitados: boolean = false;


  constructor(
    private equipoGrupoService: EquipoGrupoService, 
   // private faseService: FasesService,
    private route: ActivatedRoute, 
   // private grupoService: GrupoService,
    private estadisticaService: ModalEstadisticaService,
    public auth: AuthService){}

  ngOnInit(): void {

    //this.cargarFase();
    this.cargarEquipoGrupoYEstadisticas();
  }


  toggleBotones() {
    this.botonesHabilitados = !this.botonesHabilitados;
  }

  cargarEquipoGrupoYEstadisticas(): void {
    this.route.params.subscribe((params) => {
      const idGrupo = params['idGrupo'];
  
      if (idGrupo) {
        // Realiza la solicitud para obtener equipos y grupos
        this.equipoGrupoService.getEquiposGruposByGrupo(idGrupo).subscribe(
          (eG) => {
            this.equiposGrupos = eG;
  
            // Prepara un arreglo de observables para las solicitudes de estadísticas
            const estadisticasObservables = this.equiposGrupos.map((equipoGrupo) => {
              return this.estadisticaService.getEstadisticaByEquipo(equipoGrupo.idEquipoGrupo);
            });
  
            // Usa forkJoin para realizar las solicitudes de estadísticas en paralelo
            forkJoin(estadisticasObservables).subscribe(
              (estadisticas) => {
                // Combina los datos de equipos y estadísticas en un solo arreglo
                const equiposConEstadisticas = this.equiposGrupos.map((equipo, index) => {
                  return {
                    equipo: equipo,
                    estadisticas: estadisticas[index][0]
                  };
                });
  
                // Filtra los elementos sin estadísticas
                const equiposConEstadisticasValidas = equiposConEstadisticas.filter((item) => item.estadisticas);
  
                // Ordena el arreglo combinado por puntos de mayor a menor
                equiposConEstadisticasValidas.sort((a, b) => {
                  return b.estadisticas.puntos - a.estadisticas.puntos;
                });
  
                // Descomponer el arreglo ordenado en equipos y estadísticas
                this.equiposGrupos = equiposConEstadisticasValidas.map((item) => item.equipo);
                this.equipoEstadisticas = equiposConEstadisticasValidas.map((item) => item.estadisticas);

                // console.log('equiposGrupos:::', JSON.stringify(this.equiposGrupos, null, 2));
                // console.log('equipoEstadisticas:::', JSON.stringify(this.equipoEstadisticas, null, 2));
              },
              (error) => {
                console.error('Error al obtener estadísticas:', error);
              }
            );
          },
          (err) => {
            this.mensajeEquipoGrupo = err.mensaje;
          }
        );
      }
    });
  }
  


 /* cargarFase(): void{
    this.route.params.subscribe((params) => {
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


}
