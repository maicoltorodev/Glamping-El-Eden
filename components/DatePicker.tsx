'use client';

import { useState } from 'react';
import { DateRange } from '@/types/glamping';

interface DatePickerProps {
  onDateChange: (dateRange: DateRange) => void;
  disabledDates?: Date[];
  minNights?: number;
  maxNights?: number;
}

export default function DatePicker({ 
  onDateChange, 
  disabledDates = [], 
  minNights = 1, 
  maxNights = 30 
}: DatePickerProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingEnd, setSelectingEnd] = useState(false);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    // No permitir fechas pasadas
    if (date < today) return true;

    // Verificar fechas deshabilitadas
    return disabledDates.some(disabled => {
      const d = new Date(disabled);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === date.getTime();
    });
  };

  const isDateSelected = (date: Date) => {
    if (!selectedRange) return false;
    
    const start = new Date(selectedRange.checkIn);
    const end = new Date(selectedRange.checkOut);
    const current = new Date(date);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);

    return current >= start && current <= end;
  };

  const isDateStartOrEnd = (date: Date) => {
    if (!selectedRange) return false;
    
    const start = new Date(selectedRange.checkIn);
    const end = new Date(selectedRange.checkOut);
    const current = new Date(date);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);

    return current.getTime() === start.getTime() || current.getTime() === end.getTime();
  };

  const handleDateClick = (date: Date) => {
    console.log('Fecha clickeada:', date); // Debug
    console.log('Está deshabilitada:', isDateDisabled(date)); // Debug
    
    if (isDateDisabled(date)) return;

    if (!selectingEnd) {
      // Seleccionar fecha de inicio
      console.log('Seleccionando fecha de inicio:', date); // Debug
      setSelectedRange({ checkIn: date, checkOut: date });
      setSelectingEnd(true);
    } else {
      // Seleccionar fecha de fin
      const start = selectedRange!.checkIn;
      const nights = Math.ceil((date.getTime() - start.getTime()) / (1000 * 3600 * 24));
      
      console.log('Noches:', nights, 'Mín:', minNights, 'Máx:', maxNights); // Debug
      
      if (nights >= minNights && nights <= maxNights && date > start) {
        const newRange = { checkIn: start, checkOut: date };
        console.log('Rango completo:', newRange); // Debug
        setSelectedRange(newRange);
        onDateChange(newRange);
        setSelectingEnd(false);
      } else {
        console.log('Rango inválido, reiniciando'); // Debug
        // Si el rango no es válido, reiniciar selección
        setSelectedRange({ checkIn: date, checkOut: date });
        setSelectingEnd(true);
      }
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Días de la semana
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    // Espacios vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const isStartOrEnd = isDateStartOrEnd(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={disabled}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 relative
            ${disabled ? 'text-zinc-600 cursor-not-allowed bg-white/5' : 'hover:bg-emerald-300/20 cursor-pointer'}
            ${selected && !isStartOrEnd ? 'bg-emerald-300/30 text-emerald-100 border border-emerald-300/50' : ''}
            ${isStartOrEnd ? 'bg-emerald-400 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-400/25' : ''}
            ${!disabled && !selected ? 'text-zinc-100 hover:text-white' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const changeMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="glass rounded-3xl p-6 sm:p-7 animate-float-in">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-100">Selecciona tus fechas</h3>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {selectingEnd && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-300/10 border border-emerald-300/30">
            <p className="text-sm text-emerald-200 text-center">
              📅 Selecciona la fecha de checkout
            </p>
          </div>
        )}
        
        <div className="text-center mb-4">
          <span className="text-lg font-medium text-zinc-200">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-zinc-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </div>

      {selectedRange && (
        <div className="border-t border-white/10 pt-4">
          <div className="text-sm text-zinc-300">
            <div className="flex justify-between mb-2">
              <span>Check-in:</span>
              <span className="font-medium text-zinc-100">
                {selectedRange.checkIn.toLocaleDateString('es-CO', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span className="font-medium text-zinc-100">
                {selectedRange.checkOut.toLocaleDateString('es-CO', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            {selectingEnd && (
              <div className="mt-2 text-xs text-emerald-200">
                {Math.ceil((selectedRange.checkOut.getTime() - selectedRange.checkIn.getTime()) / (1000 * 3600 * 24)) + 1} noches
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
