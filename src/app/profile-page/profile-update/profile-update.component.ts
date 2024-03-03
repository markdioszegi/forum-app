import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-update.component.html',
})
export class ProfileUpdateComponent implements OnInit {
  @Input() user!: User;
  pwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  userForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.passwordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(this.pwRegEx),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      this.passwordMatchValidator
    );
  }

  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.passwordForm.get('password');
  }

  onSubmitUser() {
    if (this.userForm.valid) {
      this.userService
        .updateUser(this.user.id, this.userForm.value)
        .subscribe((res) => console.log(res));
    }
  }

  onSubmitPassword() {
    if (this.passwordForm.valid) {
      this.userService
        .updatePassword(this.user.id, {
          password1: this.passwordForm.value.password,
          password2: this.passwordForm.value.confirmPassword,
        }) // ez a rész érdekes
        .subscribe((res) => console.log(res));
    }
  }

  passwordMatchValidator: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    return formGroup.get('password')?.value !==
      formGroup.get('confirmPassword')?.value
      ? { mismatch: true }
      : null;
  };

  trimValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
