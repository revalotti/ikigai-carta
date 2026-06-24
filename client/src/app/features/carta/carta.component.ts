import { Component, signal, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TabsBarComponent } from './components/tabs-bar/tabs-bar.component';
import { MasajesPanelComponent } from './components/masajes-panel/masajes-panel.component';
import { RitualesPanelComponent } from './components/rituales-panel/rituales-panel.component';
import { BonosPanelComponent } from './components/bonos-panel/bonos-panel.component';

type Tab = 'masajes' | 'rituales' | 'bonos';

@Component({
  selector: 'app-carta',
  imports: [HeaderComponent, TabsBarComponent, MasajesPanelComponent, RitualesPanelComponent, BonosPanelComponent],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.scss'
})
export class CartaComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  activeTab = signal<Tab>('masajes');

  constructor() {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['masajes', 'rituales', 'bonos'].includes(hash)) {
      this.activeTab.set(hash as Tab);
    }
  }

  onTabChange(tab: Tab): void {
    this.activeTab.set(tab);
    history.replaceState(null, '', '#/' + tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
