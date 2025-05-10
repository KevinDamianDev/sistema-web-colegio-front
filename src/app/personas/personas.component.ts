import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import Swal from 'sweetalert2';
import { Mail } from './mail';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit{

  personas: Persona[] = [];
 // cargando: boolean = false;

  paginatedPersonas: Persona[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  ceil = Math.ceil;
  searchTerm: string = '';
  public correo: Mail = new Mail();
  constructor(private personaService: PersonaService){}

  public checkboxSeleccionado: boolean = false;
  public botonesHabilitados: boolean = false;
  public checkboxSeleccionadoG: boolean = false;
  public botonesHabilitadosG: boolean = false;

  ngOnInit():void {
    this.cargarPersonas();
  }

  cargarPersonas(): void{
    this.personaService.getPersonas().subscribe(
      p => {
        this.personas = p;
        this.updatePaginatedPersonas();
      }    
    );
  }
  updatePaginatedPersonas() {
    let filteredPersonas = this.personas;
    if (this.searchTerm) {
      filteredPersonas = this.personas.filter(persona =>
        persona.apellidosPersonas.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredPersonas.length);
    this.paginatedPersonas = filteredPersonas.slice(startIndex, endIndex);
  }
  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedPersonas();
  }


  search(): void {
    this.updatePaginatedPersonas();
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
            this.paginatedPersonas = this.paginatedPersonas.filter(p => p!==persona)
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
  toggleBotones() {
    this.botonesHabilitados = !this.botonesHabilitados;
  }

  toggleBotonesGestionar() {
    this.botonesHabilitadosG = !this.botonesHabilitadosG;
  }

   /*enviarEmail(persona: Persona): void{
    this.cargando = true; // Activar el spinner

    this.correo.email = persona.correoPersona;
    this.correo.nombreUsuario = persona.nombrePersona;
    this.correo.usuario= persona.usuarioPersona;
    this.correo.password= persona.passwordPersona;
    
   // Desactivar el spinner
    this.personaService.enviarEmailCredenciales(this.correo).subscribe((json) => {
      Swal.fire(
        'Credenciales enviadas',
        `Se enviaron las credenciales a la persona exitosamente!`,
        'success'
      );
     

    });

    console.log('email' + this.correo.email )
    console.log('nombreUsuario' + this.correo.nombreUsuario )
    console.log('usuario' + this.correo.usuario )
    console.log('password' + this.correo.password )

    this.personaService.enviarEmailCredenciales(this.correo).subscribe(
      (json) => {
        // Manejo del caso exitoso
        Swal.fire(
          'Credenciales enviadas',
          `Se enviaron las credenciales a la persona exitosamente!`,
          'success'
        ).then((result) => {
          if (result.value) {
            this.cargando = false;
            //this.router.navigate(['/personas']); // Navegar a otra ruta si es necesario
          }
        });
      },
      (error) => {
        // Manejo del error
        this.cargando = false;
        Swal.fire('Error', error.error.error, 'error');

      }
    );
    

  }
*/
}
