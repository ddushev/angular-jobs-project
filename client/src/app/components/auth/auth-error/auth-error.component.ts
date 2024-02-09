import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthState } from '../../../state/auth.state';
import { Store } from '@ngrx/store';
import { authState } from '../../../state/auth.selector';

@Component({
  selector: 'app-auth-error',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './auth-error.component.html',
  styleUrl: './auth-error.component.scss'
})
export class AuthErrorComponent {
  authState$: Observable<IAuthState> = this.store.select(authState);
  constructor(private store: Store) {}

}
