import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private store: Store, private router: Router) { }

  handleRegister(form: NgForm) {
    if (form.invalid) {
      form.reset();
      return;
    }
    console.log(form.value);
    // this.router.navigate(['/job-listings'])
    // form.reset();
  }
}
