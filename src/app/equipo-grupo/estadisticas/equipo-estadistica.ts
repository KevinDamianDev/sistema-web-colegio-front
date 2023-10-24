import { EquipoGrupo } from "src/app/asignar-equipos/equipo-grupo";

export class EquipoEstadistica {
    idEquipoEstadistica: number;
    puntos: number;
    jugados: number;
    ganados: number;
    empatados: number;
    perdidos: number;
    golesFavor: number;
    golesContra: number;
    diferenciaGoles: number; 
    penales: number;
    equipoGrupo: EquipoGrupo;
}
