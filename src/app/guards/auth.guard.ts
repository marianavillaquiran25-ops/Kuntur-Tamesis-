import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  // VALIDAR SI EXISTE USUARIO
  const usuario = localStorage.getItem('usuario');

  // SI NO HAY LOGIN
  if (!usuario) {

    alert('Debes iniciar sesión');

    router.navigate(['/login']);

    return false;
  }

  // SI HAY LOGIN
  return true;
};