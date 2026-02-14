export interface GlampingUnit {
  id: string;
  name: string;
  type: 'tienda' | 'cabaña' | 'domo' | 'yurt';
  capacity: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  description: string;
  maxUnits: number;
}

export interface DateRange {
  checkIn: Date;
  checkOut: Date;
}

export interface Reservation {
  id: string;
  unitId: string;
  unitName: string;
  customerInfo: CustomerInfo;
  dateRange: DateRange;
  totalPrice: number;
  depositPaid: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  documentNumber: string;
}

export interface Availability {
  unitId: string;
  date: Date;
  availableUnits: number;
  totalUnits: number;
}

export interface SeasonalPricing {
  unitId: string;
  startDate: Date;
  endDate: Date;
  priceMultiplier: number;
  seasonName: string;
}
