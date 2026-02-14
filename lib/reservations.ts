import { Reservation, CustomerInfo, DateRange } from '@/types/glamping';
import { businessRules } from '@/data/mockData';

export class ReservationService {
  private static reservations: Reservation[] = [];
  private static notificationCallbacks: ((reservation: Reservation) => void)[] = [];

  static createReservation(
    unitId: string,
    unitName: string,
    customerInfo: CustomerInfo,
    dateRange: DateRange,
    totalPrice: number
  ): Reservation {
    const reservation: Reservation = {
      id: this.generateReservationId(),
      unitId,
      unitName,
      customerInfo,
      dateRange,
      totalPrice,
      depositPaid: totalPrice * businessRules.depositPercentage,
      status: 'confirmed',
      createdAt: new Date()
    };

    this.reservations.push(reservation);
    
    // Enviar notificaciones automáticas
    this.sendNotifications(reservation);
    
    return reservation;
  }

  static getReservationById(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id);
  }

  static getReservationsByEmail(email: string): Reservation[] {
    return this.reservations.filter(r => r.customerInfo.email === email);
  }

  static cancelReservation(id: string): boolean {
    const reservation = this.getReservationById(id);
    if (!reservation) return false;

    const today = new Date();
    const daysUntilCheckIn = Math.ceil(
      (reservation.dateRange.checkIn.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    // Aplicar políticas de cancelación
    if (daysUntilCheckIn >= businessRules.cancellationPolicy.fullRefundDays) {
      reservation.status = 'cancelled';
      this.sendCancellationNotification(reservation, 'full');
      return true;
    } else if (daysUntilCheckIn >= businessRules.cancellationPolicy.partialRefundDays) {
      reservation.status = 'cancelled';
      this.sendCancellationNotification(reservation, 'partial');
      return true;
    } else {
      // No hay reembolso
      reservation.status = 'cancelled';
      this.sendCancellationNotification(reservation, 'none');
      return true;
    }
  }

  static onNotification(callback: (reservation: Reservation) => void) {
    this.notificationCallbacks.push(callback);
  }

  private static generateReservationId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}${random}`.toUpperCase();
  }

  private static sendNotifications(reservation: Reservation) {
    // Notificar a todos los callbacks registrados
    this.notificationCallbacks.forEach(callback => {
      try {
        callback(reservation);
      } catch (error) {
        console.error('Error en notification callback:', error);
      }
    });

    // Simular envío de email al cliente
    this.sendEmailNotification(reservation);
    
    // Simular envío de WhatsApp al administrador
    this.sendWhatsAppNotification(reservation);
    
    // Simular notificación interna
    this.sendInternalNotification(reservation);
  }

  private static sendEmailNotification(reservation: Reservation) {
    // Simular envío de email
    setTimeout(() => {
      console.log(`Email enviado a ${reservation.customerInfo.email}:`, {
        subject: `Confirmación de reserva - ${reservation.id}`,
        template: 'reservation-confirmation',
        data: reservation
      });
    }, 1000);
  }

  private static sendWhatsAppNotification(reservation: Reservation) {
    // Simular envío de WhatsApp al administrador
    setTimeout(() => {
      const message = `🏕️ NUEVA RESERVA CONFIRMADA 🏕️\n\n` +
        `Código: ${reservation.id}\n` +
        `Alojamiento: ${reservation.unitName}\n` +
        `Cliente: ${reservation.customerInfo.name}\n` +
        `Email: ${reservation.customerInfo.email}\n` +
        `Teléfono: ${reservation.customerInfo.phone}\n` +
        `Fechas: ${reservation.dateRange.checkIn.toLocaleDateString('es-CO')} - ${reservation.dateRange.checkOut.toLocaleDateString('es-CO')}\n` +
        `Total: ${new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(reservation.totalPrice)}\n` +
        `Anticipo: ${new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(reservation.depositPaid)}`;
      
      console.log('WhatsApp enviado al administrador:', message);
    }, 1500);
  }

  private static sendInternalNotification(reservation: Reservation) {
    // Simular notificación interna para el dashboard
    setTimeout(() => {
      console.log('Notificación interna generada:', {
        type: 'new_reservation',
        reservation,
        timestamp: new Date(),
        priority: 'high'
      });
    }, 2000);
  }

  private static sendCancellationNotification(reservation: Reservation, refundType: 'full' | 'partial' | 'none') {
    const refundMessages = {
      full: 'Reembolso completo (100%)',
      partial: `Reembolso parcial (${businessRules.cancellationPolicy.partialRefundPercentage * 100}%)`,
      none: 'Sin reembolso'
    };

    // Notificar al cliente
    setTimeout(() => {
      console.log(`Email de cancelación enviado a ${reservation.customerInfo.email}:`, {
        subject: `Cancelación de reserva - ${reservation.id}`,
        refundType: refundMessages[refundType],
        template: 'cancellation-notice',
        data: reservation
      });
    }, 1000);

    // Notificar al administrador
    setTimeout(() => {
      console.log('WhatsApp de cancelación enviado al administrador:', {
        reservationId: reservation.id,
        customerName: reservation.customerInfo.name,
        refundType: refundMessages[refundType],
        timestamp: new Date()
      });
    }, 1500);
  }

  static getReservationStats() {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const totalReservations = this.reservations.length;
    const thisMonthReservations = this.reservations.filter(r => r.createdAt >= thisMonth).length;
    const confirmedReservations = this.reservations.filter(r => r.status === 'confirmed').length;
    const cancelledReservations = this.reservations.filter(r => r.status === 'cancelled').length;

    const totalRevenue = this.reservations
      .filter(r => r.status === 'confirmed')
      .reduce((sum, r) => sum + r.depositPaid, 0);

    const thisMonthRevenue = this.reservations
      .filter(r => r.status === 'confirmed' && r.createdAt >= thisMonth)
      .reduce((sum, r) => sum + r.depositPaid, 0);

    return {
      totalReservations,
      thisMonthReservations,
      confirmedReservations,
      cancelledReservations,
      totalRevenue,
      thisMonthRevenue,
      cancellationRate: totalReservations > 0 ? (cancelledReservations / totalReservations) * 100 : 0
    };
  }
}
