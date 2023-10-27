import { Rol } from "./rol";

export class Persona {
    idPersona: number;
    nombrePersona: string;
    apellidosPersonas: string;
    correoPersona:string;
    dniPersona: number; 
    fechaNacPersona: string;
    estadoPersona: boolean;
    usuarioPersona: string;
    passwordPersona: string;
    roles: Rol[] = [];
    rolesSeleccionados: number[] = []; // Nuevo campo para los roles seleccionados

    constructor() {
        this.rolesSeleccionados = [];
      }
}
