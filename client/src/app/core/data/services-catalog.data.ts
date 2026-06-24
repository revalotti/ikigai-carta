export type ServiceCategory = 'therapeutic' | 'ritual' | 'voucher';

export interface PriceOption {
  price: number;
  duration: number;
}

export interface RitualInclude {
  name: string;
  duration?: string;
}

export interface CatalogService {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  recommended?: boolean;
  priceOptions?: PriceOption[];
  price?: number | null;
  priceLabel?: string;
  includes?: RitualInclude[];
  highlight?: string;
  conditions?: string[];
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  therapeutic: 'Masajes terapéuticos',
  ritual: 'Rituales',
  voucher: 'Bonos',
};

export const SERVICES_CATALOG: CatalogService[] = [
  {
    id: 'therapeutic-relaxing',
    category: 'therapeutic',
    name: 'Masaje relajante Ikigai',
    description: 'Masaje suave y armonioso, ayuda a liberar el estrés, calmar la mente y relajar el cuerpo, mejorando el descanso y recuperando la sensación de bienestar y equilibrio.',
    priceOptions: [
      { price: 25, duration: 30 },
      { price: 40, duration: 50 },
    ],
  },
  {
    id: 'therapeutic-deep-tissue',
    category: 'therapeutic',
    name: 'Masaje de Tejido profundo',
    recommended: true,
    description: 'Masaje enfocado en las capas más profundas del músculo, diseñado para liberar tensiones, rigidez y nudos musculares. Ayuda a aliviar molestias persistentes, mejorar la movilidad y devolver al cuerpo una sensación de ligereza.',
    priceOptions: [
      { price: 35, duration: 30 },
      { price: 55, duration: 50 },
    ],
  },
  {
    id: 'therapeutic-californian',
    category: 'therapeutic',
    name: 'Masaje Californiano',
    description: 'Masaje fluido y envolvente, conocido como una danza sanadora, que favorece la conexión cuerpo-mente, ayudando a soltar tensiones físicas y emocionales y a entrar en un profundo estado de relajación.',
    priceOptions: [{ price: 45, duration: 50 }],
  },
  {
    id: 'therapeutic-hot-stones',
    category: 'therapeutic',
    name: 'Masaje con piedras calientes',
    description: 'Masaje relajante que combina suaves movimientos con la aplicación de piedras volcánicas sobre puntos estratégicos del cuerpo. Ayuda a soltar tensiones acumuladas, relajar la musculatura y revitalizar la energía.',
    priceOptions: [{ price: 65, duration: 60 }],
  },
  {
    id: 'therapeutic-indian-head',
    category: 'therapeutic',
    name: 'Masaje craneal Hindú',
    description: 'Masaje tradicional de la India que combina presión y movimientos ágiles sobre cabeza, cuello y hombros, ayuda a aliviar tensiones, reducir dolores de cabeza y estrés acumulado.',
    priceOptions: [{ price: 25, duration: 30 }],
  },
  {
    id: 'therapeutic-foot-reflexology',
    category: 'therapeutic',
    name: 'Reflexología + Masaje de pies',
    description: 'Tratamiento que combina la estimulación de puntos reflejos con un masaje profundo de pies, ayudando a liberar tensiones, mejorar la circulación y favorecer el equilibrio natural del cuerpo, proporcionando una sensación de ligereza y renovación.',
    priceOptions: [{ price: 35, duration: 40 }],
  },
  {
    id: 'ritual-ikigai',
    category: 'ritual',
    name: 'Ritual Ikigai',
    description: '',
    price: 115,
    includes: [
      { name: 'Bañera de Hidromasaje con aromaterapia', duration: '30 min' },
      { name: 'Masaje a elegir: Relajante o de Tejido profundo', duration: '50 min' },
      { name: 'Tratamiento final a elegir: Mini facial o Masaje de pies', duration: '30 min' },
    ],
  },
  {
    id: 'ritual-express',
    category: 'ritual',
    name: 'Ritual Exprés Ikigai',
    description: '',
    price: 60,
    includes: [
      { name: 'Bañera de Hidromasaje', duration: '25 min' },
      { name: 'Masaje relajante localizado: espalda o piernas', duration: '25 min' },
    ],
  },
  {
    id: 'ritual-couple',
    category: 'ritual',
    name: 'Ritual Ikigai en pareja',
    description: '',
    price: 150,
    includes: [
      { name: 'Bañera de Hidromasaje con aromaterapia', duration: '50 min' },
      { name: 'Masaje relajante (Masajes realizados de forma consecutiva, no simultánea)', duration: '25 min p/p' },
      { name: 'Bombones y Cava' },
    ],
  },
  {
    id: 'voucher-monthly',
    category: 'voucher',
    name: 'Bono mensual',
    description: 'Pensado para personas con tensión que buscan un cuidado regular. Incluye cuatro sesiones de masaje de tejido profundo para mantener el cuerpo en equilibrio.',
    price: 200,
    highlight: '4 sesiones · Masaje de Tejido profundo (50 min por sesión)',
    conditions: [
      'Bono personal e intransferible.',
      'Reserva previa.',
      'Validez de 2 meses.',
    ],
  },
  {
    id: 'voucher-gift',
    category: 'voucher',
    name: 'Bono regalo',
    description: 'Regala una experiencia de bienestar. El destinatario podrá elegir entre los servicios del centro y personalizar su ritual en el momento de la reserva.',
    price: null,
    priceLabel: 'Precio según personalización',
    highlight: 'Personalízalo en el momento de la reserva',
    conditions: [
      'Bono personal e intransferible.',
      'Reserva previa obligatoria.',
      'Validez de 1 año.',
    ],
  },
];

export function catalogByCategory(category: ServiceCategory): CatalogService[] {
  return SERVICES_CATALOG.filter(s => s.category === category);
}
