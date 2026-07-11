import { Component, input } from '@angular/core';
import { ServiceCardView } from '../../../core/data/services-catalog.utils';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  card = input.required<ServiceCardView>();

  formatPrice(price: number | null | undefined, priceLabel?: string): string {
    if (priceLabel) return priceLabel;
    if (price != null) return `${price} €`;
    return '';
  }
}
