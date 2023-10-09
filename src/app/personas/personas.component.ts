import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent implements OnInit{

  personas: Persona[];

  constructor(private personaService: PersonaService){}

  ngOnInit():void {
    this.personaService.getPersonas().subscribe(
      p => this.personas = p
     
    );
  }

  delete(persona: Persona): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que deseas eliminar a ${persona.nombrePersona} ${persona.apellidosPersonas} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.delete(persona.idPersona).subscribe(
          response => {
            this.personas = this.personas.filter(p => p!==persona)
            swalWithBootstrapButtons.fire(
              'Persona Eliminado!',
              `Persona ${persona.nombrePersona} eliminada con exito..!`,
              'success'
            )
          }
        )
  
      }
    });
  }

}
