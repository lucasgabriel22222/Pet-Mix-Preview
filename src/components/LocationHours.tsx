import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink, ShieldCheck, Car } from 'lucide-react';
import { PET_SHOP_DATA } from '../data/petShopData';
import { getBusinessStatus } from '../utils/helpers';

export const LocationHours: React.FC = () => {
  const status = getBusinessStatus();

  const scheduleList = [
    { day: 'Segunda-feira', hours: '08:00 às 19:00', open: true },
    { day: 'Terça-feira', hours: '08:00 às 19:00', open: true },
    { day: 'Quarta-feira', hours: '08:00 às 19:00', open: true },
    { day: 'Quinta-feira', hours: '08:00 às 19:00', open: true },
    { day: 'Sexta-feira', hours: '08:00 às 19:00', open: true },
    { day: 'Sábado', hours: '08:00 às 19:00', open: true },
    { day: 'Domingo', hours: '08:00 às 12:00', open: true },
  ];

  const wazeUrl = `https://waze.com/ul?ll=${PET_SHOP_DATA.coordinates.lat},${PET_SHOP_DATA.coordinates.lng}&navigate=yes`;

  return (
    <section id="localizacao" className="py-20 bg-[#faf8f5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            Localização & Atendimento
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Fácil acesso no Jardim Petrópolis
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Venha nos visitar em Arapongas com estacionamento fácil e espaço amplo para receber você e seu bichinho.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Hours & Address (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">Endereço</h3>
                  <p className="text-sm font-semibold text-stone-800 mt-1">
                    {PET_SHOP_DATA.address.street}
                  </p>
                  <p className="text-xs text-stone-600">
                    {PET_SHOP_DATA.address.neighborhood} • Arapongas - PR
                  </p>
                  <p className="text-xs text-stone-500">CEP: {PET_SHOP_DATA.address.zip}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <a
                      id="open-google-maps-btn"
                      href={PET_SHOP_DATA.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Abrir no Google Maps</span>
                    </a>
                    <a
                      id="open-waze-btn"
                      href={wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200"
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>Waze</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex-grow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-black text-stone-900">Horários</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className={status.isOpen ? 'text-emerald-700' : 'text-amber-700'}>
                    {status.statusText}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-stone-100">
                {scheduleList.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex justify-between items-center text-stone-700">
                    <span className="font-semibold">{item.day}</span>
                    <span className="font-bold text-stone-900">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Atendimento presencial e tele-entrega ativa durante todo o horário.</span>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-emerald-800 text-white rounded-3xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 block">
                  Dúvidas ou Pedidos?
                </span>
                <span className="text-lg font-black">{PET_SHOP_DATA.phone}</span>
                <p className="text-xs text-white/70">Atendimento rápido no WhatsApp</p>
              </div>
              <a
                id="location-contact-whatsapp"
                href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20localiza%C3%A7%C3%A3o%20e%20atendimento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-50 transition-colors"
              >
                Falar Agora
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col min-h-[420px]">
            {/* Maps header banner */}
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Pet Shop Agro-pet Mix Arapongas</span>
              </div>
              <a
                id="maps-view-large-btn"
                href={PET_SHOP_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                <span>Ampliar Mapa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map iframe */}
            <div className="relative flex-grow w-full h-[400px] lg:h-auto min-h-[380px] bg-stone-100">
              <iframe
                title="Mapa de Localização - Pet Shop Agro-pet Mix Arapongas"
                src={`https://maps.google.com/maps?q=${PET_SHOP_DATA.coordinates.lat},${PET_SHOP_DATA.coordinates.lng}&hl=pt-BR&z=17&output=embed`}
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
