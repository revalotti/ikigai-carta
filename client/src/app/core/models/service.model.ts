export type ServiceType = 'masaje' | 'ritual' | 'bono';

export interface TimeSlot {
  price: string;
  duration: string;
}

export interface IncludeItem {
  title: string;
  subtitle?: string;
  time?: string;
  note?: string;
}

export interface ServiceCard {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  featured?: boolean;
  flagLabel?: string;
  timeSlots?: TimeSlot[];
  price?: string;
  includes?: IncludeItem[];
  highlight?: string;
  conditions?: string[];
  extraText?: string;
}
