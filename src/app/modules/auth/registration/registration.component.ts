import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { CustomValidators } from 'src/app/modules/auth/password.validator';
// import { fadeInAnimation } from '../../route-animations';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  // animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  // host: { '[@fadeInAnimation]': '' }
})
export class RegistrationComponent {
  selectedValue: string;

  constructor(private router: Router, private auth: AuthService, private errorService: MessageService) { }

  registrationForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
    ]),
    usernameFormControl: new FormControl('', []),
    passwordConfirmFormControl: new FormControl('', [
    ]),
  },
    CustomValidators.passwordConfirmValidator
  );

  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' }
  ];

  signinRedirect(): void {
    this.router.navigate(['/signin']);
  }

  registration(): boolean {
    console.log('Started registration');
    debugger

    if (!this.registrationForm.valid) {
      console.log('Error registration');
      this.registrationForm.markAllAsTouched();
      return false;
    }
    const {
      emailFormControl,
      passwordFormControl,
      usernameFormControl,
      passwordConfirmFormControl
    } = this.registrationForm.controls;

    this.auth.register(
      emailFormControl.value,
      passwordFormControl.value,
      usernameFormControl.value
    ).subscribe();
  }
}
