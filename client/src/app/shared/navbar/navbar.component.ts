
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilityService } from '../../utility.service';
import { Menu } from './menu.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public utility: UtilityService, private router: Router, public ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }


  menu: Menu[] = [
    { path: '/main', title: 'Products' },
    { path: '/main/about', title: 'About' },
    { path: '/main/my-products', title: 'My Products' },
    { path: '/main/favourites', title: 'My Favourites' },
    { path: '/main/my-user', title: 'My user' },
  ];

  logout() {
    const sub = this.utility.logout().subscribe({
      next: () => {
        sub.unsubscribe();
        if (window.location.pathname === '/')
          window.location.reload();
        this.router.navigate(['/']);
      },
      error: (res) => console.log(res.error)
    })
  }


  onBurgerClick(event: any) {
    console.log("event:", event);
    const navbarMenu = document.querySelector('.navbar-menu');

    if (!event.target.classList["is-active"]) {
      event.target.classList.toggle('is-active');
      navbarMenu?.classList.toggle('is-active');
    } else {
      event.target.classList.remove('is-active');
      navbarMenu?.classList.remove('is-active');
    }
  }


}
