import { Component, input } from '@angular/core';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { ServiceCardView } from '../../../../core/data/services-catalog.utils';

@Component({
  selector: 'app-masajes-panel',
  imports: [ServiceCardComponent],
  templateUrl: './masajes-panel.component.html',
  styleUrl: './masajes-panel.component.scss'
})
export class MasajesPanelComponent {
  services = input.required<ServiceCardView[]>();
}
