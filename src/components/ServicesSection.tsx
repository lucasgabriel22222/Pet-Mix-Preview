import React, { useState } from 'react';
import { Sparkles, Scissors, Award, HeartHandshake, ShieldCheck, ShoppingBag, Truck, Wheat, Check, ArrowRight } from 'lucide-react';
import { SERVICES_DATA, PET_SHOP_DATA } from '../data/petShopData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'estetica', label: 'Banho & Tosa' },
    { id: 'saude', label: 'Farmácia Veterinária' },
    { id: 'nutricao', label: 'Rações & Nutrição' },
    { id: 'conveniencia', label: 'Táxi Pet & Entregas' },
    { id: 'agro', label: 'Agropecuária & Aves' },
  ];

  const filteredServices =
    selectedCategory === 'todos'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-emerald-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-emerald-600" />;
      case 'Wheat':
        return <Wheat className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="servicos" className="py-20 bg-stone-50 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            Serviços Especializados
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Tudo o que seu pet precisa com excelência e carinho
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Ambiente climatizado, equipamentos profissionais, água morna e profissionais apaixonados por animais em Arapongas.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`service-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-black text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {service.title}
                  </h3>
                </div>
                {service.priceEstimate && (
                  <p className="text-xs font-bold text-emerald-800 mb-2">
                    {service.priceEstimate}
                  </p>
                )}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-5 flex-grow">
                  {service.highlights.slice(0, 3).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-stone-700 text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-3 border-t border-stone-100 mt-auto">
                  {service.category === 'estetica' ? (
                    <button
                      id={`book-service-${service.id}`}
                      onClick={() => {
                        if (onSelectServiceForBooking) {
                          onSelectServiceForBooking(service.id);
                        } else {
                          const element = document.getElementById('agendamento');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-700 hover:text-white transition-colors"
                    >
                      <span>Simular & Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      id={`whatsapp-service-${service.id}`}
                      href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=${encodeURIComponent(
                        `Olá! Vi o serviço "${service.title}" no site do Agro-pet Mix e gostaria de mais informações.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-emerald-700 hover:text-white transition-colors"
                    >
                      <span>Consultar no WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Taxi Pet */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Truck className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xl font-black">Precisa de Táxi Pet ou Entrega em Arapongas?</h4>
              <p className="text-white/80 text-sm mt-1 max-w-xl">
                Buscamos seu cãozinho ou gatinho com segurança no seu endereço e entregamos rações e medicamentos no mesmo dia.
              </p>
            </div>
          </div>
          <a
            id="banner-taxi-whatsapp"
            href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20o%20servi%C3%A7o%20de%20T%C3%A1xi%20Pet%20ou%20Disk%20Entrega%20em%20Arapongas.`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-stone-900 bg-white hover:bg-stone-100 shadow-md transition-all shrink-0 text-sm"
          >
            Chamar Táxi Pet / Entrega
          </a>
        </div>
      </div>
    </section>
  );
};
