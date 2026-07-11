export type BookingType = 'masaje' | 'ritual' | 'bono_mensual' | 'bono_regalo';

export interface BookingForm {
  name: string;
  serviceType: BookingType | null;
  treatment: string;
  treatments: string[];
  date: string;
}
