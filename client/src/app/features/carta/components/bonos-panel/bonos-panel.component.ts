import { Component, input } from '@angular/core';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { ServiceCardView } from '../../../../core/data/services-catalog.utils';

@Component({
  selector: 'app-bonos-panel',
  imports: [ServiceCardComponent],
  templateUrl: './bonos-panel.component.html',
  styleUrl: './bonos-panel.component.scss'
})
export class BonosPanelComponent {
  services = input.required<ServiceCardView[]>();
}
