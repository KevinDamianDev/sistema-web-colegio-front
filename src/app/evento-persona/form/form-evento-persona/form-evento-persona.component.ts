import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/evento/evento';
import { EventoService } from 'src/app/evento/evento.service';
import { Persona } from 'src/app/personas/persona';
import { PersonaService } from 'src/app/personas/persona.service';
import { EventoPersona } from '../../evento-persona';
import { EventoPersonaServiceService } from '../../evento-persona-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-evento-persona',
  templateUrl: './form-evento-persona.component.html'
})
export class FormEventoPersonaComponent {

  persona: Persona;
  eventos: Evento[];
  eventosVacio: any[];
  titulo: string = 'Asignación de eventos a'

  public personaEvento: EventoPersona = new EventoPersona();

  //selectedEvento: Evento;

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private eventoPersonaService: EventoPersonaServiceService,
    private router: Router
  ){ 
    // this.selectedEvento = null; // Inicializa con el valor "--Seleccionar Evento--"
}


  ngOnInit(): void {
    this.cargarPersona();
    this.eventoService.getEventos().subscribe(eventos => {
      this.eventos = eventos;
      //this.selectedEvento = eventos[0]; // Inicializa con el primer evento o el valor que desees
    });
  }
  
  
  cargarPersona(): void{
    this.route.params.subscribe((params) => {
      const idPersona = params['id'];    
      console.log('idPersona:  '+ idPersona)
      if(idPersona){
        this.personaService.getPersona(idPersona).subscribe(
          (p)=>{
            this.persona =p;
          })
        }
       })
    }

    create(): void{
      this.personaEvento.persona = this.persona;
      console.log('this.personaEvento::: --> ', JSON.stringify(this.personaEvento, null, 2));
      this.eventoPersonaService.createPersonaEvento(this.personaEvento).subscribe(
        response =>{
          this.router.navigate(['/personas/evento/',this.persona.idPersona]);
          Swal.fire('Evento Asignado', `El evento ha sido asignado con éxito! `, 'success')
        }
      )

      console.log(' this.personaEvento::: --> ', JSON.stringify(this.personaEvento, null, 2));
    }

    /*public create(): void{
      this.duelo.fecha = this.fecha;
      this.dueloService.create(this.duelo).subscribe(
        json =>{
          this.cancelar();
          //this.router.navigate(['/duelos'])
          Swal.fire('Nuevo Duelo', `Duelo  ${json.duelo.nombreDuelo} ha sido creado con éxito! `, 'success')
        } 
      )
    }*/

    compararEvento(o1:Evento, o2: Evento){
      //return o1 ===null || o2===null?false: o1.idCategoria===o2.idCategoria;
      if(o1===undefined && o2===undefined){
        return true;
      
      }
        return o1==null || o2==null?false: o1.idEvento===o2.idEvento;
    }
}
