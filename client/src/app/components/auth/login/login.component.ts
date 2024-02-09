import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../../state/auth.actions';
import { AsyncPipe, NgClass } from '@angular/common';
import { authState } from '../../../state/auth.selector';
import { Observable } from 'rxjs';
import { IAuthState } from '../../../state/auth.state';
import { AuthErrorComponent } from '../auth-error/auth-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, AsyncPipe, AuthErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  emailPattern = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
  authState$: Observable<IAuthState> = this.store.select(authState);
  constructor(private store: Store) {}

  handleLogin(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    this.store.dispatch(AuthApiActions.loginUser({credentials: form.value}));
    form.reset();
  }
  ngOnDestroy(): void {
    this.store.dispatch(AuthApiActions.clearErrorMsg());
  }
}
