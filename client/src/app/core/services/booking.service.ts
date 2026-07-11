import { Injectable, computed, signal } from '@angular/core';
import { BookingType } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly phone = '34722712587';
  private readonly email = 'centroikigai.masajes@gmail.com';

  readonly name = signal('');
  readonly serviceType = signal<BookingType | null>(null);
  readonly treatment = signal('');
  readonly treatments = signal<string[]>([]);
  readonly date = signal('');

  readonly isValid = computed(() => {
    const type = this.serviceType();
    if (!this.name().trim() || !type) return false;
    if (type === 'masaje' || type === 'ritual') {
      return !!this.treatment() && !!this.date();
    }
    if (type === 'bono_regalo') {
      return this.treatments().length > 0;
    }
    return true; // bono_mensual only needs name + type
  });

  readonly whatsappUrl = computed(() => {
    if (!this.isValid()) return '#';
    const text = encodeURIComponent(this.buildMessage());
    return `https://wa.me/${this.phone}?text=${text}`;
  });

  readonly mailtoUrl = computed(() => {
    if (!this.isValid()) return '#';
    const subject = encodeURIComponent('Reserva - Ikigai');
    const body = encodeURIComponent(this.buildEmailBody()).replace(/%0A/g, '%0D%0A');
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  });

  readonly gmailUrl = computed(() => {
    if (!this.isValid()) return '#';
    const subject = encodeURIComponent('Reserva - Ikigai');
    const body = encodeURIComponent(this.buildEmailBody()).replace(/%0A/g, '%0D%0A');
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(this.email)}&su=${subject}&body=${body}`;
  });

  readonly missingFields = computed(() => {
    const missing: string[] = [];
    const type = this.serviceType();
    if (!this.name().trim()) missing.push('Nombre');
    if (!type) missing.push('Tipo de servicio');
    if (!type) return missing;
    if (type === 'masaje' || type === 'ritual') {
      if (!this.treatment()) missing.push('Tratamiento');
      if (!this.date()) missing.push('Fecha');
    } else if (type === 'bono_regalo') {
      if (this.treatments().length === 0) missing.push('Tratamiento(s)');
    }
    return missing;
  });

  typeLabel(type: BookingType | null): string {
    switch (type) {
      case 'masaje': return 'Masaje terapéutico';
      case 'ritual': return 'Ritual';
      case 'bono_mensual': return 'Bono mensual';
      case 'bono_regalo': return 'Bono regalo';
      default: return '';
    }
  }

  formatDateES(iso: string): string {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
  }

  openWhatsapp(): void {
    const url = this.whatsappUrl();
    if (url !== '#') window.open(url, '_blank', 'noopener');
  }

  openEmail(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
    const mailto = this.mailtoUrl();
    const gmail = this.gmailUrl();
    if (isMobile && mailto !== '#') {
      window.location.href = mailto;
    } else if (gmail !== '#') {
      const w = window.open(gmail, '_blank');
      if (!w && mailto !== '#') window.location.href = mailto;
    }
  }

  resetForm(): void {
    this.name.set('');
    this.serviceType.set(null);
    this.treatment.set('');
    this.treatments.set([]);
    this.date.set('');
  }

  private buildMessage(): string {
    const type = this.serviceType();
    const lines: string[] = [
      'Hola, me gustaría hacer la siguiente reserva:',
      '',
    ];
    if (this.name()) lines.push(`Nombre - ${this.name()}`);
    if (type) lines.push(`Tipo de servicio - ${this.typeLabel(type)}`);
    if (type === 'bono_regalo') {
      if (this.treatments().length) lines.push(`Tratamientos - ${this.treatments().join(', ')}`);
    } else {
      if (this.treatment()) lines.push(`Tratamiento - ${this.treatment()}`);
    }
    if ((type === 'masaje' || type === 'ritual') && this.date()) {
      lines.push(`Fecha - ${this.formatDateES(this.date())}`);
    }
    lines.push('', 'Gracias');
    return lines.join('\n');
  }

  private buildEmailBody(): string {
    return this.buildMessage().replace(/ - /g, ': ');
  }
}
