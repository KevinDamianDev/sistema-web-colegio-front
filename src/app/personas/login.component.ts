import { Component } from '@angular/core';
import { Persona } from './persona';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  persona: Persona;

  constructor(private auth: AuthService, private router: Router) {
    this.persona = new Persona();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {

      Swal.fire('Login', `Hola ${this.auth.usuario.nombrePersona}, ya estas autenticado..!`, 'info');
      this.router.navigate(['/eventos'])
    }
  }



  login(): void {
    //console.log('this.persona: ' + this.persona);
    if (this.persona.usuarioPersona == null || this.persona.passwordPersona == null) {
      Swal.fire('Error.', 'Usuario o contraseña vacías!', 'error');
      return;
    }

    this.auth.login(this.persona).subscribe(res => {
      //console.log('resposne: ' + res);
     // console.log('this.res::: --> ', JSON.stringify(res, null, 2));

      this.auth.guardarUsuario(res.access_token);
      this.auth.guardarToken(res.access_token);

      console.log(' this.auth.usuario::: --> ', JSON.stringify( this.auth.usuario, null, 2));
   
      if (this.auth.hasRole('ROLE_USER') && this.auth.hasRole('ROLE_ADMIN') ) {
        console.log('role admin -- user')
        this.router.navigate(['/eventos'])
        Swal.fire('Login', `Hola ${this.auth.usuario.nombrePersona}, has iniciado sesion con éxito..!`, 'success');
        
      }

      if (this.auth.hasRole('ROLE_ADMIN') && !this.auth.hasRole('ROLE_USER')) {
        console.log('role solo admin')
        this.router.navigate(['/eventos'])
        Swal.fire('Login', `Hola ${this.auth.usuario.nombrePersona}, has iniciado sesion con éxito..!`, 'success');
        
      }
       
      if (!this.auth.hasRole('ROLE_ADMIN') && this.auth.hasRole('ROLE_USER')) {
        console.log('role solo user')
        this.router.navigate(['/misEventos'])
        Swal.fire('Login', `Hola ${this.auth.usuario.nombrePersona}, has iniciado sesion con éxito..!`, 'success');
        
      }
    }, err => {
      if (err.status == 400) {
        Swal.fire('Error Login', `Usuario o clave incorrectas.!`, 'error');
      }
    }

    );




  }

}
