import { Component } from '@angular/core';
import { Equipo } from '../equipos/equipo';
import { EventoService } from '../evento/evento.service';
import { ActivatedRoute } from '@angular/router';
//import { FasesService } from '../fases/cursos.service';
import { EquipoGrupo } from './equipo-grupo';
import { AsignarEquipoGrupoService } from './asignar-equipo-grupo.service';
import Swal from 'sweetalert2';
import { catchError, forkJoin, map, of } from 'rxjs';
import { DueloService } from '../duelos/duelo.service';
import { Duelo } from '../duelos/duelo';
import { EquipoGrupoDuelo } from './equipo-grupo-duelo';
@Component({
  selector: 'app-asignar-equipos',
  templateUrl: './asignar-equipos.component.html'
})
export class AsignarEquiposComponent {

equipos: Equipo[];
equipoSeleccionado: Equipo; 

equipoGrupo: EquipoGrupo;
idFase: number;

//equipoGrupoCreado: EquipoGrupo;


gruposVacios: string;

equiposGrupos: EquipoGrupo[];
gruposEquipos: { [grupo: string]: EquipoGrupo[] } = {}; // Objeto para agrupar los equipos por grupo

duelos: Duelo[];
dueloSeleccionado: Duelo;
equipoGrupoDuelo: EquipoGrupoDuelo;

//equipoGrupoDuelos: EquipoGrupoDuelo[];
equipoGrupoSeleccionado: EquipoGrupo;

// VARIABLES EQUIPO-GRIPO-DUELO


equipoGrupoDuelos: EquipoGrupoDuelo[];
duelosEquipos: { [duelo: string]: EquipoGrupoDuelo[] } = {}; // Objeto para agrupar los equipos por grupo

//equipoGrupo:EquipoGrupo;

constructor(private eventoService: EventoService, private activate: ActivatedRoute,
   private equipoGrupoAsignar: AsignarEquipoGrupoService,
  private dueloService: DueloService){}

  ngOnInit(): void {

    this.cargarEquiposGruposByFase();
    this.cargarEquipos();
    this.cargarDuelosByFase();

    // -- VARIABLES EQUIPO GRUPO DUELO
    this.cargarEquiposGruposDueloByFase();

  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
  

   
  seleccionarEquipo(equipo: any) {
    this.equipoSeleccionado = equipo;
  }

  


  seleccionarDuelo(duelo: any){
    //console.log('duelo:::', JSON.stringify(duelo, null, 2));
    this.dueloSeleccionado= duelo;
  }

  seleccionarEquipoGrupo(equipoGrupoDuelo: any){
    //console.log('this.equipoGrupoDuelo:::', JSON.stringify(equipoGrupoDuelo, null, 2));
    this.equipoGrupoSeleccionado= equipoGrupoDuelo;

  }
  
cargarEquipos(): void{
  this.activate.params.subscribe((params) => {
    const idEvento = params['idEvento'];
    if (idEvento) {
      this.eventoService.getEquipoEvento(idEvento).subscribe(
        equipo => {
          this.equipos = equipo;
        },
      )}
  });
}

  
cargarDuelosByFase(): void{
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];
    if (idFase) {
      this.dueloService.getDuelosByFase(idFase).subscribe(
        duelo => {
          this.duelos = duelo;
        },
      )}
  });
}





// CARGA LOS EQUIPOS_GRUPOS SEFGUN LA FASE
cargarEquiposGruposByFase(): void {
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];
    this.equipoGrupoAsignar.getEquiposGruposByFase(idFase).subscribe(
      (e) => {
        this.equiposGrupos = e;
         //console.log('this.equiposGrupos::: --> ', JSON.stringify(this.equiposGrupos, null, 2));
        // this.agruparEquiposPorGrupo();        
      }
    );
  });
}



// ELIMNAR EQUIPOS DE GRUPOS

