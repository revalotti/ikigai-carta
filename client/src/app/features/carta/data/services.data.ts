import { ServiceCard } from '../../../core/models/service.model';

export const MASAJES: ServiceCard[] = [
  {
    id: 'relajante',
    type: 'masaje',
    name: 'Masaje relajante Ikigai',
    description: 'Masaje suave y armonioso, ayuda a liberar el estrés, calmar la mente y relajar el cuerpo, mejorando el descanso y recuperando la sensación de bienestar y equilibrio.',
    timeSlots: [
      { price: '25 €', duration: '30 min' },
      { price: '40 €', duration: '50 min' },
    ],
  },
  {
    id: 'tejido-profundo',
    type: 'masaje',
    name: 'Masaje de Tejido profundo',
    description: 'Masaje enfocado en las capas más profundas del músculo, diseñado para liberar tensiones, rigidez y nudos musculares. Ayuda a aliviar molestias persistentes, mejorar la movilidad y devolver al cuerpo una sensación de ligereza.',
    featured: true,
    flagLabel: '* Recomendado',
    timeSlots: [
      { price: '35 €', duration: '30 min' },
      { price: '55 €', duration: '50 min' },
    ],
  },
  {
    id: 'californiano',
    type: 'masaje',
    name: 'Masaje Californiano',
    description: 'Masaje fluido y envolvente, conocido como una danza sanadora, que favorece la conexión cuerpo-mente, ayudando a soltar tensiones físicas y emocionales y a entrar en un profundo estado de relajación.',
    timeSlots: [{ price: '45 €', duration: '50 min' }],
  },
  {
    id: 'piedras',
    type: 'masaje',
    name: 'Masaje con piedras calientes',
    description: 'Masaje relajante que combina suaves movimientos con la aplicación de piedras volcánicas sobre puntos estratégicos del cuerpo. Ayuda a soltar tensiones acumuladas, relajar la musculatura y revitalizar la energía.',
    timeSlots: [{ price: '65 €', duration: '60 min' }],
  },
  {
    id: 'craneal',
    type: 'masaje',
    name: 'Masaje craneal Hindú',
    description: 'Masaje tradicional de la India que combina presión y movimientos ágiles sobre cabeza, cuello y hombros, ayuda a aliviar tensiones, reducir dolores de cabeza y estrés acumulado.',
    timeSlots: [{ price: '25 €', duration: '30 min' }],
  },
  {
    id: 'reflexologia',
    type: 'masaje',
    name: 'Reflexología + Masaje de pies',
    description: 'Tratamiento que combina la estimulación de puntos reflejos con un masaje profundo de pies, ayudando a liberar tensiones, mejorar la circulación y favorecer el equilibrio natural del cuerpo, proporcionando una sensación de ligereza y renovación.',
    timeSlots: [{ price: '35 €', duration: '40 min' }],
  },
];

export const RITUALES: ServiceCard[] = [
  {
    id: 'ritual-ikigai',
    type: 'ritual',
    name: 'Ritual Ikigai',
    description: '',
    price: '115 €',
    includes: [
      { title: 'Bañera de Hidromasaje', subtitle: 'con aromaterapia', time: '30 min' },
      { title: 'Masaje a elegir:', subtitle: 'Relajante o de Tejido profundo', time: '50 min' },
      { title: 'Tratamiento final a elegir:', subtitle: 'Mini facial o Masaje de pies', time: '30 min' },
    ],
  },
  {
    id: 'ritual-expres',
    type: 'ritual',
    name: 'Ritual Exprés Ikigai',
    description: '',
    price: '60 €',
    includes: [
      { title: 'Bañera de Hidromasaje', time: '25 min' },
      { title: 'Masaje relajante localizado:', subtitle: 'espalda o piernas', time: '25 min' },
    ],
  },
  {
    id: 'ritual-pareja',
    type: 'ritual',
    name: 'Ritual Ikigai en pareja',
    description: '',
    price: '150 €',
    includes: [
      { title: 'Bañera de Hidromasaje', subtitle: 'con aromaterapia', time: '50 min' },
      { title: 'Masaje relajante', note: '(Masajes realizados de forma consecutiva, no simultánea)', time: '25 min p/p' },
      { title: 'Bombones y Cava', time: '' },
    ],
  },
];

export const BONOS: ServiceCard[] = [
  {
    id: 'bono-mensual',
    type: 'bono',
    name: 'Bono mensual',
    description: 'Este bono está pensado para personas que sienten tensión y sobrecarga corporal que desean un espacio regular de cuidado.',
    extraText: 'La continuidad de las sesiones favorece una mayor sensación de bienestar, ligereza y equilibrio, respetando siempre el ritmo del cuerpo',
    highlight: '4 sesiones · Masaje de Tejido profundo (50 min por sesión)',
    conditions: [
      'Bono personal e intransferible.',
      'Reserva previa.',
      'Validez de 2 meses.',
    ],
    price: '200 €',
  },
  {
    id: 'bono-regalo',
    type: 'bono',
    name: 'Bono regalo',
    description: 'Este bono regalo está pensado para ofrecer una experiencia de cuidado y bienestar, un momento de pausa y conexión con el cuerpo en un entorno tranquilo y respetuoso.',
    extraText: 'Con este bono regalo podrás elegir entre todos los servicios disponibles o combinarlos entre sí, adaptando la experiencia a las necesidades y preferencias de cada persona.',
    highlight: 'Personalízalo en el momento de la reserva',
    conditions: [
      'Bono personal e intransferible.',
      'Reserva previa obligatoria.',
      'Validez de 1 año.',
    ],
    price: 'Precio según personalización',
  },
];
