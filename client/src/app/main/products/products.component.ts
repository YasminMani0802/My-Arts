import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  searchVal: string = '';
  constructor(private http: HttpService, public utility: UtilityService, private router: Router) { }

  ngOnInit() {
    const sub = this.http.get<Product[]>('products').subscribe({
      next: (products) => {
        products.forEach(product => {
          const secSub = this.http.get<{ isFavourite: boolean }>(`products/is-favourite?product_id=${product._id}`).subscribe({
            next: (res) => {
              // console.log(res);

              product.isFavourite = res.isFavourite;
              secSub.unsubscribe();
            },
            error: (res) => console.log(res.error)
          })
        })
        sub.unsubscribe();
        this.products = products;
      },
      error: (res) => console.log(res.error)

    })
  }

  addToFavourites(product_id: string) {
    const sub = this.http.post<Product[]>(`products/add-to-favourites`, { product_id }).subscribe({
      next: () => {
        this.products.forEach((product) => {
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
        this.products.forEach((product) => {
          if (product._id === product_id) {
            product.isFavourite = false;
          }
        });
      },
      error: (res) => console.log(res.error)

    })
  }

  goToArtistPage(artistName: string) {
    localStorage.setItem('artistName', artistName);
    this.router.navigate(['main/artist-page']);
  }
}
