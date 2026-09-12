import React from 'react';
import { Heart, Award, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { PET_SHOP_DATA } from '../data/petShopData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
                  alt="Pet sendo bem tratado no banho e tosa Agro-pet Mix"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Sobre a Agro-pet Mix
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
              Tradição em cuidar da família de quatro patas e da criação no campo
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              Localizado no <strong>Jardim Petrópolis</strong> em <strong>Arapongas - PR</strong>, o <strong>Pet Shop Agro-pet Mix</strong> nasceu da paixão genuína pelos animais e pelo setor agropecuário. Aqui, seu pet não é apenas um cliente — é parte da nossa família.
            </p>

            <p className="text-stone-600 text-base leading-relaxed">
              Trabalhamos com protocolo de estética animal humanizado: sem violência, sem pressa excessiva e com produtos certificados e dermatologicamente testados. Além disso, nosso setor agropecuário e de aves oferece nutrição selecionada com preço justo e atendimento amigável.
            </p>

            {/* Core Values 3-col */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-stone-900">Amor Genuíno</h4>
                <p className="text-stone-600 text-xs mt-1">
                  Manejo calmo respeitando os limites de cada cão e gato.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-stone-900">Higiene Rígida</h4>
                <p className="text-stone-600 text-xs mt-1">
                  Toalhas lacradas e materiais esterilizados a cada serviço.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-stone-900">Agro & Pet</h4>
                <p className="text-stone-600 text-xs mt-1">
                  Do cãozinho de colo às aves e animais de criação rural.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
