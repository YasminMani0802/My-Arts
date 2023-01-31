import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take } from 'rxjs';
import { UtilityService } from '../main/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private utility: UtilityService) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.utility.isLoggedIn$.pipe(
      skipWhile(value => value === null),
      take(1)

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
