import { Routes } from '@angular/router';

import { PagosComponent } from './pages/pagos/pagos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { RutaDetalleComponent } from './pages/ruta-detalle/ruta-detalle.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { TuristasComponent } from './pages/turista/turista.component';
import { AuxiliarComponent } from './pages/auxiliar/auxiliar.component';

import { CrearRutaComponent } from './pages/crear-ruta/crear-ruta.component';
import { EditarRutaComponent } from './pages/editar-ruta/editar-ruta.component';
import { EliminarRutaComponent } from './pages/eliminar-ruta/eliminar-ruta.component';
import { VerReservasComponent } from './pages/ver-reservas/ver-reservas.component';
import { VerRutasComponent } from './pages/ver-rutas/ver-rutas.component';

export const routes: Routes = [

    // HOME
    {
        path: '',
        component: HomeComponent
    },

    // LOGIN
    {
        path: 'login',
        component: LoginComponent
    },

    // REGISTER
    {
        path: 'register',
        component: RegisterComponent
    },

    // RUTAS
    {
        path: 'rutas',
        component: RutasComponent
    },

    // RESERVA
    {
        path: 'reserva',
        component: ReservaComponent
    },

    // DETALLE RUTA
    {
        path: 'ruta-detalle',
        component: RutaDetalleComponent
    },

    // ADMINISTRADOR
    {
        path: 'administrador',
        component: AdministradorComponent
    },

    // CREAR RUTA
    {
        path: 'crear-ruta',
        component: CrearRutaComponent
    },

    // EDITAR RUTA
    {
        path: 'editar-ruta',
        component: EditarRutaComponent
    },

    // ELIMINAR RUTA
    {
        path: 'eliminar-ruta',
        component: EliminarRutaComponent
    },

    // RESERVAS
    {
        path: 'reservas',
        component: VerReservasComponent
    },

    // TURISTAS
    {
        path: 'turistas',
        component: TuristasComponent
    },

    // GUIA
    {
        path: 'guia',

        loadComponent: () =>
            import('./pages/guia/guia.component')
                .then(m => m.GuiaComponent)
    },

    // AUXILIAR
    {
        path: 'auxiliar',
        component: AuxiliarComponent
    },

   // PAGOS
{
    path: 'pagos',
    component: PagosComponent
},

// VER RUTAS
{
    path: 'ver-rutas',
    component: VerRutasComponent
},

// ERROR
{
    path: '**',
    redirectTo: ''
}

];