eliminarEquipoGrupo(idEquipoGrupo: number): void{
  console.log('idEquipoGrupo:::' +idEquipoGrupo)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `¿Seguro que deseas eliminar el equipo ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      //console.log(' this.equipoGrupo ELIMINAR::::'+JSON.stringify(this.equipoGrupo, null, 2));
      this.equipoGrupoAsignar.deleteEquipoByGrupo(idEquipoGrupo).subscribe(
        response => {
          swalWithBootstrapButtons.fire(
            'Equipo Eliminado!',
            `Equipo eliminado del grupo..!`,
            'success'
          )
        }
      )

    }
    location.reload();
  });
}








// METODOS EQUIPO_GRUPO_DUELO

cargarEquiposGruposDueloByFase(): void {
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];
    this.equipoGrupoAsignar.getEquiposGruposDuelosByFase(idFase).subscribe(
      (e) => {
        this.equipoGrupoDuelos = e;
         //console.log('this.equipoGrupoDuelo:::', JSON.stringify(this.equipoGrupoDuelo, null, 2));
        // this.equipoGrupoDuelos =this.equipoGrupoDuelo;
        this.agruparEquiposPorDuelo();        
      }
    );
  });
}



// AGRUPA EQUIPOS POR DUELO
private agruparEquiposPorDuelo() {
  if (this.equipoGrupoDuelos) {
    this.equipoGrupoDuelos.forEach((equipoGrupoD: EquipoGrupoDuelo) => {
      const dueloNombre = equipoGrupoD.duelo.nombreDuelo;
      if (!this.duelosEquipos[dueloNombre]) {
        this.duelosEquipos[dueloNombre] = [];
      }
      this.duelosEquipos[dueloNombre].push(equipoGrupoD);
    });
   // console.log('this.gruposEquipos:::', JSON.stringify(this.gruposEquipos, null, 2));
  }
}


asignarEquipoGrupoADuelo() {
  if (this.dueloSeleccionado && this.equipoGrupoSeleccionado) {

    this.equipoGrupoDuelo = new EquipoGrupoDuelo();
    this.equipoGrupoDuelo.duelo = this.dueloSeleccionado;
    this.equipoGrupoDuelo.equipoGrupo = this.equipoGrupoSeleccionado ;
 console.log('this.dueloSeleccionado:::>', JSON.stringify(this.dueloSeleccionado, null, 2));
 console.log('this.equipoGrupoSeleccionado:::>', JSON.stringify(this.equipoGrupoSeleccionado, null, 2));
    this.equipoGrupoAsignar.asignarEquiposGruposADuelos(this.equipoGrupoDuelo).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success', 
          title: 'Equipo asignado!', 
          text: 'Se asignó el equipo al duelo seleccionado.', 
          confirmButtonColor: '#28a745', 
          confirmButtonText: 'Aceptar',  
        }).then(() => {
          // Recargar la página después de hacer clic en "Aceptar"
          this.dueloSeleccionado = null;
          this.equipoGrupoSeleccionado = null;
          location.reload();
        //this.cargarEquiposGruposByFase();
        });
       // this.equipoGrupoCreado = response.equipoGrupo;
         //console.log('this.equipoGrupoCreado:::', JSON.stringify(this.equipoGrupoCreado, null, 2));
        
      },(error) => {
        this.dueloSeleccionado = null;
        this.equipoGrupoSeleccionado = null;
      }

    );
    
  } else {
    Swal.fire({
      icon: 'warning',
      title: '¡Advertencia!',  
      text: 'Debes seleccionar un equipo y un duelo antes de asignarlos..', 
      confirmButtonColor: '#d33',  
      confirmButtonText: 'Entendido',  
    }).then(() => {
      // Recargar la página después de hacer clic en "Aceptar"
      this.equipoSeleccionado = null;
      
    });

  }
}


eliminarEquipoGrupoDuelo(idEquipoGrupoDuelo: number): void{
  console.log('idEquipoGrupoDuelo:::' +idEquipoGrupoDuelo)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `¿Seguro que deseas eliminar el equipo del duelo ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      //console.log(' this.equipoGrupo ELIMINAR::::'+JSON.stringify(this.equipoGrupo, null, 2));
      this.equipoGrupoAsignar.deleteEquipoGrupoByDuelo(idEquipoGrupoDuelo).subscribe(
        response => {
          swalWithBootstrapButtons.fire(
            'Equipo Eliminado!',
            `Equipo eliminado del duelo..!`,
            'success'
          )
        }
      )

    }
    location.reload();
  });
}








