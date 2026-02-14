'use client';

interface AmenityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

export default function AmenityModal({ isOpen, onClose, title, icon, description, features }: AmenityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Cerrar modal"
      />
      
      {/* Modal Content */}
      <div className="relative glass rounded-3xl p-6 sm:p-8 max-w-md w-full animate-float-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-300/10">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-zinc-100">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors grid place-items-center"
            aria-label="Cerrar"
          >
            <svg className="h-5 w-5 text-zinc-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-zinc-300 leading-relaxed mb-6">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-100 mb-3">Características:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-200 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full btn-primary"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
