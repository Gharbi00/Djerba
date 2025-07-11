// admin-role.guard.ts
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isBrowser = isPlatformBrowser(this.platformId);

    let userRole: string | null = null;
    
    if (isBrowser) {
      userRole = localStorage.getItem('userRole');
    }

    if (userRole === 'ADMIN') {
      return true;
    }

  
    this.router.navigate(['/login']);
    return false;
  }
}
