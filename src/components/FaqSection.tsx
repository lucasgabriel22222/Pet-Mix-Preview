import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA, PET_SHOP_DATA } from '../data/petShopData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Tudo o que você precisa saber sobre nossos atendimentos, táxi pet e entregas.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-emerald-800 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-stone-900">Ainda tem alguma pergunta?</h4>
            <p className="text-xs text-stone-500">Estamos prontos para te atender e tirar qualquer dúvida.</p>
          </div>
          <a
            id="faq-whatsapp-btn"
            href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os%20do%20Agro-pet%20Mix.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
