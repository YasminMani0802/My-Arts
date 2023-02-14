import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$: BehaviorSubject<boolean | null>;


  constructor(public utility: UtilityService) {

  }
  ngOnInit() {
    this.isLoggedIn$ = this.utility.isLoggedIn$;

    const sub = this.utility.checkAuth().subscribe({
      next: () => {
        console.log('checkAuth: ');
        console.log([this.utility.isArtist, this.utility.isLoggedIn$.value, this.utility.loggedInUser]);
        sub.unsubscribe();
      }
    })
  }



}
