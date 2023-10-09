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
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './personas/form/form/form.component';
import { FormsModule } from '@angular/forms';
import localeEs from  '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from './categorias/categoria.service';
import { CategoriaFormComponent } from './categorias/form/categoria-form/categoria-form.component';
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

  registerLocaleData(localeEs, 'es');
const routes: Routes= [
  {path: '', redirectTo:'/personas', pathMatch: 'full'},
  {path: 'personas', component: PersonasComponent},
  {path: 'personas/form', component: FormComponent},
  {path: 'personas/form/:id', component: FormComponent},

  {path: 'categorias', component: CategoriasComponent},
  {path: 'categorias/form', component: CategoriaFormComponent},
  {path: 'categorias/form/:id', component: CategoriaFormComponent},

  {path: 'equipos', component: EquiposComponent},
  {path: 'equipos/form', component: EquipoFormComponent},
  {path: 'equipos/form/:id', component: EquipoFormComponent},
 // {path: 'equipos/ver/:id', component: DetalleComponent},

 {path: 'jugadores', component: JugadoresComponent},
 {path: 'jugadores/form', component: JugadorFormComponent},
 {path: 'jugadores/form/:id', component: JugadorFormComponent},

 {path: 'eventos', component: EventoComponent},
 {path: 'eventos/form', component: EventoFormComponent},
 {path: 'eventos/form/:id', component: EventoFormComponent},
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
    CategoriasComponent,
    CategoriaFormComponent,
    EquiposComponent,
    EquipoFormComponent,
    DetalleComponent,
    JugadoresComponent,
    JugadorFormComponent,
    DetalleJugadorComponent,
    EventoComponent,
    EventoFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PersonaService, CategoriaService, EquipoService, JugadorService, 
    EventoService,{provide: LOCALE_ID, useValue: 'es' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
