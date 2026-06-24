import { Component } from '@angular/core';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { BONOS } from '../../data/services.data';

@Component({
  selector: 'app-bonos-panel',
  imports: [ServiceCardComponent],
  templateUrl: './bonos-panel.component.html',
  styleUrl: './bonos-panel.component.scss'
})
export class BonosPanelComponent {
  readonly services = BONOS;
}
