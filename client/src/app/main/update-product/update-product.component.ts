import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
  constructor(private utility: UtilityService, private http: HttpService, private router: Router) {

  }

  ngOnInit() {
    this.len = this.utility.product.price.length;
    this.totalPrice = this.utility.product.price;
    this.numPrice = this.totalPrice.slice(0, this.len - 1);
    this.typePrice = this.totalPrice.slice(this.len - 1);
    // console.log("this.numPrice: ", this.numPrice);
    // console.log("this.typePrice: ", this.typePrice);

    this.form = new FormGroup({
      name: new FormControl(this.utility.product.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.utility.product.description, [Validators.minLength(0)]),
      numberOfPrice: new FormControl(this.numPrice, [Validators.required, Validators.min(1)]),
      typeOfPrice: new FormControl(this.typePrice, [Validators.required]),
      artistName: new FormControl(this.utility.loggedInUser.name, [Validators.required]),
    });
  }
  imagePath: string | null = this.utility.product.imagePath;

  len: number;
  numPrice: string;
  typePrice: string;
  totalPrice: string;
  form: FormGroup;

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get numberOfPrice() {
    return this.form.get('numberOfPrice');
  }

  get typeOfPrice() {
    return this.form.get('typeOfPrice');
  }
  get artistName() {
    return this.form.get('artistName');
  }


  update() {
    const { name, description, numberOfPrice, typeOfPrice, artistName } = this.form.value;
    const price = numberOfPrice + typeOfPrice;
    const product_id = this.utility.product._id;
    const userImage = this.utility.loggedInUser.userImage;

    const sub = this.http.put('products/update', { name, description, artistName, price, product_id, imagePath: this.imagePath, userImage }).subscribe({
      next: () => {
        this.router.navigate(['main/my-products']);
        sub.unsubscribe();
      },
      error: () => {
        const errorRes = document.getElementById('errorRes');
        if (errorRes) {
          errorRes.style.display = 'block';
        };
      }

    })
  }

  async handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.files);
    if (target.files) {
      const file = target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const sub = this.http.post<{ imagePath: string }>('save-image', formData).subscribe({
        next: (res) => {
          console.log(res);
          this.imagePath = res.imagePath;
          sub.unsubscribe();
        },
        error: (res) => console.log(res)
      })
    }
  }
}

