import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { PET_SHOP_DATA } from '../data/petShopData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Mini greeting bubble */}
      {showTooltip && (
        <div className="bg-white rounded-2xl p-3.5 shadow-xl border border-stone-200 text-stone-800 text-xs max-w-xs animate-in slide-in-from-bottom-2 duration-300 relative flex items-start gap-2.5">
          <div>
            <p className="font-bold text-stone-900">Olá! Como podemos ajudar?</p>
            <p className="text-stone-600 text-[11px] mt-0.5">
              Agende banho e tosa ou tire suas dúvidas com nossa equipe no WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main floating WhatsApp button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Pet%20Shop%20Agro-pet%20Mix.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp com Pet Shop Agro-pet Mix"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 hover:scale-110 active:scale-95 transition-all relative group"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};
