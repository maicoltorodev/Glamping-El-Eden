'use client';

import { Reservation } from '@/types/glamping';

interface ConfirmationModalProps {
  reservation: Reservation;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModal({ 
  reservation, 
  isOpen, 
  onClose 
}: ConfirmationModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getNightsCount = () => {
    const timeDiff = reservation.dateRange.checkOut.getTime() - reservation.dateRange.checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="glass rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-float-in">
        {/* Header */}
        <div className="p-6 rounded-t-3xl bg-gradient-to-r from-emerald-300/20 to-cyan-300/10 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-300/20 border border-emerald-300/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-200 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-zinc-100">¡Reserva Confirmada!</h2>
          <p className="text-zinc-300 mt-2">
            Tu reserva ha sido procesada exitosamente
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Código de reserva */}
          <div className="rounded-2xl p-4 mb-6 text-center bg-white/5 border border-white/10">
            <p className="text-sm text-zinc-400 mb-1">Código de reserva</p>
            <p className="text-2xl font-semibold text-zinc-100 tracking-wider">
              {reservation.id.toUpperCase()}
            </p>
          </div>

          {/* Detalles de la reserva */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">Detalles de la reserva</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Alojamiento:</span>
                  <span className="font-medium text-zinc-100">{reservation.unitName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Check-in:</span>
                  <span className="font-medium text-zinc-100">{formatDate(reservation.dateRange.checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Check-out:</span>
                  <span className="font-medium text-zinc-100">{formatDate(reservation.dateRange.checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Noches:</span>
                  <span className="font-medium text-zinc-100">{getNightsCount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Huéspedes:</span>
                  <span className="font-medium text-zinc-100">{reservation.customerInfo.name}</span>
                </div>
              </div>
            </div>

            {/* Información de pago */}
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">Información de pago</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total de la reserva:</span>
                  <span className="font-medium text-zinc-100">{formatPrice(reservation.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Anticipo pagado:</span>
                  <span className="font-medium text-emerald-200">{formatPrice(reservation.depositPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Saldo restante:</span>
                  <span className="font-medium text-zinc-100">{formatPrice(reservation.totalPrice - reservation.depositPaid)}</span>
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-semibold text-zinc-100 mb-2">Información de contacto</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Email:</span>
                  <span className="font-medium text-sm text-zinc-100">{reservation.customerInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Teléfono:</span>
                  <span className="font-medium text-zinc-100">{reservation.customerInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instrucciones importantes */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <h4 className="font-semibold text-zinc-100 mb-2">Instrucciones importantes</h4>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>• Check-in: 3:00 PM | Check-out: 11:00 AM</li>
              <li>• Presenta este código de reserva al llegar</li>
              <li>• Recibirás un email de confirmación detallado</li>
              <li>• El saldo restante se paga al momento del check-in</li>
            </ul>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={() => {
                // Simular envío de email
                alert('Email de confirmación enviado a ' + reservation.customerInfo.email);
              }}
              className="w-full btn-secondary"
            >
              Enviar confirmación por email
            </button>
            
            <button
              onClick={() => {
                // Simular compartir por WhatsApp
                const message = `¡Mi reserva en Glamping el Edén está confirmada! 🏕️\n\nCódigo: ${reservation.id.toUpperCase()}\nFechas: ${formatDate(reservation.dateRange.checkIn)} - ${formatDate(reservation.dateRange.checkOut)}\nAlojamiento: ${reservation.unitName}`;
                alert('Compartiendo en WhatsApp: ' + message);
              }}
              className="w-full btn-primary"
            >
              Compartir por WhatsApp
            </button>
            
            <button
              onClick={onClose}
              className="w-full btn-secondary"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
