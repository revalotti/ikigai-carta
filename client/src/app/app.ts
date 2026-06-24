import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  template: `
    <router-outlet />
    <app-footer [contactModalOpen]="contactModalOpen()" (contactModalOpenChange)="contactModalOpen.set($event)" />
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }
  `]
})
export class App {
  contactModalOpen = signal(false);
}
