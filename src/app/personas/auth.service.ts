import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './persona';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Persona;
  private _token: string;

  public get usuario(): Persona{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario== null && sessionStorage.getItem('usuario')!= null ){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Persona;
      return this._usuario;
    }
    return new Persona();
  }

public get token(): string{
  if(this._token!=null){
    return this._token;
  }else if(this._token== null && sessionStorage.getItem('token')!= null ){
    this._token =sessionStorage.getItem('token');
    return this.token;
  }
  return null;
}

  constructor(private http: HttpClient) { }


  login(usuario: Persona):Observable<any>{
    //const urlEndpoint = 'http://localhost:8080/oauth/token';
    const urlEndpoint = `${environment.apiUrl}/oauth/token`;

    const credenciales = btoa('angularapp' +':'+'12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.usuarioPersona);
    params.set('password', usuario.passwordPersona);

    console.log(params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }


  //----------------------
guardarUsuario(accessToken: string): void{
  let pay = this.obtenerDatosToken(accessToken);
  this._usuario= new Persona();
  this._usuario.idPersona = pay.id_usuario;
  this._usuario.nombrePersona = pay.nombre_usuario;
  this._usuario.apellidosPersonas = pay.apellido_usuario;
  this._usuario.usuarioPersona = pay.user_name;
  //this._usuario.roles = pay.authorities;

  if(pay.authorities){
    console.log('hay roles')
    this._usuario.roles = pay.authorities.map((authority, index) => {
      return {
          idRol: index + 1,
          nombreRoles: authority
      };
  });
  }else{
    console.log('no hjay roles')
    Swal.fire('Error.', 'No hay roles asignados..!', 'error');
  }





  //console.log('this._usuario::: --> ', JSON.stringify(this._usuario, null, 2));
sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

}
//-------------------------
guardarToken(accessToken: string): void{
  this._token=accessToken;
  sessionStorage.setItem('token',accessToken);

}

  obtenerDatosToken(accessToken: string ): any{
    if(accessToken!=null){
      let pay = JSON.parse(atob(accessToken.split(".")[1]));
      return pay;
    }
    return null;
  }

  isAuthenticated(): boolean{
    let p= this.obtenerDatosToken(this.token);
    if(p!=null && p.user_name && p.user_name.length>0 ){
      return true;
    }
    return false;
  }

  logout(): void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  hasRole(roleName: string): boolean {
    //console.log('rol: '+ roleName)
    //console.log('this.usuario.roles --> ', JSON.stringify(this.usuario  , null, 2));
    return this.usuario.roles.some((rol) => rol.nombreRoles === roleName);
  }



}
