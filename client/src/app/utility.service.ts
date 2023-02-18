import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { Product } from "./main/product.interface";
import { HttpService } from "./main/http.service";
import { Router } from "@angular/router";
import { AuthenticateStatus } from "./authenticateStatus.interface";

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isLoggedIn$ = new BehaviorSubject<any>(false);
  loggedInUser: { name: string, userImage: string };
  isArtist: boolean | null = null;
  product: Product;



  constructor(private http: HttpService, private router: Router) {

    // console.log('utility constructor');
    // console.log([this.isArtist$.value, this.loggedInUserName$.value, this.isLoggedIn$.value]);
  }


  ngOnInit() { }

  login(credentials: { email: string, password: string }) {

    return this.http.post<AuthenticateStatus>(`login`, { ...credentials }).pipe(
      tap(({ authenticated, userName, isArtist, userImage }) => {
        this.isLoggedIn$.next(authenticated);
        this.loggedInUser = { name: userName, userImage };
        this.isArtist = isArtist;


      })
    );
    // console.log([this.isArtist$.value, this.loggedInUserName$.value, this.isLoggedIn$.value]);
  }

  checkAuth() {
    return this.http.get<AuthenticateStatus>('user').pipe(
      tap(({ authenticated, userName, isArtist, userImage }) => {
        this.isArtist = isArtist;
        this.loggedInUser = { name: userName, userImage };
        this.isLoggedIn$.next(authenticated);
        if (this.isLoggedIn$.value === false) {
          this.router.navigate(['/'])
        }
      })
    );
  }

  logout() {
    // console.log("logout");

    return this.http.delete(`logout`).pipe(
      tap(() => {
        this.isLoggedIn$.next(false);
        this.isArtist = null;
        // console.log(this.isLoggedIn$.value);
        // console.log(this.loggedInUserName);
        // console.log(this.isArtist);

      })
    );


  }

}