import { Component } from '@angular/core';
import { Equipo } from '../../equipo';
import { EquipoService } from '../../equipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventoService } from 'src/app/evento/evento.service';
import { Evento } from 'src/app/evento/evento';
import { EventoEquipo } from '../../evento-equipo';
import { Location } from '@angular/common';
@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html'
})
export class EquipoFormComponent {

  titulo: string = 'Registro de equipos'
  public equipo:Equipo = new Equipo();

   eventoEquipo:EventoEquipo;

  eventoExiste: Evento;
  nombreEvento: string;

  equipoCreado: Equipo = new Equipo();

  idEquipoCreado: number;


  even : EventoEquipo[];
  constructor(private equipoService: EquipoService, private eventoService: EventoService,
    private router: Router,
    private activate: ActivatedRoute,   private location: Location){}


    ngOnInit(): void {
      this.cargarEquipo();
      this.cargarEvento();
      
    }

    cargarEquipo():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.equipoService.getEquipo(id).subscribe(
            (equipo) => this.equipo = equipo)
          }
      })
    }
    cargarEvento():void{
      this.activate.params.subscribe(params =>{
        var idEvento =  params['idEvento']
        console.log('idEvento:' +idEvento)
        if(idEvento){
          this.eventoService.getEventoAgregarFase(idEvento).subscribe(
            (evento) => {
              this.eventoExiste = evento;
              this.nombreEvento = evento.nombreEvento;
            } )
           
          }
         
      })
    }

    public create(): void{
      this.equipoService.create(this.equipo).subscribe(
        json =>{    
        this.idEquipoCreado = json.equipo.idEquipo;
        this.equipoCreado = json.equipo;
        this.createEquipoEvento();
        } 
      )
    }

    createEquipoEvento(): void{
      this.eventoEquipo = new EventoEquipo();
      this.eventoEquipo.equipo = this.equipoCreado;
      this.eventoEquipo.evento = this.eventoExiste;

      console.log(' this.eventoEquip::::'+JSON.stringify(this.eventoEquipo, null, 2));
      this.eventoService.crearEquiposByEventos(this.eventoEquipo).subscribe(        
        p => {
          this.router.navigate(['/detalle/evento/'+this.eventoExiste.idEvento])
          Swal.fire('Nuevo Equipo', `Equipo  ${p.eventoEquipo.equipo.nombreEquipo} ha sido creado  con éxito! `, 'success')
          this.even = p ;
        }
      );    
    }
  
  
    update(): void{
      this.equipoService.updateEquipo(this.equipo)
      .subscribe(p =>{     
        this.router.navigate(['/detalle/evento/'+this.eventoExiste.idEvento])
        Swal.fire('Equipo actualizado', `Equipo  ${p.equipo.nombreEquipo} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }

   cancelar() {
    this.location.back();
  }
}
