import { MassageService } from '../models/massage-service.model';
import { PriceOption, ServiceCategory } from '../data/services-catalog.data';

interface MassageServiceRow {
  id: string;
  name: string;
  description: string;
  duration: number | null;
  price: number | null;
  active: boolean;
  catalog_id: string | null;
  category: string;
  price_options: PriceOption[] | null;
  recommended: boolean;
}

function parsePriceOptions(value: PriceOption[] | null | undefined): PriceOption[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    o => typeof o?.duration === 'number' && typeof o?.price === 'number' && o.duration > 0 && o.price > 0,
  );
}

export function toMassageService(row: MassageServiceRow): MassageService {
  return {
    id: row.id,
    catalogId: row.catalog_id ?? null,
    category: (row.category ?? 'therapeutic') as ServiceCategory,
    name: row.name,
    description: row.description,
    duration: row.duration,
    price: row.price,
    priceOptions: parsePriceOptions(row.price_options),
    recommended: row.recommended ?? false,
    active: row.active,
  };
}
