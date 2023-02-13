import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  constructor(private utility: UtilityService, private http: HttpService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      numberOfPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      typeOfPrice: new FormControl('$', [Validators.required]),
      artistName: new FormControl(this.utility.loggedInUserName, [Validators.required]),
    });
  }
  imagePath: string | null = null;

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


  add() {
    const { name, description, numberOfPrice, typeOfPrice, artistName } = this.form.value;
    const price = numberOfPrice + typeOfPrice;

    const sub = this.http.post('products/add', {
      name, description, artistName, price, imagePath: this.imagePath
    }).subscribe({
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
