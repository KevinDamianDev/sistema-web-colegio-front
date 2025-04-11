import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HeaderComponent}  from './shared/header/header.component';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BreadComponent } from './shared/bread/bread.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaService } from './personas/persona.service';
import { RouterModule, Routes } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormComponent } from './personas/form/form/form.component';
import { FormsModule } from '@angular/forms';
import localeEs from  '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
import { DocenteComponent } from './docentes/docente.component';
import { DocenteService } from './docentes/docente.service';
import { DocenteFormComponent } from './docentes/form/docente-form/docente-form.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquipoFormComponent } from './equipos/form/equipo-form/equipo-form.component';
import { EquipoService } from './equipos/equipo.service';
import { DetalleComponent } from './equipos/detalle/detalle.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { JugadorFormComponent } from './jugadores/form/jugador-form/jugador-form.component';
import { DetalleJugadorComponent } from './jugadores/detalle/detalle-jugador/detalle-jugador.component';
import { JugadorService } from './jugadores/jugador.service';
import { EventoComponent } from './evento/evento.component';
import { EventoFormComponent } from './evento/form/evento-form/evento-form.component';
import { EventoService } from './evento/evento.service';
import { CursosComponent } from './fases/cursos.component';
import { CursoFormComponent } from './fases/form/curso-form/curso-form.component';
import { GradoService } from './grupos/grado.service';
import { DuelosComponent } from './duelos/duelos.component';
import { FormDueloComponent } from './duelos/form/form-duelo/form-duelo.component';
import { DueloService } from './duelos/duelo.service';
import { EquipoGrupoComponent } from './equipo-grupo/equipo-grupo.component';
import { EquipoGrupoService } from './equipo-grupo/equipo-grupo.service';
import { DetalleEventoComponent } from './detalle-evento/detalle-evento.component';
import { DetalleEventoFechaComponent } from './detalle-evento/detalleEventoFechas/detalle-evento-fecha/detalle-evento-fecha.component';
import { AsignarEquiposComponent } from './asignar-equipos/asignar-equipos.component';
import { AsignarEquipoGrupoService } from './asignar-equipos/asignar-equipo-grupo.service';
import { DueloFechaComponent } from './duelo-fecha/duelo-fecha.component';
import { NgPipesModule } from 'ngx-pipes';
import { DetalleEstadisticaComponent } from './equipo-grupo/estadisticas/detalle-estadistica/detalle-estadistica.component';
import { ModalEstadisticaService } from './equipo-grupo/estadisticas/detalle-estadistica/modal-estadistica.service';
import { LoginComponent } from './personas/login.component';
import { Token } from './personas/interceptors/token';
import { Auth } from './personas/interceptors/auth';
import { MisEventosComponent } from './evento/mis-eventos/mis-eventos.component';
import { DetalleComponentDuelo } from './duelo-fecha/detalle/detalle.component.duelo';
import { FormGolComponent } from './duelo-fecha/goles/form-gol/form-gol.component';
import { FormularioGolComponent } from './duelo-fecha/goles/form/formulario-gol/formulario-gol.component';
import { EventoPersonaComponent } from './evento-persona/evento-persona.component';
import { EventoPersonaServiceService } from './evento-persona/evento-persona-service.service';
import { FormEventoPersonaComponent } from './evento-persona/form/form-evento-persona/form-evento-persona.component';
import { ReportesService } from './reportes/reportes.service';
import { ReportesComponent } from './reportes/reportes.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoService } from './alumnos/alumno.service';
import { FormGradoComponent } from './grupos/form/form-grado/form-grado.component';
import { GradoComponent } from './grupos/grado.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { FormPeriodoComponent } from './periodos/form-periodo/form-periodo.component';
import { PeriodoService } from './periodos/periodo.service';
import { ComunicadosComponent } from './comunicados/comunicados.component';
import { ComunicadoService } from './comunicados/comunicado.service';
import { ComunidadoFormComponent } from './comunicados/comunidado-form/comunidado-form.component';
import { GradosDocentesComponent } from './grados-docentes/grados-docentes.component';
import { CursosGradosComponent } from './cursos-grados/cursos-grados.component';
import { EvaluacionesCursosComponent } from './evaluaciones-cursos/evaluaciones-cursos.component';
import { EvaluacionServiceService } from './evaluaciones-cursos/evaluacion-service.service';

  registerLocaleData(localeEs, 'es');
