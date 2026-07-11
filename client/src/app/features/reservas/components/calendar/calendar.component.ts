import { Component, signal, computed, output, input } from '@angular/core';

interface CalDay {
  date: string;
  day: number;
  isSunday: boolean;
  isPast: boolean;
  isOther: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selectedDate = input<string>('');
  dateSelected = output<string>();

  readonly MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  readonly DIAS_SEM = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

  year = signal(new Date().getFullYear());
  month = signal(new Date().getMonth());

  title = computed(() => `${this.MESES[this.month()]} ${this.year()}`);

  isPrevDisabled = computed(() => {
    const t = new Date();
    return this.year() === t.getFullYear() && this.month() === t.getMonth();
  });

  days = computed<CalDay[]>(() => {
    const y = this.year(), m = this.month();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0).getDate();
    const firstDow = (firstDay.getDay() + 6) % 7;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sel = this.selectedDate();

    const days: CalDay[] = [];
    for (let i = 0; i < firstDow; i++) {
      days.push({ date: '', day: 0, isSunday: false, isPast: false, isOther: true, isSelected: false, isDisabled: true });
    }
    for (let d = 1; d <= lastDay; d++) {
      const date = new Date(y, m, d);
      const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayDate = new Date(iso + 'T12:00:00'); dayDate.setHours(0, 0, 0, 0);
      const isSunday = date.getDay() === 0;
      const isPast = dayDate < today;
      days.push({
        date: iso, day: d,
        isSunday, isPast,
        isOther: false,
        isSelected: sel === iso,
        isDisabled: isSunday || isPast,
      });
    }
    return days;
  });

  prevMonth(): void {
    if (this.isPrevDisabled()) return;
    let m = this.month() - 1, y = this.year();
    if (m < 0) { m = 11; y--; }
    this.month.set(m); this.year.set(y);
  }

  nextMonth(): void {
    let m = this.month() + 1, y = this.year();
    if (m > 11) { m = 0; y++; }
    this.month.set(m); this.year.set(y);
  }

  selectDay(day: CalDay): void {
    if (day.isDisabled || day.isOther || !day.date) return;
    this.dateSelected.emit(day.date);
  }
}
