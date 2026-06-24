import { Component } from '@angular/core';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { MASAJES } from '../../data/services.data';

@Component({
  selector: 'app-masajes-panel',
  imports: [ServiceCardComponent],
  templateUrl: './masajes-panel.component.html',
  styleUrl: './masajes-panel.component.scss'
})
export class MasajesPanelComponent {
  readonly services = MASAJES;
}
