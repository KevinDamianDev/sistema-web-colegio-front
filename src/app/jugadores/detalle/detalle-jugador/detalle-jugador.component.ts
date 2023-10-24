import { Component, Input } from '@angular/core';
import { Jugador } from '../../jugador';
import { JugadorService } from '../../jugador.service';
import { ActivatedRoute } from '@angular/router';
import { ModalJugadorServiceService } from './modal-jugador-service.service';
import Swal from 'sweetalert2';
import { EquipoJugador } from '../../equipo-jugador';
@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.component.html',
  styleUrls: ['./detalle-jugador.component.css']
})
export class DetalleJugadorComponent {

  @Input() jugador: Jugador;

 // @Input() equipoJugador: EquipoJugador;

  titulo: string = "Detalle del jugador."

  constructor(private jugadorService: JugadorService,
    public modalService: ModalJugadorServiceService){}
    public fotoS: File;

    cerrarModal(){
      this.modalService.cerrarModal();
      this.fotoS=null;
    }

    seleccionarFoto(event){
      this.fotoS = event.target.files[0];
      console.log(this.fotoS);
        if(this.fotoS.type.indexOf('image')<0 ){
          //this.fotoS = null;
          Swal.fire('Error!','El archivo debe ser de tipo imagen.','error');
          this.fotoS = null;
      }
    }

    subirFoto(){
      console.log(" subirFoto" +this.fotoS);
      if(!this.fotoS){
        Swal.fire('Error!','Debe seleccionar una foto.','error');
      }else{
      this.jugadorService.subirFoto(this.fotoS, this.jugador.idJugador)
      .subscribe(jugador =>{
       this.jugador = jugador;
      // this.equipoJugador.jugador = jugador;

        console.log('jugador modal:::', JSON.stringify(this.jugador, null, 2));

       //this.modalService._notifica.emit(this.equipoJugador);
        this.modalService._notifica.emit(this.jugador);
        Swal.fire('Subido exitosa.!','La foto se ha subido correctamente.','success')
        this.fotoS = null;
      });
    }

    }

}
