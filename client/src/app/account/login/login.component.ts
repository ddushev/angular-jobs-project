import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthState } from '../../state/auth.state';
import { Store } from '@ngrx/store';
import { authState } from '../../state/auth.selector';
import { Observable } from 'rxjs';
import { AuthApiActions } from '../../state/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private store: Store) {}

  handleLogin(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    this.store.dispatch(AuthApiActions.loginUser({credentials: form.value}));
    form.reset();
  }
}
