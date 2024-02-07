import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../account/auth/auth.service';
import { Observable } from 'rxjs';
import { AuthState } from '../../state/auth.state';
import { Store } from '@ngrx/store';
import { authState } from '../../state/auth.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthApiActions } from '../../state/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authState$: Observable<AuthState> = this.store.select(authState);
  constructor(private store: Store) {}

  handleLogout(event: MouseEvent) {
    event.preventDefault();
    this.store.dispatch(AuthApiActions.logoutUser());
  }
}
