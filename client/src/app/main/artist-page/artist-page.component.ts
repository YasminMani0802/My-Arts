import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Product } from '../product.interface';
import { User } from '../user.interface';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent {
  constructor(private http: HttpService, private router: Router) { }
  ngOnInit() {
    const artistName = localStorage.getItem('artistName');
    const sub = this.http.get<{ user: User }>(`artist-by-name?artist_name=${artistName}`).subscribe({
      next: (res) => {
        this.user = res.user;
        const secSuc = this.http.get<Product[]>(`products/artist-products?artist_id=${this.user._id}`).subscribe({
          next: (res) => {
            this.artistProducts = res;
            secSuc.unsubscribe();
          },
          error: (res) => console.log(res.error)
        })
        sub.unsubscribe();
      },
      error: (res) => console.log(res.error)
    })
  }

  user: any;
  artistProducts: Product[];
  searchVal: string = '';

  addToFavourites(product_id: string) {
    const sub = this.http.post<Product[]>(`products/add-to-favourites`, { product_id }).subscribe({
      next: () => {
        this.artistProducts.forEach((product) => {
          if (product._id === product_id) {
            product.isFavourite = true;
          }
        });

      },
      error: (res) => console.log(res.error)

    })
  }

  removeFromFavourites(product_id: string) {
    const sub = this.http.delete<Product[]>(`products/remove-from-favourites?product_id=${product_id}`).subscribe({
      next: () => {
        this.artistProducts.forEach((product) => {
          if (product._id === product_id) {
            product.isFavourite = false;
          }
        });
      },
      error: (res) => console.log(res.error)

    })
  }

  ngOnDestroy() {
    localStorage.removeItem('artistName');
  }
}
