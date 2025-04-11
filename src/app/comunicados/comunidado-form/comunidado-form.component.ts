import { Component } from '@angular/core';
import { Comunicado } from '../comunicado';
import { ComunicadoService } from '../comunicado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/personas/auth.service';

@Component({
  selector: 'app-comunidado-form',
  templateUrl: './comunidado-form.component.html'
})
export class ComunidadoFormComponent {
    
  public titulo2: string = 'Registro de comunicados';
   public comunicado: Comunicado = new Comunicado();

    ngOnInit(): void {
      this.cargarComunicado();
    }
  
    constructor(private comunicadoService: ComunicadoService,
      private router: Router,
      private activate: ActivatedRoute,  public auth: AuthService){}
  
 
      cargarComunicado():void{
        this.activate.params.subscribe(params =>{
          var id =  params['id']
          if(id){
            this.comunicadoService.getComunicado(id).subscribe(
              (e) => this.comunicado = e)
            }
        })
      }
      public create(): void{
        this.comunicadoService.create(this.comunicado).subscribe(
          json =>{
            Swal.fire('Nuevo Comunicado', `Comunicado  ${json.comunicado.titulo} ha sido creado con éxito! `, 'success')
            this.router.navigate(['/comunicados'])
            
          } 
        )
      }
    
    
      update(): void{
        this.comunicadoService.updateComunicado(this.comunicado)
        .subscribe(p =>{
          this.router.navigate(['/comunicados' ])
          Swal.fire('Comunicado actualizado', `Comunicado  ${p.comunicado.titulo} ha sido actualizado con éxito! `, 'success')
    
        }
     ) }

}
