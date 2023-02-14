import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../main/http.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpService, private router: Router, private utility: UtilityService) { }

  ngOnInit(): void {
  }
  imagePath: string | null = null;

  regexPatterns: any = [
    { phone: /^\+?[0-9]{3}[ -]?[0-9]{6,12}$/ },
    {
      password:
        '^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$'
    }
  ];

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regexPatterns[0].phone)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regexPatterns[1].password),
    ]),
    isArtist: new FormControl(false)
  });

  get fullName() {
    return this.form.get('fullName');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  get password() {
    return this.form.get('password');
  }
  get isArtist() {
    return this.form.get('isArtist');
  }


  register() {
    const sub = this.http.post('register', { ...this.form.value, imagePath: this.imagePath }).subscribe({
      next: () => {
        alert('ההרשמה בוצעה בהצלחה!');
        sub.unsubscribe();
        this.router.navigate(['login']);
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
          this.imagePath = res.imagePath;
          sub.unsubscribe();
        },
        error: (res) => console.log(res)
      })

    }

  }


}
