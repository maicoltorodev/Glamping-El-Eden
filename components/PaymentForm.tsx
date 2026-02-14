'use client';

import { useState } from 'react';
import { CustomerInfo } from '@/types/glamping';

interface PaymentFormProps {
  totalAmount: number;
  depositAmount: number;
  onSubmit: (customerInfo: CustomerInfo) => void;
  isLoading?: boolean;
}

export default function PaymentForm({ 
  totalAmount, 
  depositAmount, 
  onSubmit, 
  isLoading = false 
}: PaymentFormProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    documentNumber: ''
  });
  
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'nequi' | 'pse'>('card');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[0-9+]{10,15}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!customerInfo.documentNumber.trim()) {
      newErrors.documentNumber = 'El documento es requerido';
    } else if (!/^[0-9]{6,12}$/.test(customerInfo.documentNumber.replace(/\s/g, ''))) {
      newErrors.documentNumber = 'Documento inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(customerInfo);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-7 animate-float-in">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Información de Reserva</h2>
      
      {/* Resumen del pago */}
      <div className="rounded-2xl p-4 mb-6 bg-gradient-to-r from-emerald-300/10 to-cyan-300/10 border border-white/10">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Total de la reserva:</span>
            <span className="font-medium text-zinc-100">{formatPrice(totalAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Anticipo (30%):</span>
            <span className="font-semibold text-emerald-200">{formatPrice(depositAmount)}</span>
          </div>
          <div className="border-t border-white/10 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-100">A pagar ahora:</span>
              <span className="text-xl font-semibold text-emerald-200">{formatPrice(depositAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Datos personales */}
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-100">Datos personales</h3>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`input-dark ${errors.name ? 'border-red-500/70' : ''}`}
              placeholder="Juan Pérez"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`input-dark ${errors.email ? 'border-red-500/70' : ''}`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`input-dark ${errors.phone ? 'border-red-500/70' : ''}`}
              placeholder="+57 300 123 4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Número de documento *
            </label>
            <input
              type="text"
              value={customerInfo.documentNumber}
              onChange={(e) => handleInputChange('documentNumber', e.target.value)}
              className={`input-dark ${errors.documentNumber ? 'border-red-500/70' : ''}`}
              placeholder="123456789"
            />
            {errors.documentNumber && (
              <p className="mt-1 text-sm text-red-400">{errors.documentNumber}</p>
            )}
          </div>
        </div>

        {/* Método de pago */}
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-100">Método de pago</h3>
          
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3 border rounded-lg text-center transition-colors ${
                paymentMethod === 'card'
                  ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'
                  : 'border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-1">💳</div>
              <div className="text-sm font-medium">Tarjeta</div>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('nequi')}
              className={`p-3 border rounded-lg text-center transition-colors ${
                paymentMethod === 'nequi'
                  ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'
                  : 'border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-1">📱</div>
              <div className="text-sm font-medium">Nequi</div>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('pse')}
              className={`p-3 border rounded-lg text-center transition-colors ${
                paymentMethod === 'pse'
                  ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'
                  : 'border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-1">🏦</div>
              <div className="text-sm font-medium">PSE</div>
            </button>
          </div>
        </div>

        {/* Campos de pago simulados */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Número de tarjeta (simulado)
              </label>
              <input
                type="text"
                className="input-dark"
                placeholder="4242 4242 4242 4242"
                defaultValue="4242 4242 4242 4242"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Fecha de vencimiento
                </label>
                <input
                  type="text"
                  className="input-dark"
                  placeholder="12/25"
                  defaultValue="12/25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="input-dark"
                  placeholder="123"
                  defaultValue="123"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'nequi' && (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Número de celular Nequi
              </label>
              <input
                type="tel"
                className="input-dark"
                placeholder="300 123 4567"
                defaultValue={customerInfo.phone}
              />
            </div>
            <p className="text-sm text-zinc-300">
              Recibirás un mensaje para confirmar el pago en tu celular.
            </p>
          </div>
        )}

        {paymentMethod === 'pse' && (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Banco
              </label>
              <select className="input-dark">
                <option>Bancolombia</option>
                <option>Davivienda</option>
                <option>Banco de Bogotá</option>
                <option>BBVA</option>
                <option>Scotiabank Colpatria</option>
              </select>
            </div>
            <p className="text-sm text-zinc-300">
              Serás redirigido a la página de tu banco para completar el pago.
            </p>
          </div>
        )}

        {/* Términos y condiciones */}
        <div className="border-t border-white/10 pt-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 accent-emerald-300"
            />
            <span className="text-sm text-zinc-300">
              Acepto los términos y condiciones y la política de privacidad. 
              Entiendo que el anticipo es del 30% y no es reembolsable.
            </span>
          </label>
        </div>

        {/* Botón de pago */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </span>
          ) : (
            `Pagar ${formatPrice(depositAmount)}`
          )}
        </button>
      </form>
    </div>
  );
}