/*cargarGruposYEquipos(): void {
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];

    this.idFase = idFase;

    if (idFase) {
      const gruposObservable = this.faseService.getGruposFase(idFase);

      gruposObservable.subscribe((grupos) => {
        this.grupos = grupos;

        // Crear un array de Observables para cargar equipos por grupo
        const equiposObservables = this.grupos.map((grupo) => {
          return this.equipoGrupoAsignar.getEquiposByGrupo(grupo.idGrupo); // Asume que tienes un campo "id" en el objeto grupo
        });

        // Combinar todos los Observables en un único Observable usando forkJoin
        forkJoin(equiposObservables).subscribe((equiposPorGrupo) => {
          this.equiposByGrupos = equiposPorGrupo;
         console.log('this.equiposByGrupos:::', JSON.stringify(this.equiposByGrupos, null, 2));
        });
      });
    }
  });
}*/

/*
cargarGruposYEquipos(): void {
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];

    this.idFase = idFase;

    if (idFase) {
      const gruposObservable = this.faseService.getGruposFase(idFase);

      gruposObservable.subscribe((grupos) => {
        this.grupos = grupos;

        // Crear un array de Observables para cargar equipos por grupo
        const equiposObservables = this.grupos.map((grupo) => {
          return this.equipoGrupoAsignar.getEquiposByGrupo(grupo.idGrupo).pipe(
            catchError((error) => {
              this.gruposVacios = error.error.mensaje;
             // console.log('this.gruposVacios:::' + this.gruposVacios)
             // console.error('Error al cargar equipos para el grupo:', error);
              return of([]); // Devuelve un array vacío si ocurre un error
            })
          );
        });

        // Combinar todos los Observables en un único Observable usando forkJoin
        forkJoin(equiposObservables).subscribe((equiposPorGrupo) => {
          this.equiposByGrupos = equiposPorGrupo;
         console.log('this.metodooooo:::', JSON.stringify(this.equiposByGrupos, null, 2));
        });
      });
    }
  });
}
*/
//gruposConEquipos: { [grupo: string]: any[] } = {};



/*ordenarEquiposPorGrupo() {
  console.log('ordena datos');
  this.equiposGrupos.sort((a, b) => {
    if (a.grupo.nombreGrupo < b.grupo.nombreGrupo) return -1;
    if (a.grupo.nombreGrupo > b.grupo.nombreGrupo) return 1;
    return 0;
  });
}*/

/*organizarEquiposPorGrupo() {
  this.gruposConEquipos = this.equiposGrupos.reduce((grupos, equipoGrupo) => {
    const nombreGrupo = equipoGrupo.grupo.nombreGrupo;
    if (!grupos[nombreGrupo]) {
      grupos[nombreGrupo] = [];
    }
    grupos[nombreGrupo].push(equipoGrupo.equipo.nombreEquipo);
    return grupos;
  }, {});
}
*/


/*

 getEquiposPorGrupo() {
    const equiposPorGrupo = {};

    for (const equipoGrupo of this.equiposGrupos) {
      const groupName = equipoGrupo.grupo.nombreGrupo;

      if (!equiposPorGrupo[groupName]) {
        equiposPorGrupo[groupName] = [];
      }

      equiposPorGrupo[groupName].push(equipoGrupo.equipo);
    }

    return equiposPorGrupo;
  }

*/




/*cargarEquiposGruposByFase():void{
  this.activate.params.subscribe((params) => {
    const idFase = params['idFase'];
    this.equipoGrupoAsignar.getEquiposGruposByFase(idFase).subscribe(
      (e)=>{
        this.equiposGrupos = e;
        console.log('this.equiposGrupos:::', JSON.stringify(this.equiposGrupos, null, 2));
      }
    )
});
}*/





}
