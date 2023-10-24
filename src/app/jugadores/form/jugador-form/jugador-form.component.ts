import { Component } from '@angular/core';
import { Jugador } from '../../jugador';
import { JugadorService } from '../../jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EquipoJugador } from '../../equipo-jugador';
import { Equipo } from 'src/app/equipos/equipo';
import { EquipoService } from 'src/app/equipos/equipo.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html'
})
export class JugadorFormComponent {

  titulo: string = 'Registro de jugadores.'
  public jugador:Jugador = new Jugador();

  //public equipoJugador:EquipoJugador = new EquipoJugador();

  equipo: Equipo;
  jugadorCreado: Jugador;

  equipoJugadorNuevo: EquipoJugador;

  constructor(private jugadorService: JugadorService,  private location: Location,
    private activate: ActivatedRoute, private equipoService: EquipoService){}

    ngOnInit(): void {
      this.cargarJugador();
      this.cargarEquipo();
      
    }

    cargarJugador():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        console.log('idjugador' + id);
        if(id){
          this.jugadorService.getJugador(id).subscribe(
            (j) => this.jugador = j)
          }
      })
    }


    cargarEquipo():void{
      this.activate.params.subscribe(params =>{
        var idEquipo =  params['idEquipo']
        console.log('idEquipo' + idEquipo);
        if(idEquipo){
          this.equipoService.getEquipo(idEquipo).subscribe(
            (e) => {
              this.equipo = e;
            })
          }
      })
    }





    public create(): void{
      this.jugadorService.create(this.jugador).subscribe(
        json =>{
          this.jugadorCreado = json.jugador;
          console.log('this.jugador:: --> ', JSON.stringify(this.jugador,
            null, 2));
            console.log('this.jugadorCreado::: --> ', JSON.stringify(this.jugadorCreado,
               null, 2));
               this.createEquipoJugador();
         // this.router.navigate(['/jugadores'])
          //Swal.fire('Nuevo Jugador', `Jugador  ${json.jugador.nombreJugador} ha sido creado con éxito! `, 'success')
        } 
      )
    }

    createEquipoJugador(): void{
      this.equipoJugadorNuevo =  new EquipoJugador();

      this.equipoJugadorNuevo.equipo = this.equipo;
      this.equipoJugadorNuevo.jugador = this.jugadorCreado;
      console.log('this.equipoJugadorNuevo::: --> ', JSON.stringify(this.equipoJugadorNuevo,     null, 2));

      this.jugadorService.createEquipoJugador(this.equipoJugadorNuevo).subscribe(
        (j) =>{
          //this.router.navigate(['/detalle/evento/'+this.eventoExiste.idEvento])
          this.back();
          Swal.fire('Nuevo jugador', `Jugador ha sido creado  con éxito! `, 'success')
        }
      )

    }


  
  
    update(): void{
      this.jugadorService.updateJugador(this.jugador)
      .subscribe(p =>{
        //this.router.navigate(['/jugadores'])
        this.back();
        Swal.fire('Jugador actualizado', `Jugador  ${p.jugador.nombreJugador} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }

   back() {
    this.location.back(); // Esto navegará hacia atrás en la historia de navegación
  }

}
