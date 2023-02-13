import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ProductsComponent } from './products/products.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { SearchPipe } from '../search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { AboutComponent } from './about/about.component';
import { MyUserComponent } from './my-user/my-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';




@NgModule({
  declarations: [
    ProductsComponent,
    MyProductsComponent,
    SearchPipe,
    UpdateProductComponent,
    AddProductComponent,
    MyFavouritesComponent,
    AboutComponent,
    MyUserComponent,
    UpdateUserComponent,
    ArtistPageComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MainModule { }
