import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GenererQrcodeComponent } from './generer-qrcode/generer-qrcode.component';
import { ConfPresComponent } from './conf-pres/conf-pres.component';


export const routes: Routes = [
    {path : "login", component : LoginComponent },
    { path: 'accueil', component: AccueilComponent }, // Ajouter cette ligne
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'generate-qrcode/:id_evenement', component: GenererQrcodeComponent },
    { path: '', redirectTo: '/generate-qrcode', pathMatch: 'full' },
    { path: 'conf-pres/:id_evenement', component: ConfPresComponent },
    { path: '', redirectTo: '/conf-pres', pathMatch: 'full' }
];
