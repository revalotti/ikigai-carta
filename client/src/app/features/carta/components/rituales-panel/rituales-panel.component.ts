import { Component, input } from '@angular/core';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { ServiceCardView } from '../../../../core/data/services-catalog.utils';

@Component({
  selector: 'app-rituales-panel',
  imports: [ServiceCardComponent],
  templateUrl: './rituales-panel.component.html',
  styleUrl: './rituales-panel.component.scss'
})
export class RitualesPanelComponent {
  services = input.required<ServiceCardView[]>();
}
