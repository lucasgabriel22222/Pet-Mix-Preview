import React from 'react';
import { Calendar, MessageCircle, MapPin, Star, ShieldCheck, Heart, Sparkles, Truck } from 'lucide-react';
import { PET_SHOP_DATA } from '../data/petShopData';
import { getBusinessStatus } from '../utils/helpers';

export const Hero: React.FC = () => {
  const status = getBusinessStatus();

  return (
    <section id="inicio" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f3eee7] via-[#faf8f5] to-white">
      {/* Decorative subtle background elements */}
      <div className="absolute top-10 right-0 -mr-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status & Rating line */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-700">
              <a
                id="hero-google-rating-link"
                href={PET_SHOP_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold hover:text-emerald-700 transition-colors"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>5.0 no Google Maps • Arapongas</span>
              </a>

              <span className="text-stone-300">•</span>

              <div className="inline-flex items-center gap-1.5 font-semibold">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span>{status.nextOpenText}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
              O cuidado e o amor que o seu <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">pet merece</span> em Arapongas.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl">
              No <strong>Pet Shop Agro-pet Mix</strong>, cada banho, tosa e consulta é feito com paciência e carinho de verdade. Rações Super Premium, farmácia veterinária completa, produtos agropecuários e disk-entrega no Jardim Petrópolis e toda a cidade.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
              <a
                id="hero-book-btn"
                href="#agendamento"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-700/25 transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar Banho & Tosa</span>
              </a>

              <a
                id="hero-whatsapp-btn"
                href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20Agro-pet%20Mix!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20ou%20fazer%20um%20pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-stone-800 bg-white hover:bg-stone-50 border-2 border-stone-200 transition-all hover:border-emerald-600 hover:text-emerald-800 shadow-xs"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp: {PET_SHOP_DATA.phone}</span>
              </a>
            </div>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full border-t border-stone-200/70">
              <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Toalhas 100% Esterilizadas</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Táxi Pet Leva & Traz</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Farmácia & Antipulgas</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold">
                <Heart className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Manejo sem Estresse</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80"
                  alt="Veterinária e tosquiador cuidando de cãozinho no Pet Shop Agro-pet Mix"
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Floating highlight box on image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Atendimento com Amor
                      </p>
                      <h4 className="text-stone-900 font-extrabold text-sm sm:text-base">
                        Rua Cisne Negro, 1040
                      </h4>
                      <p className="text-stone-600 text-xs">Jardim Petrópolis • Arapongas - PR</p>
                    </div>
                    <a
                      id="hero-route-link"
                      href={PET_SHOP_DATA.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
                      title="Abrir no Google Maps"
                    >
                      <MapPin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
