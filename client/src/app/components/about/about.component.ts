import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../constants/paths';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  PATHS = PATHS;
}
