// admin-role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = localStorage.getItem('userRole');  // Retrieve role from localStorage

    // If userRole is 'ADMIN', allow access, otherwise redirect to another route
    if (userRole === 'ADMIN') {
      return true;
    }

    // If not 'ADMIN', redirect to a different page (e.g., login or home)
    this.router.navigate(['/login']);  // You can modify this route as needed
    return false;
  }
}
