import { Injectable, computed, inject, signal } from '@angular/core';
import { MassageService } from '../models/massage-service.model';
import { MassageServiceRepository } from '../repositories/massage-service.repository';
import { ServiceCardView, bookableMassageServices, mergeCatalogWithStore } from '../data/services-catalog.utils';

@Injectable({ providedIn: 'root' })
export class ServicesStateService {
  private repo = inject(MassageServiceRepository);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private readonly allServices = signal<MassageService[]>([]);

  // Carta panels — only active services
  readonly masajes = computed(() =>
    mergeCatalogWithStore(this.allServices(), 'therapeutic').filter(s => s.active),
  );
  readonly rituales = computed(() =>
    mergeCatalogWithStore(this.allServices(), 'ritual').filter(s => s.active),
  );
  readonly bonos = computed(() =>
    mergeCatalogWithStore(this.allServices(), 'voucher').filter(s => s.active),
  );

  // Booking form — active therapeutic/ritual split by duration
  private readonly bookable = computed(() => bookableMassageServices(this.allServices()));

  readonly bookableMasajes = computed(() =>
    this.bookable().filter(s => s.category === 'therapeutic'),
  );
  readonly bookableRituales = computed(() =>
    this.bookable().filter(s => s.category === 'ritual'),
  );
  // Active vouchers for bono_regalo checkbox list
  readonly bookableVouchers = computed((): ServiceCardView[] =>
    mergeCatalogWithStore(this.allServices(), 'voucher').filter(s => s.active),
  );

  constructor() {
    this.repo.getAll().subscribe({
      next: services => {
        this.allServices.set(services);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los servicios.');
        this.loading.set(false);
      },
    });
  }
}
