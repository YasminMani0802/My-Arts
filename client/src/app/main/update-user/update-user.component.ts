import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  constructor(private http: HttpService, private router: Router, private utility: UtilityService) {
  }

  ngOnInit() {
    this.user = localStorage.getItem('userDetails');
    this.user = JSON.parse(this.user);
    // console.log("this.user: ", this.user);


    this.form = new FormGroup({
      fullName: new FormControl(this.user.fullName, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, [
        Validators.required,
        Validators.pattern(this.regexPatterns[0].phone)
      ]),
    });
  }

  regexPatterns: any = [
    { phone: /^\+?[0-9]{3}[ -]?[0-9]{6,12}$/ },
  ];

  form: FormGroup;
  user: any;
  userImage: string | null = this.utility.loggedInUser.userImage;




  get fullName() {
    return this.form.get('fullName');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }


  update() {
    const sub = this.http.put('update-user', { ...this.form.value, imagePath: this.userImage }).subscribe({
      next: () => {
        this.router.navigate(['main/my-user']);
        sub.unsubscribe();
      },
      error: () => {
        const errorRes = document.getElementById('errorRes');
        if (errorRes) {
          errorRes.style.display = 'block';
        };
      }

    });
  }


  async handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.files);
    if (target.files) {
      const file = target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const sub = this.http.post<{ imagePath: string }>('save-user-image', formData).subscribe({
        next: (res) => {
          console.log(res);
          this.userImage = res.imagePath;
          sub.unsubscribe();
        },
        error: (res) => console.log(res)
      })

    }

  }

  ngOnDestroy() {
    localStorage.removeItem('userDetails');
  }
}
