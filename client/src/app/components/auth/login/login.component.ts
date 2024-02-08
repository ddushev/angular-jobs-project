import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthApiActions } from '../../../state/auth.actions';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public emailPattern = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
  constructor(private store: Store, private router: Router) {}

  handleLogin(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    this.store.dispatch(AuthApiActions.loginUser({credentials: form.value}));
    this.router.navigate(['/job-listings'])
    form.reset();
  }
}
