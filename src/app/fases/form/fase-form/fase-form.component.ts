import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Fase } from '../../fase';
import { Evento } from 'src/app/evento/evento';
import { EventoService } from 'src/app/evento/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from '../../fases.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-fase-form',
  templateUrl: './fase-form.component.html'
})
export class FaseFormComponent {

  titulo: string = 'Registro de fases'
  public fase: Fase = new Fase();
  nombreEvento: string;

  public faseEvento: Fase = new Fase();

  eventos: Evento[];

  eventoExiste: Evento;

  constructor(private eventoService: EventoService,
    private router: Router,
    private activate: ActivatedRoute,
    private faseService: FasesService,
    private location: Location){}

    ngOnInit(): void {
      this.cargarFase();
      this.cargarEvento();

    }

    cargarFase():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.faseService.getFase(id).subscribe(
            (e) => {
              this.fase = e;
              this.faseEvento = e;
            // this.nombreEvento = this.fase.evento.nombreEvento;
            })
          }
          console.log('this.fase' +this.fase)
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
              this.nombreEvento= this.eventoExiste.nombreEvento;
            } )
          }
         
      })
    }

   /* public create(): void{
      this.faseService.create(this.fase).subscribe(
        json =>{
          this.router.navigate(['/fases'])
          Swal.fire('Nueva Fase', `Fase  ${json.fase.nombreFase} ha sido creada con éxito! `, 'success')
        } 
      )
    }*/

    public createFaseByEvento(): void{
      this.faseEvento.evento = this.eventoExiste;
      this.faseService.create(this.faseEvento).subscribe(
        json =>{
          this.router.navigate(['/detalle/evento/'+this.eventoExiste.idEvento])
          Swal.fire('Nueva Fase', `Fase  ${json.fase.nombreFase} ha sido creada con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.faseService.updateFase(this.fase)
      .subscribe(p =>{
        this.router.navigate(['/detalle/evento/'+this.fase.evento.idEvento])
        Swal.fire('Fase actualizada', `Fase  ${p.fase.nombreFase} ha sido actualizada con éxito! `, 'success')
  
      }
   ) }


   compararEvento(o1:Evento, o2: Evento){
    if(o1===undefined && o2===undefined){
      return true;
    
    }
      return o1==null || o2==null?false: o1.idEvento===o2.idEvento;
  }

  cancelar() {
    this.location.back();
  }
}
