import { Component } from '@angular/core';
import { Persona } from '../../persona';
import { PersonaService } from '../../persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../rol';
import { Mail } from '../../mail';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  titulo: string = 'Registro de personas.'
  public persona: Persona = new Persona();
  cargando: boolean = false;
  //public correo: Mail = new Mail();

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activate: ActivatedRoute,  public auth: AuthService) { }

  ngOnInit(): void {
    this.cargarPersona();

  }

  public roles: Rol[] = [
    { idRol: 1, nombreRoles: 'ROLE_ADMIN' },
    { idRol: 2, nombreRoles: 'ROLE_USER' },
  ];

  create(): void {
    const personaParaEnviar = {
      nombrePersona: this.persona.nombrePersona,
      apellidosPersonas: this.persona.apellidosPersonas,
      dniPersona: this.persona.dniPersona,
      telefonoPersona: this.persona.telefonoPersona,
      fechaNacPersona: this.persona.fechaNacPersona,
      correoPersona: this.persona.correoPersona,
      usuarioPersona: this.persona.usuarioPersona,
      passwordPersona: this.persona.passwordPersona,
      estadoPersona: this.persona.estadoPersona,
      roles: this.persona.rolesSeleccionados.map((idRol) => {
        return { idRol };
      }),
    };
    //console.log('this.personaParaEnviar::: --> ', JSON.stringify(personaParaEnviar, null, 2));
    this.personaService.create(personaParaEnviar).subscribe((json) => {
      this.router.navigate(['/personas']);
      //this.enviarEmail();
      Swal.fire(
        'Nueva Persona',
        `La persona ${json.persona.nombrePersona} ${json.persona.apellidosPersonas} ha sido creada con éxito!`,
        'success'
      );
    });
  }





  public update(): void {
    // Formatea los roles seleccionados antes de actualizar la persona
    const personaParaActualizar = {
      idPersona: this.persona.idPersona,
      nombrePersona: this.persona.nombrePersona,
      apellidosPersonas: this.persona.apellidosPersonas,
      dniPersona: this.persona.dniPersona,
      telefonoPersona: this.persona.telefonoPersona,
      fechaNacPersona: this.persona.fechaNacPersona,
      correoPersona: this.persona.correoPersona,
      usuarioPersona: this.persona.usuarioPersona,
      passwordPersona: this.persona.passwordPersona,
      estadoPersona: this.persona.estadoPersona,
      roles: this.persona.rolesSeleccionados.map((idRol) => {
        return { idRol }; // Debes llenar el nombreRoles apropiadamente
      }),
    };
    //console.log('this.personaParaActualizar::: --> ', JSON.stringify(personaParaActualizar, null, 2));
    this.personaService.updatePersona(personaParaActualizar).subscribe((p) => {
      this.router.navigate(['/personas']);
      Swal.fire(
        'Persona actualizada',
        `La persona ${p.persona.nombrePersona} ${p.persona.apellidosPersonas} ha sido actualizada con éxito!`,
        'success'
      );
    });
  }


  cargarPersona(): void {
    this.activate.params.subscribe((params) => {
      var id = params['id'];
      if (id) {
        this.personaService.getPersona(id).subscribe((persona) => {
          this.persona = persona;
          //console.log('this.persona carga::: --> ', JSON.stringify(this.persona, null, 2));
          // Inicializa persona.rolesSeleccionados como un arreglo vacío por defecto
          this.persona.rolesSeleccionados = this.persona.rolesSeleccionados || [];

          // Sincroniza los roles seleccionados con los roles de la persona
          this.roles.forEach((rol) => {
            if (this.persona.roles.some((selectedRol) => selectedRol.idRol === rol.idRol)) {
              // Si el rol está en los roles de la persona, marca el checkbox
              this.persona.rolesSeleccionados.push(rol.idRol);
            }
          });
        });
      }
    });
  }


  toggleRol(idRol: number): void {
    if (this.persona.rolesSeleccionados.includes(idRol)) {
      this.persona.rolesSeleccionados = this.persona.rolesSeleccionados.filter((id) => id !== idRol);
    } else {
      this.persona.rolesSeleccionados.push(idRol);
    }
  }


/*  enviarEmail(): void{
    this.cargando = true; // Activar el spinner

    this.correo.email = this.persona.correoPersona;
    this.correo.nombreUsuario = this.persona.nombrePersona;
    this.correo.usuario= this.persona.usuarioPersona;
    this.correo.password= this.persona.passwordPersona;
    
   // Desactivar el spinner
   /* this.personaService.enviarEmailCredenciales(this.correo).subscribe((json) => {
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
    

  }*/
}
