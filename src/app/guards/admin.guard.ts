import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.isAdminLoggedIn()) {
    return true;
  }

  // Si no es admin o no tiene token, lo mandamos al login
  return router.createUrlTree(['/admin/login']);
};
