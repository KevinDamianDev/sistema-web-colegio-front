import { Component } from '@angular/core';
import { Evento } from '../../evento';
import { EventoService } from '../../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocenteService } from 'src/app/docentes/docente.service';
import { Docente } from 'src/app/docentes/docente';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html'
})
export class EventoFormComponent {

  titulo: string = 'Registro de eventos.'
  public evento: Evento = new Evento();
  //categorias: Categoria[];

  constructor(private eventoService: EventoService,
    private router: Router,
    private activate: ActivatedRoute//,
   // private categoriaService: CategoriaService
  ){}

    ngOnInit(): void {
      this.cargarEvento();
      
      //this.categoriaService.getCategorias().subscribe(ca=>this.categorias=ca);

    }

    cargarEvento():void{
      this.activate.params.subscribe(params =>{
        var id =  params['id']
        if(id){
          this.eventoService.getEvento(id).subscribe(
            (e) => this.evento = e)
          }
      })
    }

    public create(): void{
      this.eventoService.create(this.evento).subscribe(
        json =>{
          this.router.navigate(['/eventos'])
          Swal.fire('Nueva Evento', `Evento  ${json.evento.nombreEvento} ha sido creado con éxito! `, 'success')
        } 
      )
    }
  
  
    update(): void{
      this.eventoService.updateEvento(this.evento)
      .subscribe(p =>{
        this.router.navigate(['/eventos'])
        Swal.fire('Evento actualizado', `Evento  ${p.evento.nombreEvento} ha sido actualizado con éxito! `, 'success')
  
      }
   ) }


  /*--Seleccionar compararCategoria(o1:Categoria, o2: Categoria){
    //return o1 ===null || o2===null?false: o1.idCategoria===o2.idCategoria;
    if(o1===undefined && o2===undefined){
      return true;
    
    }
      return o1==null || o2==null?false: o1.idCategoria===o2.idCategoria;
  }*/

}
