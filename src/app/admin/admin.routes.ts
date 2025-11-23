import { Routes } from '@angular/router';

export default [
    {
        path: 'usuario',
        loadComponent: () => import('./usuario/usuario.component').then((m) => m.UsuarioComponent),
    },
    {
        path: 'solicitudes',
        loadComponent: () => import('./solicitudes/solicitudes.component').then((m) => m.SolicitudesComponent),
    },
    {
        path: 'datosolicitudes',
        loadComponent: () => import('./datosolicitud/datosolicitud.component').then((m) => m.DatosolicitudComponent),
    }
] as Routes;
