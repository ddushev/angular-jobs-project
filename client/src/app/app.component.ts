import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SearchComponent } from './core/search/search.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { BackToTopComponent } from './core/back-to-top/back-to-top.component';
import { HomepageService } from './services/homepage/homepage.service';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AboutComponent,
    CategoriesComponent,
    BackToTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  apiURL = environment.apiURL

  constructor(public homePage: HomepageService) {}

}
