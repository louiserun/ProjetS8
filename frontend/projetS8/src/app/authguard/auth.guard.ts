import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuth){
    console.log("Connecté");
    return true;
  }
  else{
    console.log("Pas connecté");
    return router.parseUrl('login');
  }
};
