import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BackToTopComponent } from './components/core/back-to-top/back-to-top.component';
import { HomepageService } from './services/homepage/homepage.service';
import { environment } from './environments/environment';
import { Store } from '@ngrx/store';
import { AuthPersistActions } from './state/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CategoriesComponent,
    BackToTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  apiURL = environment.apiURL;

  constructor(public homePage: HomepageService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthPersistActions.loadAuthDataFromLocalStorage());
  }
}
