import { GlampingUnit, SeasonalPricing } from '@/types/glamping';

export const mockGlampingUnits: GlampingUnit[] = [
  {
    id: 'tienda-lujo-1',
    name: 'Tienda de Lujo Safari',
    type: 'tienda',
    capacity: 2,
    pricePerNight: 180000, // COP - precio ajustado según mercado
    images: ['/placeholder-tienda.svg', '/placeholder-tienda.svg'],
    amenities: ['Cama queen', 'Baño privado', 'Terraza', 'Vista al valle', 'WiFi gratis', 'Estacionamiento gratuito'],
    description: 'Experiencia africana de lujo con vistas panorámicas a la montaña',
    maxUnits: 3
  },
  {
    id: 'cabaña-romantica-1',
    name: 'Cabaña Romántica del Bosque',
    type: 'cabaña',
    capacity: 2,
    pricePerNight: 220000,
    images: ['/placeholder-cabana.svg', '/placeholder-cabana.svg'],
    amenities: ['Cama king', 'Jacuzzi privado', 'Chimenea', 'Cocina equipada', 'Balcón privado', 'Netflix'],
    description: 'Privacidad absoluta rodeada de naturaleza y confort',
    maxUnits: 2
  },
  {
    id: 'domo-estrellas-1',
    name: 'Domo Estelar',
    type: 'domo',
    capacity: 4,
    pricePerNight: 200000,
    images: ['/placeholder-domo.svg', '/placeholder-domo.svg'],
    amenities: ['Cama doble + 2 individuales', 'Techo transparente', 'Baño privado', 'Microondas', 'Cafetera'],
    description: 'Duerme bajo las estrellas en un domo geodésico moderno',
    maxUnits: 2
  },
  {
    id: 'yurt-familiar-1',
    name: 'Yurt Familiar Andina',
    type: 'yurt',
    capacity: 6,
    pricePerNight: 350000,
    images: ['/placeholder-yurt.svg', '/placeholder-yurt.svg'],
    amenities: ['3 camas', 'Cocina completa', 'Sala de estar', 'Baño compartido', 'Parrilla', 'Juegos de mesa', 'Se permiten mascotas'],
    description: 'Espacio tradicional asiático adaptado para familias colombianas',
    maxUnits: 1
  }
];

export const mockSeasonalPricing: SeasonalPricing[] = [
  {
    unitId: 'tienda-lujo-1',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-15'),
    priceMultiplier: 1.5,
    seasonName: 'Temporada Alta - Navidad'
  },
  {
    unitId: 'cabaña-romantica-1',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-15'),
    priceMultiplier: 1.6,
    seasonName: 'Temporada Alta - Navidad'
  },
  {
    unitId: 'domo-estrellas-1',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-15'),
    priceMultiplier: 1.4,
    seasonName: 'Temporada Alta - Navidad'
  },
  {
    unitId: 'yurt-familiar-1',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-15'),
    priceMultiplier: 1.3,
    seasonName: 'Temporada Alta - Navidad'
  },
  {
    unitId: 'tienda-lujo-1',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-07-31'),
    priceMultiplier: 1.3,
    seasonName: 'Temporada Alta - Verano'
  },
  {
    unitId: 'cabaña-romantica-1',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-07-31'),
    priceMultiplier: 1.4,
    seasonName: 'Temporada Alta - Verano'
  },
  {
    unitId: 'domo-estrellas-1',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-07-31'),
    priceMultiplier: 1.2,
    seasonName: 'Temporada Alta - Verano'
  },
  {
    unitId: 'yurt-familiar-1',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-07-31'),
    priceMultiplier: 1.25,
    seasonName: 'Temporada Alta - Verano'
  }
];

export const blockedDates = [
  // Fechas bloqueadas para mantenimiento (ejemplo)
  {
    unitId: 'tienda-lujo-1',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-20')
  },
  {
    unitId: 'cabaña-romantica-1',
    startDate: new Date('2024-04-10'),
    endDate: new Date('2024-04-12')
  }
];

export const businessRules = {
  minNights: 1,
  maxNights: 30,
  checkInTime: '15:00',
  checkOutTime: '11:00',
  depositPercentage: 0.3, // 30% de anticipo
  cancellationPolicy: {
    fullRefundDays: 7,
    partialRefundDays: 3,
    partialRefundPercentage: 0.5
  }
};
