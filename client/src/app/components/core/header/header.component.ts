import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthState } from '../../../state/auth.state';
import { Store } from '@ngrx/store';
import { authState } from '../../../state/auth.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthApiActions } from '../../../state/auth.actions';
import { PATHS } from '../../../constants/paths';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authState$: Observable<IAuthState> = this.store.select(authState);
  PATHS = PATHS;

  constructor(private store: Store, private router: Router) {}

  handleLogout(event: MouseEvent) {
    event.preventDefault();
    this.store.dispatch(AuthApiActions.logoutUser());
    this.router.navigate(['/']);
  }
}
