import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Product } from "./product.interface";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isLoggedIn$ = new BehaviorSubject<any>(null);
  loggedInUserName: string = 'guest';
  isArtist: boolean | null = null;
  product: Product;



  constructor(private http: HttpService, private router: Router) {

    // console.log('utility constructor');
    // console.log([this.isArtist$.value, this.loggedInUserName$.value, this.isLoggedIn$.value]);
  }


  ngOnInit() { }

  login(credentials: any) {

    return this.http.post<any>(`login`, { ...credentials }).pipe(
      tap(({ authenticated, userName, isArtist }) => {
        this.isLoggedIn$.next(authenticated);
        this.loggedInUserName = userName;
        this.isArtist = isArtist;


      })
    );
    // console.log([this.isArtist$.value, this.loggedInUserName$.value, this.isLoggedIn$.value]);
  }

  checkAuth() {
    return this.http.get<any>('user').pipe(
      tap(({ authenticated, userName, isArtist }) => {
        this.isArtist = isArtist;
        this.loggedInUserName = userName;
        this.isLoggedIn$.next(authenticated);
        if (this.isLoggedIn$.value === false) {
          this.router.navigate(['/'])
        }
      })
    );
  }

  logout() {
    // console.log("logout");

    return this.http.delete<any>(`logout`).pipe(
      tap(() => {
        this.isLoggedIn$.next(false);
        this.loggedInUserName = 'guest';
        this.isArtist = null;
        // console.log(this.isLoggedIn$.value);
        // console.log(this.loggedInUserName);
        // console.log(this.isArtist);

      })
    );


  }

}