import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private utility: UtilityService, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.utility.isLoggedIn$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap(authenticated => {
        console.log('authguard');
        if (!authenticated) {
          console.log('authguard inside if block');

          console.log(authenticated);

          this.router.navigate(['/']);
        }
      })

    );
  }
}

/* if (this.utility.loggedInUserName !== 'guest') {
  return true;
} else {
  this.router.navigate(['/']);
  return false;
}
 */
