import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../../state/auth.actions';
import { Observable } from 'rxjs';
import { IAuthState } from '../../../state/auth.state';
import { authState } from '../../../state/auth.selector';
import { AsyncPipe } from '@angular/common';
import { AuthErrorComponent } from '../auth-error/auth-error.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AsyncPipe, AuthErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  emailPattern = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
  authState$: Observable<IAuthState> = this.store.select(authState);


  constructor(private store: Store) { }

  handleRegister(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    this.store.dispatch(AuthApiActions.registerUser({registerData: form.value}));
    form.reset();
  }

 ngOnDestroy(): void {
  this.store.dispatch(AuthApiActions.clearErrorMsg());
 }
}
