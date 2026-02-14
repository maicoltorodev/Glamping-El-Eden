'use client';

import { useState } from 'react';
import AmenityModal from './AmenityModal';

const amenitiesData = {
  wifi: {
    title: 'WiFi Gratis',
    icon: <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    description: 'Conectividad total en todo el glamping con internet de alta velocidad gratuito para que puedas estar siempre conectado.',
    features: [
      'Internet fibra óptica de alta velocidad',
      'Cobertura en todas las habitaciones',
      'Ideal para trabajo remoto y streaming',
      'Sin límites de datos'
    ]
  },
  parking: {
    title: 'Estacionamiento',
    icon: <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 17V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12"/><circle cx="12" cy="17" r="2"/><path d="M5 17h14"/></svg>,
    description: 'Amplia zona de estacionamiento seguro y vigilado para tu tranquilidad durante toda tu estancia.',
    features: [
      'Estacionamiento gratuito',
      'Vigilancia 24 horas',
      'Espacio para vehículos grandes',
      'Acceso directo al glamping'
    ]
  },
  pets: {
    title: 'Mascotas',
    icon: <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 5.172C10 3.472 11.793 2 14 2c2.207 0 4 1.472 4 3.172v1.656c0 .568-.224 1.088-.586 1.486"/><path d="M18.414 9.414C18.776 9.016 19 8.496 19 7.928V6.172"/><path d="M7.586 9.414C7.224 9.016 7 8.496 7 7.928V6.172C7 4.472 8.793 3 11 3c1.105 0 2.105.447 2.832 1.168"/></svg>,
    description: 'Tus amigos peludos también son bienvenidos. Contamos con instalaciones adaptadas para que disfruten junto a ti.',
    features: [
      'Admisión de mascotas sin costo adicional',
      'Zonas especiales para paseo',
      'Comederos y bebederos disponibles',
      'Ambiente seguro y natural'
    ]
  },
  restaurant: {
    title: 'Restaurante',
    icon: <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    description: 'Disfruta de deliciosa comida local e internacional en nuestro restaurante con vistas impresionantes.',
    features: [
      'Desayuno incluido en la estancia',
      'Especialidades locales',
      'Opciones vegetarianas y veganas',
      'Servicio a las habitaciones'
    ]
  },
  jacuzzi: {
    title: 'Jacuzzi',
    icon: <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    description: 'Relájate en nuestro jacuzzi privado con agua termanl y vistas espectaculares a la naturaleza.',
    features: [
      'Jacuzzi privado en cada glamping',
      'Agua caliente las 24 horas',
      'Hidromasaje incluido',
      'Productos de spa orgánicos'
    ]
  }
};

