import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreaEvComponent } from './crea-ev/crea-ev.component';
import { authGuard } from './authguard/auth.guard';


export const routes: Routes = [
    {
        path : '', 
        canActivateChild:[authGuard],
        children:[
            {path: 'accueil', component : AccueilComponent},
            {path: 'crea_ev', component: CreaEvComponent}
        ]
    },

    { path: 'login', component: LoginComponent}
];