const routes: Routes= [
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: 'personas', component: PersonasComponent},
  {path: 'personas/form', component: FormComponent},
  {path: 'personas/form/:id', component: FormComponent},

  {path: 'docentes', component: DocenteComponent},
  {path: 'docentes/form', component: DocenteFormComponent},
  {path: 'docentes/form/:id', component: DocenteFormComponent},

  {path: 'alumnos', component: AlumnosComponent},

  {path: 'grados', component: GradoComponent},
  {path: 'grados/form', component: FormGradoComponent},
  {path: 'grados/form/:id', component: FormGradoComponent},

  {path: 'cursos', component: CursosComponent},
  {path: 'cursos/form', component: CursoFormComponent},
  {path: 'cursos/form/:id', component: CursoFormComponent},

  {path: 'periodos', component: PeriodosComponent},
  {path: 'periodos/form', component: FormPeriodoComponent},
  {path: 'periodos/form/:id', component: FormPeriodoComponent},

  {path: 'comunicados', component: ComunicadosComponent},
  {path: 'comunicados/form', component: ComunidadoFormComponent},
  {path: 'comunicados/form/:id', component: ComunidadoFormComponent},

  {path: 'docentegrados', component: GradosDocentesComponent},

  {path: 'cursosgrados', component: CursosGradosComponent},

  {path: 'evaluacioncurso', component: EvaluacionesCursosComponent},

  
 
  //{path: 'equipos', component: EquiposComponent},
  {path: 'equipos/form', component: EquipoFormComponent},
  {path: 'equipos/form/:id', component: EquipoFormComponent},
 // {path: 'equipos/ver/:id', component: DetalleComponent},

 {path: 'jugadores/:id', component: JugadoresComponent},
 {path: 'jugador/form', component: JugadorFormComponent},
 {path: 'jugadores/form/:id', component: JugadorFormComponent},

 {path: 'eventos', component: EventoComponent},
 {path: 'eventos/form', component: EventoFormComponent},
 {path: 'eventos/form/:id', component: EventoFormComponent},

  //{path: 'fases', component: FasesComponent},
 //{path: 'fases/form', component: FaseFormComponent},
 //{path: 'fases/form/:id', component: FaseFormComponent},

 //{path: 'fechas', component: FechasComponent},
 //{path: 'fechas/form', component: FechaFormComponent},
 //{path: 'fechas/form/:id', component: FechaFormComponent},

 

 //{path: 'duelos', component: DuelosComponent},
 {path: 'duelos/form', component: FormDueloComponent},
 {path: 'duelos/form/:id', component: FormDueloComponent},

 {path: 'detalle/evento/:id', component: DetalleEventoComponent},

 {path: 'detalle/eventoFecha/:id', component: DetalleEventoFechaComponent},

 {path: 'asignarEquipoGrupo', component: AsignarEquiposComponent},

 {path: 'dueloFecha', component: DueloFechaComponent},

 {path: 'equiposGrupo', component: EquipoGrupoComponent},

 {path: 'estadisticaEquipo/:id', component: DetalleEstadisticaComponent},

 {path: 'login', component: LoginComponent},

 {path: 'misEventos', component: MisEventosComponent},

 {path: 'gol', component: FormGolComponent},

 {path: 'gol/form', component: FormularioGolComponent},
 {path: 'gol/form/:id', component: FormularioGolComponent},

 {path: 'personas/evento/:id', component: EventoPersonaComponent},

 {path: 'personas/evento/form/:id', component: FormEventoPersonaComponent},

 {path: 'reportes', component: ReportesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    BreadComponent,
    PersonasComponent,
    FormComponent,
    DocenteComponent,
    DocenteFormComponent,
    EquiposComponent,
    EquipoFormComponent,
    DetalleComponent,
    JugadoresComponent,
    JugadorFormComponent,
    DetalleJugadorComponent,
    EventoComponent,
    EventoFormComponent,
    CursosComponent,
    CursoFormComponent,
    GradoComponent,
    FormGradoComponent,
    DuelosComponent,
    FormDueloComponent,
    EquipoGrupoComponent,
    DetalleEventoComponent,
    DetalleEventoFechaComponent,
    AsignarEquiposComponent,
    DueloFechaComponent,
    DetalleEstadisticaComponent,
    LoginComponent,
    MisEventosComponent,
    DetalleComponentDuelo,
    FormGolComponent,
    FormularioGolComponent,
    EventoPersonaComponent,
    FormEventoPersonaComponent,
    ReportesComponent,
    AlumnosComponent,
    PeriodosComponent,
    FormPeriodoComponent,
    ComunicadosComponent,
    ComunidadoFormComponent,
    GradosDocentesComponent,
    CursosGradosComponent,
    EvaluacionesCursosComponent
     ],
  imports: [
    BrowserModule,
    NgPipesModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PersonaService, DocenteService, AlumnoService, GradoService, EvaluacionServiceService,
    PeriodoService, ComunicadoService, 
    EquipoService, JugadorService, 
    EventoService, 
    DueloService, EquipoGrupoService, AsignarEquipoGrupoService, 
    ModalEstadisticaService, EventoPersonaServiceService, ReportesService, {provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS, useClass: Token, multi: true} ,
    {provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true}  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
