import { PriceOption } from './services-catalog.data';
import { MassageService } from '../models/massage-service.model';

export function resolvePriceOptions(
  service: Pick<MassageService, 'priceOptions' | 'duration' | 'price'>,
  catalogOptions?: PriceOption[],
): PriceOption[] {
  if (service.priceOptions.length) return service.priceOptions;
  if (catalogOptions?.length) return catalogOptions;
  if (service.duration != null && service.price != null) {
    return [{ duration: service.duration, price: service.price }];
  }
  return [];
}
