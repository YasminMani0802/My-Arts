import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent {
  myFavourites: Product[] = [];
  searchVal: string = '';

  constructor(private http: HttpService, public utility: UtilityService, private router: Router) { }

  ngOnInit() {
    const sub = this.http.get<Product[]>('products/my-favourites').subscribe({
      next: (products) => {
        this.myFavourites = products;
      },
      error: (res) => console.log(res.error)

    })
  }

  removeFromFavourites(product_id: string) {
    const sub = this.http.delete<Product[]>(`products/remove-from-favourites?product_id=${product_id}`).subscribe({
      next: (favourites) => {
        this.myFavourites = favourites;

      },
      error: (res) => console.log(res.error)

    })
  }

  goToArtistPage(artistName: string) {
    localStorage.setItem('artistName', artistName);
    this.router.navigate(['main/artist-page']);
  }
}
