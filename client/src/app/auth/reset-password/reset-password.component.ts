import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private formBuilder: FormBuilder) { }
  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(
      '^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$'
    )]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(
      '^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$'
    )]),
  });

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  onSubmit() { }
}
