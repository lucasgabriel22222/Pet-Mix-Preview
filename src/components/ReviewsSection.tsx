import React from 'react';
import { Star, MessageCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA, PET_SHOP_DATA } from '../data/petShopData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Google Badge */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
              Avaliações no Google Maps
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Quem ama o seu pet confia na Agro-pet Mix
            </h2>
            <p className="mt-2 text-stone-600 text-base max-w-xl">
              Nossa maior recompensa é ver seu bichinho saudável, calmo e feliz, com o carinho e dedicação de toda a nossa equipe.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-[#faf8f5] border border-stone-200/90 rounded-3xl p-6 flex items-center gap-5 shadow-xs shrink-0">
            <div className="text-center">
              <span className="text-4xl font-black text-stone-900 block leading-none">5.0</span>
              <div className="flex text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-stone-500 font-semibold mt-1 block">
                Google Reviews
              </span>
            </div>
            <div className="h-12 w-px bg-stone-200" />
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Satisfação</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">Localização verificada em Arapongas - PR</p>
              <a
                id="maps-verified-link"
                href={PET_SHOP_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-1"
              >
                <span>Ver no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-[#faf8f5] rounded-3xl p-6 border border-stone-200/70 flex flex-col justify-between relative group hover:border-emerald-300 transition-colors"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-200/60">
                <img
                  src={review.avatarUrl}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{review.author}</h4>
                  <p className="text-xs text-stone-500">{review.petInfo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom review link CTA */}
        <div className="text-center mt-10">
          <a
            id="leave-review-maps-btn"
            href={PET_SHOP_DATA.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-700 hover:text-emerald-700 bg-stone-100 hover:bg-stone-200 px-4 py-2.5 rounded-xl transition-colors border border-stone-200"
          >
            <span>Já é nosso cliente? Deixe sua avaliação no Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
