import { Component } from '@angular/core';
import { Persona } from '../../persona';
import { PersonaService } from '../../persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  titulo: string = 'Registro de personas.'
  public persona: Persona = new Persona();

  constructor(private personaService: PersonaService,
      private router: Router,
      private activate: ActivatedRoute){}

      ngOnInit(): void {
        this.cargarPersona();
        
      }

cargarPersona():void{
  this.activate.params.subscribe(params =>{
    var id =  params['id']
    if(id){
      this.personaService.getPersona(id).subscribe(
        (persona) => this.persona = persona)
      }
  })
}
  public create(): void{
    this.personaService.create(this.persona).subscribe(
      json =>{
        this.router.navigate(['/personas'])
        Swal.fire('Nueva Persona', `La persona  ${json.persona.nombrePersona} ${json.persona.apellidosPersonas} ha sido creado con éxito! `, 'success')
      } 
    )
  }


  update(): void{
    this.personaService.updatePersona(this.persona)
    .subscribe(p =>{
      this.router.navigate(['/personas'])
      Swal.fire('Persona actualizada', `La persona  ${p.persona.nombrePersona} ${p.persona.apellidosPersonas} ha sido actualizado con éxito! `, 'success')

    }
 ) }


}
