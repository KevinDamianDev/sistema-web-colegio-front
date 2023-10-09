import { Component } from '@angular/core';
import { Jugador } from '../../jugador';
import { JugadorService } from '../../jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html'
})
export class JugadorFormComponent {

  titulo: string = 'Registro de jugadores.'
  public jugador:Jugador = new Jugador();


  constructor(private jugadorService: JugadorService,
    private router: Router,
    private activate: ActivatedRoute){}

    ngOnInit(): void {
      this.cargarJugador();
      
    }

    cargarJugador():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.jugadorService.getJugador(id).subscribe(
            (j) => this.jugador = j)
          }
      })
    }

    public create(): void{
      this.jugadorService.create(this.jugador).subscribe(
        json =>{
          this.router.navigate(['/jugadores'])
          Swal.fire('Nuevo Jugador', `Jugador  ${json.jugador.nombreJugador} ha sido creado con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.jugadorService.updateJugador(this.jugador)
      .subscribe(p =>{
        this.router.navigate(['/jugadores'])
        Swal.fire('Jugador actualizado', `Jugador  ${p.jugador.nombreJugador} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }



}
