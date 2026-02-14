'use client';

import { GlampingUnit } from '@/types/glamping';

interface UnitCardProps {
  unit: GlampingUnit;
  onSelect: (unitId: string) => void;
  isSelected?: boolean;
  price?: number;
  nights?: number;
}

export default function UnitCard({ 
  unit, 
  onSelect, 
  isSelected = false, 
  price, 
  nights = 1 
}: UnitCardProps) {
  const getUnitIcon = (type: string) => {
    switch (type) {
      case 'tienda':
        return '🏕️';
      case 'cabaña':
        return '🏡';
      case 'domo':
        return '🌙';
      case 'yurt':
        return '⛺';
      default:
        return '🏠';
    }
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
    <div 
      className={`
        glass rounded-3xl overflow-hidden cursor-pointer card-hover
        ${isSelected 
          ? 'ring-1 ring-emerald-300/40 shadow-xl' 
          : ''
        }
      `}
      onClick={() => onSelect(unit.id)}
    >
      {/* Imagen principal */}
      <div className="relative h-48 bg-white/5">
        <img
          src={unit.images[0] || '/placeholder-cabana.svg'}
          alt={unit.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-semibold border border-white/10 bg-black/40 backdrop-blur-md text-zinc-100">
          {getUnitIcon(unit.type)} {unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4 bg-emerald-300/20 text-emerald-100 border border-emerald-300/30 rounded-full p-2 backdrop-blur-md">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">{unit.name}</h3>
          <p className="text-zinc-300 text-sm line-clamp-2">{unit.description}</p>
        </div>

        {/* Capacidad */}
        <div className="flex items-center gap-2 mb-4 text-sm text-zinc-300">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span>Hasta {unit.capacity} personas</span>
          <span className="text-zinc-600">•</span>
          <span>{unit.maxUnits} unidades disponibles</span>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {unit.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-200"
              >
                {amenity}
              </span>
            ))}
            {unit.amenities.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-400">
                +{unit.amenities.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Precio */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between">
            <div>
              {price ? (
                <>
                  <div className="text-sm text-zinc-400">
                    {nights} {nights === 1 ? 'noche' : 'noches'}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-100">
                    {formatPrice(price)}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {formatPrice(Math.floor(price / nights))} por noche
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-zinc-400">Desde</div>
                  <div className="text-2xl font-semibold text-zinc-100">
                    {formatPrice(unit.pricePerNight)}
                  </div>
                  <div className="text-sm text-zinc-400">por noche</div>
                </>
              )}
            </div>
            <button
              className={`
                px-5 py-3 rounded-2xl text-sm font-semibold transition-colors
                ${isSelected
                  ? 'bg-emerald-300/20 text-emerald-100 border border-emerald-300/30'
                  : 'bg-white/5 text-zinc-100 border border-white/10 hover:bg-white/10'
                }
              `}
            >
              {isSelected ? 'Seleccionado' : 'Seleccionar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
