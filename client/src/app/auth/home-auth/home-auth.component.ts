import { Component } from '@angular/core';
import { HttpService } from 'src/app/main/http.service';
import { Product } from 'src/app/main/product.interface';
import { UtilityService } from 'src/app/main/utility.service';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.scss']
})
export class HomeAuthComponent {
  constructor(public utility: UtilityService, private http: HttpService) {
  }
  products: Product[];

  ngOnInit() {
    const sub = this.http.get<Product[]>('three-products').subscribe({
      next: (products) => {
        this.products = products;
        sub.unsubscribe();
      },
      error: (res) => console.log(res.error)

    })
  }
}
