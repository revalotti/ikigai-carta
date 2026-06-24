import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../../core/services/booking.service';
import { ServicesStateService } from '../../../../core/services/services-state.service';
import { BookingType } from '../../../../core/models/booking.model';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-booking-form',
  imports: [FormsModule, CalendarComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
  readonly booking = inject(BookingService);
  readonly state = inject(ServicesStateService);

  calendarOpen = signal(false);
  showError = signal(false);

  // Treatment names from Supabase — only active services
  readonly masajeOptions = computed(() =>
    this.state.bookableMasajes().map(s => s.name)
  );
  readonly ritualOptions = computed(() =>
    this.state.bookableRituales().map(s => s.name)
  );
  // bono_mensual: first active deep-tissue variant, or fallback
  readonly bonoMensualTreatment = computed(() => {
    const deepTissue = this.state.bookableMasajes().find(s =>
      s.catalogId === 'therapeutic-deep-tissue'
    );
    return deepTissue?.name ?? 'Masaje de Tejido profundo';
  });
  // bono_regalo: all active therapeutic + ritual names
  readonly allBookableNames = computed(() => [
    ...this.masajeOptions(),
    ...this.ritualOptions(),
  ]);

  readonly treatmentOptions = computed(() => {
    const type = this.booking.serviceType();
    if (type === 'masaje') return this.masajeOptions();
    if (type === 'ritual') return this.ritualOptions();
    if (type === 'bono_mensual') return [this.bonoMensualTreatment()];
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
  readonly formattedDate = computed(() => this.booking.formatDateES(this.booking.date()));

  onServiceTypeChange(value: string): void {
    this.booking.serviceType.set((value as BookingType) || null);
    this.booking.treatment.set('');
    this.booking.treatments.set([]);
    this.booking.date.set('');
    this.calendarOpen.set(false);
    this.showError.set(false);
    if (value === 'bono_mensual') {
      this.booking.treatment.set(this.bonoMensualTreatment());
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
    if (new Date(iso + 'T12:00:00').getDay() === 0) return;
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