export default function ContactInfo() {
  const [selectedAmenity, setSelectedAmenity] = useState<keyof typeof amenitiesData | null>(null);

  const handleAmenityClick = (amenity: keyof typeof amenitiesData) => {
    setSelectedAmenity(amenity);
  };

  const closeModal = () => {
    setSelectedAmenity(null);
  };

  return (
    <>
      <div className="space-y-6 animate-float-in">
        {/* Mapa Interactivo */}
        <div className="glass rounded-3xl p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">Ubicación</h3>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d508595.15248955955!2d-73.97577849375001!3d5.19971315747905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e407516b6853f9d%3A0x24b2dffd38a0ec46!2sGlamping%20el%20Ed%C3%A9n!5e0!3m2!1ses-419!2sco!4v1771104791918!5m2!1ses-419!2sco"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Glamping%20el%20Ed%C3%A9n%20Guasca"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100 transition-colors"
          >
            <span>🗺️</span>
            Abrir en Google Maps →
          </a>
        </div>

        {/* Información Essential */}
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">Información Rápida</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contacto Principal */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.06a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <p className="text-xs text-zinc-400">Teléfono</p>
                  <a 
                    href="tel:+573016477326" 
                    className="text-sm font-medium text-emerald-200 hover:text-emerald-100 transition-colors"
                  >
                    301 6477326
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                <div>
                  <p className="text-xs text-zinc-400">Instagram</p>
                  <a 
                    href="https://www.instagram.com/glampingeleden" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-emerald-200 hover:text-emerald-100 transition-colors"
                  >
                    @glampingeleden
                  </a>
                </div>
              </div>
            </div>

            {/* Calificación y Opiniones */}
            <div className="space-y-3">
              <a
                href="https://www.google.com/travel/search?q=El%20eden%20glamping&g2lb=4965990%2C72248050%2C72248051%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764%2C73249150%2C121522132%2C121529350&hl=es-419&gl=co&cs=1&ssta=1&ts=CAEaRwopEicyJTB4OGU0MDc1MTZiNjg1M2Y5ZDoweDI0YjJkZmZkMzhhMGVjNDYSGhIUCgcI6g8QAhgTEgcI6g8QAhgUGAEyAhAA&qs=CAEyE0Nnb0l4dGlEeGRQX3Q5a2tFQUU4AkIJCUbsoDj937IkQgkJRuygOP3fsiQ&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwiY1rCZ-dmSAxUAAAAAHQAAAAAQBA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
              >
                <svg className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div className="flex-1">
                  <p className="text-xs text-zinc-400">Calificación</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-100">4.7</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">75 opiniones</p>
                </div>
                <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  <p className="text-xs text-zinc-400">Ubicación</p>
                  <p className="text-sm font-medium text-zinc-100">Guasca, Cundinamarca</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comodidades */}
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">Comodidades</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(amenitiesData).map(([key, amenity]) => (
              <button
                key={key}
                onClick={() => handleAmenityClick(key as keyof typeof amenitiesData)}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
              >
                {amenity.icon}
                <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{amenity.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cómo Llegar */}
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">Cómo Llegar</h3>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-200 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <div className="flex-1">
              <p className="text-sm text-zinc-300 leading-relaxed">
                Desde Bogotá: Tomar la vía hacia Sopó, continuar por 2km desde el casco urbano de Guasca. 
                El glamping se encuentra a 4 esquinas en dirección a Sopó.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Glamping%20el%20Ed%C3%A9n%20Guasca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-2"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Google Maps
                </a>
                <a
                  href="https://www.waze.com/ul?ll=5.1997,-73.9758&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-2"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.49 9c-.66-2.31-2.59-4.09-5.02-4.49-.52-.09-1.04-.14-1.47-.14-2.41 0-4.53 1.21-5.81 3.06-.71 1.02-1.13 2.26-1.13 3.59 0 1.33.42 2.57 1.13 3.59l1.47 2.13c.39.57.39 1.31 0 1.88l-1.47 2.13c-.71 1.02-1.13 2.26-1.13 3.59h2c0-.89.28-1.73.81-2.44l1.47-2.13c.78-1.13.78-2.61 0-3.74l-1.47-2.13c-.53-.71-.81-1.55-.81-2.44 0-1.77.97-3.33 2.41-4.16.88-.51 1.89-.78 2.91-.78.26 0 .52.02.78.06 1.68.26 3.05 1.51 3.47 3.13.08.31.12.63.12.95 0 .89-.28 1.73-.81 2.44l-1.47 2.13c-.78 1.13-.78 2.61 0 3.74l1.47 2.13c.53.71.81 1.55.81 2.44h2c0-1.33-.42-2.57-1.13-3.59l-1.47-2.13c-.39-.57-.39-1.31 0-1.88l1.47-2.13c.71-1.02 1.13-2.26 1.13-3.59 0-.32-.04-.64-.12-.95z"/>
                  </svg>
                  Waze
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAmenity && (
        <AmenityModal
          isOpen={!!selectedAmenity}
          onClose={closeModal}
          title={amenitiesData[selectedAmenity].title}
          icon={amenitiesData[selectedAmenity].icon}
          description={amenitiesData[selectedAmenity].description}
          features={amenitiesData[selectedAmenity].features}
        />
      )}
    </>
  );
}
