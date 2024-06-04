import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreaEvComponent } from './crea-ev/crea-ev.component';
import { authGuard } from './authguard/auth.guard';
import { GenererQrcodeComponent } from './generer-qrcode/generer-qrcode.component';
import { ConfPresComponent } from './conf-pres/conf-pres.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CreaevreussiComponent } from './creaevreussi/creaevreussi.component';
import { ListemargementComponent } from './listemargement/listemargement.component';

export const routes: Routes = [
    {
        path : '', 
        canActivateChild:[authGuard],
        children:[
            {path: 'accueil', component : AccueilComponent},
            { path: '', redirectTo: '/accueil', pathMatch: 'full' },
            { path: 'generate-qrcode/:id_evenement', component: GenererQrcodeComponent },
            { path: '', redirectTo: '/generate-qrcode', pathMatch: 'full' },
            { path: 'crea_ev', component: CreaEvComponent},
            { path: 'listem/:id', component: ListemargementComponent},
            { path: 'creaevreussi', component: CreaevreussiComponent},

        ]
    },
    { path : "login", component : LoginComponent },
    { path: 'conf-pres/:id_evenement', component: ConfPresComponent },
    { path: '', redirectTo: '/conf-pres', pathMatch: 'full' },
    { path: 'error', component: ErrorPageComponent },

]