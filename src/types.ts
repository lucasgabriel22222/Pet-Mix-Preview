export interface PetShopInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  mapsUrl: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    full: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  rating: number;
  totalReviews: number;
}

export type PetSize = 'pequeno' | 'medio' | 'grande' | 'gigante';
export type PetType = 'cachorro' | 'gato';
export type CoatType = 'curto' | 'medio' | 'longo';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'estetica' | 'saude' | 'nutricao' | 'agro' | 'conveniencia';
  shortDesc: string;
  fullDesc: string;
  priceEstimate?: string;
  iconName: string;
  highlights: string[];
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'caes' | 'gatos' | 'farmacia' | 'acessorios' | 'agro';
  brand: string;
  description: string;
  price?: string;
  imageUrl: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  petInfo: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingFormState {
  petName: string;
  petType: PetType;
  petSize: PetSize;
  coatType: CoatType;
  selectedServices: string[];
  tutorName: string;
  tutorPhone: string;
  preferredDate: string;
  preferredTime: string;
  needsTransportation: boolean;
  notes: string;
}
