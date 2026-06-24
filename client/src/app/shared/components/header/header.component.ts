import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mode = input<'carta' | 'reservas'>('carta');
  logoFailed = signal(false);

  onLogoError(): void {
    this.logoFailed.set(true);
  }
}
