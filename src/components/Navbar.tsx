import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, Menu, X, Calendar, MessageCircle, Star, Dog } from 'lucide-react';
import { PET_SHOP_DATA } from '../data/petShopData';
import { getBusinessStatus } from '../utils/helpers';

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [businessStatus, setBusinessStatus] = useState(getBusinessStatus());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Refresh business status every 60s
    const interval = setInterval(() => {
      setBusinessStatus(getBusinessStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Banho & Tosa', href: '#agendamento' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Como Chegar', href: '#localizacao' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro bar for store status & phone */}
      <div className="bg-[#12281a] text-white/90 text-xs py-1.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${businessStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-medium text-white">{businessStatus.statusText}</span>
            </div>
            <span className="hidden md:inline text-white/40">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PET_SHOP_DATA.address.street} - Arapongas, PR</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 no Google Maps</span>
            </div>
            <a
              id="top-bar-whatsapp-link"
              href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Pet%20Shop%20Agro-pet%20Mix!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{PET_SHOP_DATA.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white/90 backdrop-blur-sm py-4'
        } border-b border-stone-200/80`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a id="brand-logo-link" href="#inicio" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Dog className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                Agro-pet <span className="text-emerald-700 font-black">Mix</span>
              </span>
              <span className="text-[11px] font-semibold text-stone-600 tracking-wide uppercase">
                Pet Shop & Agropecuária • Arapongas
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-stone-700 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="nav-whatsapp-cta"
              href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20Agro-pet%20Mix!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 transition-colors border border-stone-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              id="nav-agendar-cta"
              href="#agendamento"
              onClick={onOpenBookingModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm shadow-emerald-700/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Banho</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
            aria-label="Alternar Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-stone-100 flex flex-col gap-2.5">
                <a
                  id="mobile-nav-booking"
                  href="#agendamento"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Banho e Tosa</span>
                </a>
                <a
                  id="mobile-nav-whatsapp"
                  href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20Agro-pet%20Mix!%20Gostaria%20de%20falar%20com%20voc%C3%AAs.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chamar no WhatsApp ({PET_SHOP_DATA.phone})</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
