import { Component } from '@angular/core';
import { PersonaService } from '../personas/persona.service';
import { Persona } from '../personas/persona';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../evento/evento.service';
import { EventoPersonaServiceService } from './evento-persona-service.service';
import { EventoPersona } from './evento-persona';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-evento-persona',
  templateUrl: './evento-persona.component.html',
  styleUrls: ['./evento-persona.component.css']
})
export class EventoPersonaComponent {

  persona: Persona;
  
 // eventos: Evento[];
 eventoPersonas: EventoPersona[];
 mensajeEventoPersonas: string;

 idPersona: number;


  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private eventoPersonaService: EventoPersonaServiceService
  ){}


  ngOnInit(): void {
    this.cargarPersona();
    this.cargarEventosByPersona();
  }

  cargarPersona(): void{
    this.route.params.subscribe((params) => {
      const idPersona = params['id'];    
      console.log('idPersona:  '+ idPersona)
      if(idPersona){
        this.personaService.getPersona(idPersona).subscribe(
          (p)=>{
            this.persona =p;
            this.idPersona = this.persona.idPersona;
            console.log('this.persona::: --> ', JSON.stringify(this.persona, null, 2));
            //this.idFase = this.fase.idFase;
          })
        }
       })
    }


    cargarEventosByPersona(): void{
      this.route.params.subscribe((params) => {
        const idPersona = params['id'];    
        console.log('idPersona cargarEventosByPersona:  '+ idPersona)
        if(idPersona){
          this.eventoPersonaService.getEventosByPersona(idPersona).subscribe({
            next : (value: any)=>{
              this.eventoPersonas = value;
              console.log('this.eventoPersonas::: --> ', JSON.stringify(this.eventoPersonas, null, 2));
            },
            error : (e: any)=>{
              this.mensajeEventoPersonas = e.error.mensaje;
              console.log('mensajeEventoPersonas: ' + this.mensajeEventoPersonas)
            }
          })
          }
         })
      }
  
      deleteEventoPersona(eventoPersona: EventoPersona): void{
        console.log('eventoPersona::: --> ', JSON.stringify(eventoPersona, null, 2));
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
      
        swalWithBootstrapButtons.fire({
          title: 'Estas Seguro?',
          text: `¿Seguro que deseas eliminar el evento de la persona ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.eventoPersonaService.deletePersonaEvento(eventoPersona.idPersonaEvento).subscribe(
              response => {
                this.cargarEventosByPersona();
                this.eventoPersonas = this.eventoPersonas.filter(p => p!==eventoPersona)
                swalWithBootstrapButtons.fire(
                  'Evento Eliminado!',
                  `Se ha quitado el evento de la persona con exito..!`,
                  'success'
                )
              }
            )
      
          }
        });
      }
}
