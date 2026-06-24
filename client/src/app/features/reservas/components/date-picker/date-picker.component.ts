import { Component, computed, input, output, signal } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-date-picker',
  imports: [CalendarComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  value = input<string>('');
  placeholder = input<string>('DD/MM/AAAA');
  valueChange = output<string>();

  open = signal(false);

  formattedDate = computed(() => {
    const iso = this.value();
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
  });

  toggle(): void {
    this.open.update(v => !v);
  }

  onDateSelected(iso: string): void {
    this.valueChange.emit(iso);
    this.open.set(false);
  }

  clear(): void {
    this.valueChange.emit('');
    this.open.set(false);
  }
}
