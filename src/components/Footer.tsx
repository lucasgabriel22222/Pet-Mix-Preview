import React from 'react';
import { MapPin, Phone, Clock, Star, Heart, Navigation, MessageCircle, Dog } from 'lucide-react';
import { PET_SHOP_DATA } from '../data/petShopData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#122216] text-white/80 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col: 4 cols */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Dog className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-none">
                  Agro-pet <span className="text-emerald-400">Mix</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-300/90 tracking-wide uppercase">
                  Pet Shop & Agropecuária
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Dedicados ao cuidado, estética e saúde animal em Arapongas. Banho e tosa de excelência, farmácia veterinária e nutrição para cães, gatos e animais de criação.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-white/90 font-bold">5.0 Estrelas no Google</span>
            </div>
          </div>

          {/* Quick Links: 2 cols */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-emerald-300 transition-colors">Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-emerald-300 transition-colors">Serviços</a>
              </li>
              <li>
                <a href="#agendamento" className="hover:text-emerald-300 transition-colors">Banho & Tosa</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-emerald-300 transition-colors">Produtos</a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-emerald-300 transition-colors">Avaliações</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-emerald-300 transition-colors">Como Chegar</a>
              </li>
            </ul>
          </div>

          {/* Services list: 3 cols */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Especialidades</h4>
            <ul className="space-y-2 text-white/70">
              <li>• Banho & Tosa Higiênica</li>
              <li>• Tosa da Raça & Hidratação</li>
              <li>• Farmácia Veterinária Completa</li>
              <li>• Rações Premium e Super Premium</li>
              <li>• Táxi Pet (Leva e Traz)</li>
              <li>• Linha Agropecuária e Aves</li>
            </ul>
          </div>

          {/* Contact & Hours: 3 cols */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Contato & Endereço</h4>
            <p className="flex items-start gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{PET_SHOP_DATA.address.full}</span>
            </p>
            <p className="flex items-center gap-2 text-white/80">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{PET_SHOP_DATA.phone}</span>
            </p>
            <p className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Seg - Sáb: 8h às 19h | Dom: 8h às 12h</span>
            </p>

            <div className="pt-2">
              <a
                id="footer-maps-link"
                href={PET_SHOP_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Ver Rota no Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Pet Shop Agro-pet Mix - Arapongas, PR. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Feito com carinho para os pets de Arapongas</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};
