import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';


export const routes: Routes = [
    {path : "login", component : LoginComponent },
    { path: 'accueil', component: AccueilComponent }, // Ajouter cette ligne
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];
