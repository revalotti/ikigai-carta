import { PriceOption, ServiceCategory } from '../data/services-catalog.data';

export interface MassageService {
  id: string;
  catalogId: string | null;
  category: ServiceCategory;
  name: string;
  description: string;
  duration: number | null;
  price: number | null;
  priceOptions: PriceOption[];
  recommended: boolean;
  active: boolean;
}
