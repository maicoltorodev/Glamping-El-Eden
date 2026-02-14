import { GlampingUnit, DateRange, Availability, SeasonalPricing } from '@/types/glamping';
import { mockGlampingUnits, mockSeasonalPricing, blockedDates } from '@/data/mockData';

export class AvailabilityService {
  static getUnits(): GlampingUnit[] {
    return mockGlampingUnits;
  }

  static checkAvailability(unitId: string, checkIn: Date, checkOut: Date): boolean {
    const unit = mockGlampingUnits.find(u => u.id === unitId);
    if (!unit) return false;

    // Verificar fechas bloqueadas
    const isBlocked = blockedDates.some(blocked => 
      blocked.unitId === unitId &&
      this.dateRangesOverlap(
        { checkIn: blocked.startDate, checkOut: blocked.endDate },
        { checkIn, checkOut }
      )
    );

    if (isBlocked) return false;

    // Simular reservas existentes (en producción vendría de base de datos)
    const existingReservations = this.getMockReservations(unitId);
    
    const conflictingReservation = existingReservations.some(reservation =>
      this.dateRangesOverlap(reservation.dateRange, { checkIn, checkOut })
    );

    return !conflictingReservation;
  }

  static getAvailableUnits(checkIn: Date, checkOut: Date): GlampingUnit[] {
    return mockGlampingUnits.filter(unit => 
      this.checkAvailability(unit.id, checkIn, checkOut)
    );
  }

  static calculatePrice(unitId: string, checkIn: Date, checkOut: Date): number {
    const unit = mockGlampingUnits.find(u => u.id === unitId);
    if (!unit) return 0;

    const nights = this.getNightsCount(checkIn, checkOut);
    let totalPrice = 0;

    for (let i = 0; i < nights; i++) {
      const currentDate = new Date(checkIn);
      currentDate.setDate(checkIn.getDate() + i);
      
      const seasonalPrice = this.getSeasonalPrice(unitId, currentDate);
      totalPrice += seasonalPrice;
    }

    return totalPrice;
  }

  static getSeasonalPrice(unitId: string, date: Date): number {
    const unit = mockGlampingUnits.find(u => u.id === unitId);
    if (!unit) return 0;

    const seasonalPricing = mockSeasonalPricing.find(sp => 
      sp.unitId === unitId &&
      date >= sp.startDate &&
      date <= sp.endDate
    );

    const multiplier = seasonalPricing ? seasonalPricing.priceMultiplier : 1;
    return unit.pricePerNight * multiplier;
  }

  static getNightsCount(checkIn: Date, checkOut: Date): number {
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  private static dateRangesOverlap(range1: DateRange, range2: DateRange): boolean {
    return (
      (range1.checkIn < range2.checkOut && range1.checkOut > range2.checkIn) ||
      (range2.checkIn < range1.checkOut && range2.checkOut > range1.checkIn)
    );
  }

  private static getMockReservations(unitId: string): any[] {
    // Simular algunas reservas existentes
    const today = new Date();
    return [
      {
        unitId,
        dateRange: {
          checkIn: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
          checkOut: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)
        }
      },
      {
        unitId,
        dateRange: {
          checkIn: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
          checkOut: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12)
        }
      }
    ];
  }

  static getBlockedDates(unitId: string): Date[] {
    const blockedDatesList: Date[] = [];
    
    blockedDates.forEach(blocked => {
      if (blocked.unitId === unitId) {
        const current = new Date(blocked.startDate);
        while (current <= blocked.endDate) {
          blockedDatesList.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      }
    });

    return blockedDatesList;
  }
}
