import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../../state/auth.actions';
import { Observable } from 'rxjs';
import { IAuthState } from '../../../state/auth.state';
import { authState } from '../../../state/auth.selector';
import { AsyncPipe } from '@angular/common';
import { AuthInputValidationDirective } from '../../../directives/auth-input-validation/auth-input-validation.directive';
import { MatchPasswordDirective } from '../../../directives/match-passwords/match-passwords.directive';
import { ServerErrorComponent } from '../../shared/server-error/server-error.component';
import trimFormFields from '../../../utils/trimFormFields';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    ServerErrorComponent,
    AuthInputValidationDirective,
    MatchPasswordDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  authState$: Observable<IAuthState> = this.store.select(authState);

  constructor(private store: Store) {}

  handleRegister(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    this.store.dispatch(
      AuthApiActions.registerUser({ registerData: trimFormFields(form.value) })
    );
    form.reset();
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthApiActions.clearErrorMsg());
  }
}
