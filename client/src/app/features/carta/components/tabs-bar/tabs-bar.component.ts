import { Component, input, output } from '@angular/core';

type Tab = 'masajes' | 'rituales' | 'bonos';

@Component({
  selector: 'app-tabs-bar',
  templateUrl: './tabs-bar.component.html',
  styleUrl: './tabs-bar.component.scss'
})
export class TabsBarComponent {
  activeTab = input<Tab>('masajes');
  tabChange = output<Tab>();

  readonly tabs: { id: Tab; label: string }[] = [
    { id: 'masajes', label: 'Masajes terapéuticos' },
    { id: 'rituales', label: 'Rituales' },
    { id: 'bonos', label: 'Bonos' },
  ];

  selectTab(id: Tab): void {
    this.tabChange.emit(id);
  }

  onKeydown(e: KeyboardEvent, current: Tab): void {
    const ids = this.tabs.map(t => t.id);
    const idx = ids.indexOf(current);
    if (e.key === 'ArrowRight') { e.preventDefault(); this.selectTab(ids[(idx + 1) % ids.length]); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); this.selectTab(ids[(idx - 1 + ids.length) % ids.length]); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.selectTab(current); }
  }
}
