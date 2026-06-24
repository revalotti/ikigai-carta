import { MassageService } from '../models/massage-service.model';
import { CatalogService, SERVICES_CATALOG, ServiceCategory, catalogByCategory } from './services-catalog.data';
import { resolvePriceOptions } from './service-price.utils';

export interface ServiceCardView extends CatalogService {
  storeId: string;
  active: boolean;
  isCustom: boolean;
}

const VOUCHER_CATEGORY: ServiceCategory = 'voucher';

export function mergeCatalogWithStore(
  storeServices: MassageService[],
  category: ServiceCategory,
): ServiceCardView[] {
  const catalogItems = catalogByCategory(category);
  const customItems = storeServices.filter(s => !s.catalogId && s.category === category);

  const catalogCards: ServiceCardView[] = catalogItems.map(cat => {
    const row = storeServices.find(s => s.catalogId === cat.id);
    return {
      ...cat,
      name: row?.name ?? cat.name,
      description: row?.description || cat.description,
      recommended: row ? row.recommended : (cat.recommended ?? false),
      priceOptions: resolvePriceOptions(
        row ?? { priceOptions: [], duration: null, price: null },
        cat.priceOptions,
      ),
      price: row?.price ?? cat.price,
      storeId: row?.id ?? '',
      active: row?.active ?? false,
      isCustom: false,
    };
  });

  const customCards: ServiceCardView[] = customItems.map(row => ({
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    recommended: row.recommended,
    priceOptions: resolvePriceOptions(row),
    price: row.price,
    storeId: row.id,
    active: row.active,
    isCustom: true,
  }));

  return [...catalogCards, ...customCards];
}

export function enrichMassageServices(services: MassageService[]): MassageService[] {
  return services.map(service => {
    if (service.catalogId) return service;
    const exact = SERVICES_CATALOG.find(c => c.name === service.name);
    if (exact) return { ...service, catalogId: exact.id, category: exact.category };
    const partial = SERVICES_CATALOG.find(c => service.name.startsWith(c.name));
    if (partial) return { ...service, catalogId: partial.id, category: partial.category };
    return service;
  });
}

export function bookableMassageServices(storeServices: MassageService[]): MassageService[] {
  const enriched = enrichMassageServices(storeServices);
  const items: MassageService[] = [];

  for (const cat of SERVICES_CATALOG) {
    if (cat.category === VOUCHER_CATEGORY) continue;
    const row = enriched.find(s => s.catalogId === cat.id && s.active);
    if (!row) continue;

    const options = resolvePriceOptions(row, cat.priceOptions);
    if (options.length) {
      for (const option of options) {
        items.push({
          ...row,
          id: `${row.id}-${option.duration}`,
          name: `${cat.name} (${option.duration} min)`,
          duration: option.duration,
          price: option.price,
          priceOptions: [option],
        });
      }
      continue;
    }

    items.push({ ...row, name: cat.name });
  }

  for (const row of enriched) {
    if (!row.catalogId && row.active && row.category !== VOUCHER_CATEGORY) {
      const options = resolvePriceOptions(row);
      if (options.length) {
        for (const option of options) {
          items.push({
            ...row,
            id: `${row.id}-${option.duration}`,
            name: `${row.name} (${option.duration} min)`,
            duration: option.duration,
            price: option.price,
            priceOptions: [option],
          });
        }
        continue;
      }
      items.push(row);
    }
  }

  return items;
}
