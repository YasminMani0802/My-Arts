import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyUserComponent } from './my-user/my-user.component';
import { ProductsComponent } from './products/products.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'my-products', component: MyProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'my-products/update', component: UpdateProductComponent },
  { path: 'my-products/add', component: AddProductComponent },
  { path: 'my-favourites', component: MyFavouritesComponent },
  { path: 'my-user', component: MyUserComponent },
  { path: 'my-user/update', component: UpdateUserComponent },
  { path: 'artist-page', component: ArtistPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
