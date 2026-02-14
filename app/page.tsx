'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { GlampingUnit, DateRange, Reservation, CustomerInfo } from '@/types/glamping';
import { AvailabilityService } from '@/lib/availability';
import { ReservationService } from '@/lib/reservations';
import { businessRules } from '@/data/mockData';
import DatePicker from '@/components/DatePicker';
import UnitCard from '@/components/UnitCard';
import PaymentForm from '@/components/PaymentForm';
import ConfirmationModal from '@/components/ConfirmationModal';
import ContactInfo from '@/components/ContactInfo';

export default function Home() {
  const [step, setStep] = useState<'dates' | 'units' | 'payment' | 'confirmation'>('dates');
  const [selectedDates, setSelectedDates] = useState<DateRange | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<GlampingUnit | null>(null);
  const [availableUnits, setAvailableUnits] = useState<GlampingUnit[]>([]);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Configurar notificaciones automáticas
    ReservationService.onNotification((res) => {
      setNotification(`¡Nueva reserva confirmada! Código: ${res.id}`);
      setTimeout(() => setNotification(null), 5000);
    });
  }, []);

  const handleDateChange = (dateRange: DateRange) => {
    setSelectedDates(dateRange);
    
    // Obtener unidades disponibles para esas fechas
    const available = AvailabilityService.getAvailableUnits(dateRange.checkIn, dateRange.checkOut);
    setAvailableUnits(available);
    
    if (available.length > 0) {
      setStep('units');
    } else {
      setNotification('No hay unidades disponibles para las fechas seleccionadas');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUnitSelect = (unitId: string) => {
    const unit = availableUnits.find(u => u.id === unitId);
    if (!unit || !selectedDates) return;

    setSelectedUnit(unit);
    
    // Calcular precio
    const price = AvailabilityService.calculatePrice(unit.id, selectedDates.checkIn, selectedDates.checkOut);
    setCalculatedPrice(price);
    
    setStep('payment');
  };

  const handlePayment = async (customerInfo: CustomerInfo) => {
    if (!selectedUnit || !selectedDates) return;

    setIsProcessing(true);

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Crear reserva
      const newReservation = ReservationService.createReservation(
        selectedUnit.id,
        selectedUnit.name,
        customerInfo,
        selectedDates,
        calculatedPrice
      );

      setReservation(newReservation);
      setStep('confirmation');
    } catch (error) {
      setNotification('Error al procesar el pago. Inténtalo de nuevo.');
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetBooking = () => {
    setStep('dates');
    setSelectedDates(null);
    setSelectedUnit(null);
    setAvailableUnits([]);
    setCalculatedPrice(0);
    setReservation(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-noise opacity-[0.35]" />
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px]" />
        <div className="absolute top-24 -left-44 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute -bottom-64 right-[-12rem] h-[680px] w-[680px] rounded-full bg-violet-500/10 blur-[160px]" />
      </div>
      {/* Notificación flotante */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 glass px-4 py-3 rounded-2xl shadow-lg animate-float-in">
          <div className="flex items-center gap-2">
            <span className="text-emerald-300">●</span>
            <span className="text-sm text-zinc-100">{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Glamping el Edén"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  priority
                />
              </div>
            </div>
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center">
              <div className="text-gradient-flow font-brand text-xl sm:text-2xl font-extrabold tracking-tight">
                Glamping el Edén
              </div>
              <div className="hidden sm:block text-xs text-zinc-400">Guasca, Cundinamarca</div>
            </div>
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setIsMenuOpen(true)}
              className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors grid place-items-center"
            >
              <svg
                className="h-5 w-5 text-zinc-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm glass border-l border-white/10 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Glamping el Edén"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-zinc-100">Glamping el Edén</div>
                  <div className="text-xs text-zinc-400">Menú</div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setIsMenuOpen(false)}
                className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors grid place-items-center"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href="#disponibilidad"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  document.getElementById('disponibilidad')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-primary w-full"
              >
                Consultar disponibilidad
              </a>
              <a
                href="https://www.instagram.com/glampingeleden"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Glamping%20el%20Ed%C3%A9n%20Guasca"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Google Maps
              </a>
              <a
                href="https://ul.waze.com/ul?place=ChIJnT-FthZ1QI4RRuygOP3fsiQ&ll=4.87817870%2C-73.90613340&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.49 9c-.66-2.31-2.59-4.09-5.02-4.49-.52-.09-1.04-.14-1.47-.14-2.41 0-4.53 1.21-5.81 3.06-.71 1.02-1.13 2.26-1.13 3.59 0 1.33.42 2.57 1.13 3.59l1.47 2.13c.39.57.39 1.31 0 1.88l-1.47 2.13c-.71 1.02-1.13 2.26-1.13 3.59h2c0-.89.28-1.73.81-2.44l1.47-2.13c.78-1.13.78-2.61 0-3.74l-1.47-2.13c-.53-.71-.81-1.55-.81-2.44 0-1.77.97-3.33 2.41-4.16.88-.51 1.89-.78 2.91-.78.26 0 .52.02.78.06 1.68.26 3.05 1.51 3.47 3.13.08.31.12.63.12.95 0 .89-.28 1.73-.81 2.44l-1.47 2.13c-.78 1.13-.78 2.61 0 3.74l1.47 2.13c.53.71.81 1.55.81 2.44h2c0-1.33-.42-2.57-1.13-3.59l-1.47-2.13c-.39-.57-.39-1.31 0-1.88l1.47-2.13c.71-1.02 1.13-2.26 1.13-3.59 0-.32-.04-.64-.12-.95z"/>
                </svg>
                Waze
              </a>
              <a
                href="tel:+573016477326"
                onClick={() => setIsMenuOpen(false)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.06a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/>
                </svg>
                Llamar
              </a>
            </div>
          </div>
        </div>
      )}

      <a
        href="tel:+573016477326"
        aria-label="Llamar a Glamping el Edén"
        className="fixed bottom-5 right-5 z-50 sm:hidden"
      >
        <div className="fab-call">
          <svg
            className="h-6 w-6 text-emerald-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.06a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
      </a>

      {/* Progress Bar */}
      {step !== 'confirmation' && (
        <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end py-3">
              {step !== 'dates' && (
                <button
                  onClick={() => step === 'units' ? setStep('dates') : setStep('units')}
                  className="text-zinc-300 hover:text-white text-sm font-medium transition-colors"
                >
                  ← Atrás
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8 animate-float-in">
          <div className="glass rounded-3xl p-6 sm:p-8 overflow-hidden">
            <div className="text-center space-y-6">
              {/* Imagen Placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/glamping.webp"
                  alt="Glamping el Edén - Experiencia única en la naturaleza"
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-xs font-semibold tracking-widest text-emerald-200/80">GLAMPING PREMIUM</p>
                </div>
              </div>
              
              {/* Contenido Centrado */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
                  Una noche diferente, en medio de la naturaleza.
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                  Consulta disponibilidad en tiempo real, mira el precio al instante y reserva con anticipo. 
                  Vive una experiencia única en nuestro glamping de lujo rodeado de naturaleza exuberante.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>4.7 (75 opiniones)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906z"/>
                    </svg>
                    <span>Guasca, Cundinamarca</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Step 1: Date Selection */}
        {step === 'dates' && (
          <div id="disponibilidad" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
                  ¿Cuándo quieres venir?
                </h2>
                <p className="text-zinc-300">
                  Selecciona tus fechas de check-in y check-out
                </p>
              </div>
              <DatePicker
                onDateChange={handleDateChange}
                minNights={businessRules.minNights}
                maxNights={businessRules.maxNights}
              />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        )}

        {/* Step 2: Unit Selection */}
        {step === 'units' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
                Elige tu glamping
              </h2>
              <p className="text-zinc-300">
                {selectedDates && (
                  <span>
                    {selectedDates.checkIn.toLocaleDateString('es-CO')} - {selectedDates.checkOut.toLocaleDateString('es-CO')}
                    {' • '}
                    {Math.ceil((selectedDates.checkOut.getTime() - selectedDates.checkIn.getTime()) / (1000 * 3600 * 24))} noches
                  </span>
                )}
              </p>
            </div>
            
            {availableUnits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableUnits.map(unit => {
                  const price = selectedDates ? 
                    AvailabilityService.calculatePrice(unit.id, selectedDates.checkIn, selectedDates.checkOut) : 
                    unit.pricePerNight;
                  const nights = selectedDates ? 
                    Math.ceil((selectedDates.checkOut.getTime() - selectedDates.checkIn.getTime()) / (1000 * 3600 * 24)) : 1;
                  
                  return (
                    <UnitCard
                      key={unit.id}
                      unit={unit}
                      onSelect={handleUnitSelect}
                      isSelected={selectedUnit?.id === unit.id}
                      price={price}
                      nights={nights}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                  No hay disponibilidad
                </h3>
                <p className="text-zinc-300 mb-4">
                  No encontramos unidades disponibles para las fechas seleccionadas.
                </p>
                <button
                  onClick={() => setStep('dates')}
                  className="btn-primary"
                >
                  Cambiar fechas
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 'payment' && selectedUnit && selectedDates && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
                Completa tu reserva
              </h2>
              <p className="text-zinc-300">
                Paga solo el 30% de anticipo para confirmar
              </p>
            </div>
            
            <div className="mb-6">
              <div className="glass rounded-3xl p-6">
                <h3 className="font-semibold text-zinc-100 mb-4">Resumen de la reserva</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Alojamiento:</span>
                    <span className="font-medium text-zinc-100">{selectedUnit.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Fechas:</span>
                    <span className="font-medium text-zinc-100">
                      {selectedDates.checkIn.toLocaleDateString('es-CO')} - {selectedDates.checkOut.toLocaleDateString('es-CO')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Noches:</span>
                    <span className="font-medium text-zinc-100">
                      {Math.ceil((selectedDates.checkOut.getTime() - selectedDates.checkIn.getTime()) / (1000 * 3600 * 24))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Capacidad:</span>
                    <span className="font-medium text-zinc-100">Hasta {selectedUnit.capacity} personas</span>
                  </div>
                </div>
              </div>
            </div>
            
            <PaymentForm
              totalAmount={calculatedPrice}
              depositAmount={calculatedPrice * businessRules.depositPercentage}
              onSubmit={handlePayment}
              isLoading={isProcessing}
            />
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirmation' && reservation && (
          <ConfirmationModal
            reservation={reservation}
            isOpen={true}
            onClose={resetBooking}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <p className="text-zinc-400 text-sm">
              © 2026 Glamping el Edén. Todos los derechos reservados.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <svg className="w-6 h-6 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.764-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.249.249.389.569.413.96v1.173c-.024.391-.164.711-.413.96-.249.249-.56.373-.933.373s-.684-.124-.933-.373c-.249-.249-.389-.569-.413-.96V12.44c.024-.391.164-.711.413-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.249.249.389.569.413.96v1.173c-.024.391-.164.711-.413.96-.249.249-.56.373-.933.373s-.684-.124-.933-.373c-.249-.249-.389-.569-.413-.96V12.44c.024-.391.164-.711.413-.96.249-.249.56-.373.933-.373z"/>
              </svg>
              <svg className="w-6 h-6 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.06a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/>
              </svg>
              <svg className="w-6 h-6 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-sm text-zinc-400">⭐ 4.7 (75 opiniones)</span>
              <span className="text-zinc-600">•</span>
              <a href="https://www.instagram.com/glampingeleden" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-200 hover:text-emerald-100 transition-colors">@glampingeleden</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
