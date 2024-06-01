
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/loginService';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../Services/sweetAlertService';
import { PartyService } from '../../Services/partyManagementService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: LoginService,
    private alertService: AlertService,
    private partyService: PartyService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      response => {
        console.log('Login successful', response.token);
        this.partyService.token = response.token;
        // localStorage.setItem('token',response.token);
        this.alertService.showAlert('Login Successful', 'Welcome!');
        this.router.navigate(['/party']);
      },
      error => {
        console.error('Login failed', error);
        this.alertService.showAlert('Login Failed', 'Invalid username or password', 'error');
      }
    );

  }

  // this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
  //   .subscribe(
  //     loggedIn => {
  //       if (loggedIn) {
  //         this.alertService.showAlert('Login Successful', 'Welcome!');
  //       } else {
  //         this.alertService.showAlert('Login Failed', 'Invalid username or password', 'error');
  //       }
  //     }
  //   );


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
