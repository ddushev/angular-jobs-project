import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../../state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
