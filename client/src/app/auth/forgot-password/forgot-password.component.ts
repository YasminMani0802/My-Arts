import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/main/http.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private http: HttpService) {
  }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.form.get('email');
  }
  onSubmit() {
    console.log("email: ", this.form.value.email);

    const sub = this.http.post('forgot-password', { email: this.form.value.email }).subscribe({
      next: (res) => {
        console.log(res);
        sub.unsubscribe();
      },
      error: (err) => console.log(err)
    })
  }
}
