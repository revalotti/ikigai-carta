import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

@Component({
  selector: 'app-reservas',
  imports: [HeaderComponent, BookingFormComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {}
