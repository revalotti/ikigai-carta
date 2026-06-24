import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../../core/services/booking.service';
import { BookingType } from '../../../../core/models/booking.model';
import { CalendarComponent } from '../calendar/calendar.component';

const MASAJES_LIST = [
  'Masaje relajante Ikigai (30 min)',
  'Masaje relajante Ikigai (50 min)',
  'Masaje de Tejido profundo (30 min)',
  'Masaje de Tejido profundo (50 min)',
  'Masaje Californiano',
  'Masaje con piedras calientes',
  'Masaje craneal Hindú',
  'Reflexología + Masaje de pies',
];

const RITUALES_LIST = [
  'Ritual Ikigai',
  'Ritual Exprés Ikigai',
  'Ritual Ikigai en pareja',
];

@Component({
  selector: 'app-booking-form',
  imports: [FormsModule, CalendarComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
  readonly booking = inject(BookingService);

  calendarOpen = signal(false);
  showError = signal(false);

  readonly treatmentOptions = computed(() => {
    const type = this.booking.serviceType();
    if (type === 'masaje') return MASAJES_LIST;
    if (type === 'ritual') return RITUALES_LIST;
    return [];
  });

  readonly showTreatmentSelect = computed(() => {
    const t = this.booking.serviceType();
    return t === 'masaje' || t === 'ritual' || t === 'bono_mensual';
  });

  readonly showTreatmentCheckboxes = computed(() => this.booking.serviceType() === 'bono_regalo');

  readonly showDateField = computed(() => {
    const t = this.booking.serviceType();
    return t === 'masaje' || t === 'ritual';
  });

  readonly hint = computed(() => {
    if (this.showError() && this.booking.missingFields().length > 0) {
      return 'Por favor, completa los siguientes campos: ' + this.booking.missingFields().join(', ');
    }
    const type = this.booking.serviceType();
    if (!type) return 'Selecciona primero el tipo de servicio para continuar.';
    if (type === 'masaje' || type === 'ritual') return 'Selecciona tratamiento y fecha. El mensaje se completará automáticamente.';
    if (type === 'bono_mensual') return 'Bono mensual: selecciona el tratamiento. Confirmaremos disponibilidad contigo.';
    if (type === 'bono_regalo') return 'Bono regalo: puedes seleccionar varios tratamientos.';
    return '';
  });

  readonly isHintError = computed(() => this.showError() && this.booking.missingFields().length > 0);
  readonly allTreatments = computed(() => [...MASAJES_LIST, ...RITUALES_LIST]);
  readonly formattedDate = computed(() => this.booking.formatDateES(this.booking.date()));

  onServiceTypeChange(value: string): void {
    this.booking.serviceType.set((value as BookingType) || null);
    this.booking.treatment.set('');
    this.booking.treatments.set([]);
    this.booking.date.set('');
    this.calendarOpen.set(false);
    this.showError.set(false);
    if (value === 'bono_mensual') {
      this.booking.treatment.set('Masaje de Tejido profundo');
    }
  }

  onTreatmentChange(value: string): void {
    this.booking.treatment.set(value);
  }

  onCheckboxChange(name: string, checked: boolean): void {
    const current = this.booking.treatments();
    this.booking.treatments.set(
      checked ? [...current, name] : current.filter(t => t !== name)
    );
  }

  isChecked(name: string): boolean {
    return this.booking.treatments().includes(name);
  }

  toggleCalendar(): void {
    this.calendarOpen.update(v => !v);
  }

  onDateSelected(iso: string): void {
    const d = new Date(iso + 'T12:00:00');
    if (d.getDay() === 0) return;
    this.booking.date.set(iso);
    this.calendarOpen.set(false);
  }

  clearDate(): void {
    this.booking.date.set('');
    this.calendarOpen.set(false);
  }

  onWhatsappClick(e: Event): void {
    e.preventDefault();
    if (!this.booking.isValid()) { this.showError.set(true); return; }
    this.booking.openWhatsapp();
  }

  onEmailClick(e: Event): void {
    e.preventDefault();
    if (!this.booking.isValid()) { this.showError.set(true); return; }
    this.booking.openEmail();
  }
}
