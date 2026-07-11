import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  contactModalOpen = input(false);
  contactModalOpenChange = output<boolean>();

  private readonly contactService = inject(ContactService);

  waUrl = signal('');

  readonly igHref = computed(() =>
    this.isMobile() ? 'ig.html' : 'https://www.instagram.com/centroikigai.masajes/'
  );

  readonly igTarget = computed(() =>
    this.isMobile() ? null : '_blank'
  );

  ngOnInit(): void {
    this.waUrl.set(this.contactService.getWhatsappUrl());
  }

  openContactModal(): void {
    this.waUrl.set(this.contactService.getWhatsappUrl());
    this.contactModalOpenChange.emit(true);
  }

  closeContactModal(): void {
    this.contactModalOpenChange.emit(false);
  }

  onModalBackdropClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.classList.contains('modal') || target.classList.contains('modal-backdrop')) {
      this.closeContactModal();
    }
  }

  onWaClick(e: MouseEvent): void {
    e.preventDefault();
    const url = this.waUrl();
    if (url) window.open(url, '_blank', 'noopener');
  }

  onEmailClick(e: MouseEvent): void {
    e.preventDefault();
    this.contactService.openEmail();
  }

  private isMobile(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
  }
}
