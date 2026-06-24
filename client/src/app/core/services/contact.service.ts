import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly phone = '34722712587';
  private readonly email = 'centroikigai.masajes@gmail.com';

  getWhatsappUrl(): string {
    const text = encodeURIComponent('Hola, me gustaría pedir más información sobre');
    return `https://wa.me/${this.phone}?text=${text}`;
  }

  getMailtoUrl(): string {
    const subject = encodeURIComponent('Consulta - Ikigai');
    const body = encodeURIComponent('Hola, me gustaría pedir más información sobre').replace(/%0A/g, '%0D%0A');
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  }

  getGmailUrl(): string {
    const subject = encodeURIComponent('Consulta - Ikigai');
    const body = encodeURIComponent('Hola, me gustaría pedir más información sobre').replace(/%0A/g, '%0D%0A');
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(this.email)}&su=${subject}&body=${body}`;
  }

  openEmail(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
    if (isMobile) {
      window.location.href = this.getMailtoUrl();
    } else {
      const w = window.open(this.getGmailUrl(), '_blank');
      if (!w) window.location.href = this.getMailtoUrl();
    }
  }
}
