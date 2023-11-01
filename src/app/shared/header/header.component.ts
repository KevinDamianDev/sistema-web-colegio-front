import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/personas/auth.service";
import Swal from 'sweetalert2';
@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
  })

  export class HeaderComponent{
    title: string = "App Angular  ";

    constructor(public auth: AuthService, private router: Router){}

    logout(): void{
      Swal.fire('Logout', `Has cerrado sesión con éxito..!`, 'success');
      this.auth.logout();
      this.router.navigate(['/login'])
    }
}  