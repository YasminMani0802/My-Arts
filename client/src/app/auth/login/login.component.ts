import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../main/http.service';
import { UtilityService } from '../../main/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  resError: string | null;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$'
      ),
    ])
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }



  login() {
    const { email, password } = this.form.value;
    const sub = this.utility.login({ email, password }).subscribe({
      next: (res) => {
        // console.log(res);
        this.router.navigate(['/main']);
        sub.unsubscribe();
      },
      error: (res) => {
        this.resError = res.error;
        this.utility.isArtist = null;
      }
    })


  }

  constructor(private http: HttpService, private router: Router, public utility: UtilityService) { }

  ngOnInit(): void { }
}
