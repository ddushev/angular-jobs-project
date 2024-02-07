import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private router: Router) { }

  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
