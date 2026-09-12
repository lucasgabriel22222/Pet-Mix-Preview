import React, { useState } from 'react';
import { Calendar, Clock, Check, Sparkles, MessageCircle, AlertCircle, HelpCircle, CheckCircle2, Dog, Cat, Scissors, ShieldCheck } from 'lucide-react';
import { BookingFormState, PetSize, PetType, CoatType } from '../types';
import { PET_SHOP_DATA } from '../data/petShopData';
import { buildWhatsAppBookingUrl } from '../utils/helpers';

interface BookingCalculatorProps {
  initialServiceId?: string;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({ initialServiceId }) => {
  const [formState, setFormState] = useState<BookingFormState>({
    petName: '',
    petType: 'cachorro',
    petSize: 'pequeno',
    coatType: 'curto',
    selectedServices: initialServiceId ? [initialServiceId] : ['banho-completo', 'tosa-higienica'],
    tutorName: '',
    tutorPhone: '',
    preferredDate: '',
    preferredTime: '09:00',
    needsTransportation: false,
    notes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const availableServices = [
    { id: 'banho-completo', label: 'Banho Tradicional com Hidratação', basePrice: 45 },
    { id: 'tosa-higienica', label: 'Tosa Higiênica (patas e áreas íntimas)', basePrice: 25 },
    { id: 'tosa-completa-raca', label: 'Tosa Geral / Tosa da Raça na Máquina ou Tesoura', basePrice: 40 },
    { id: 'hidratacao-pelagem', label: 'Hidratação Profunda com Máscara Nutritiva', basePrice: 30 },
    { id: 'corte-unhas', label: 'Corte de Unhas & Limpeza Auricular', basePrice: 15 },
  ];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'banho-completo':
        return <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'tosa-higienica':
      case 'tosa-completa-raca':
        return <Scissors className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'hidratacao-pelagem':
        return <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'corte-unhas':
        return <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />;
      default:
        return null;
    }
  };

  const handleToggleService = (serviceId: string) => {
    setFormState((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      const updated = exists
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId];
      return { ...prev, selectedServices: updated };
    });
  };

  // Price estimate calculation based on size & coat
  const calculateEstimatedPrice = (): { min: number; max: number } => {
    let base = 0;
    availableServices.forEach((svc) => {
      if (formState.selectedServices.includes(svc.id)) {
        base += svc.basePrice;
      }
    });

    if (base === 0) return { min: 0, max: 0 };

    let multiplier = 1.0;
    if (formState.petSize === 'pequeno') multiplier = 1.0;
    else if (formState.petSize === 'medio') multiplier = 1.25;
    else if (formState.petSize === 'grande') multiplier = 1.6;
    else if (formState.petSize === 'gigante') multiplier = 2.0;

    if (formState.coatType === 'medio') multiplier += 0.15;
    if (formState.coatType === 'longo') multiplier += 0.35;

    const calculated = base * multiplier;
    const min = Math.round(calculated * 0.95);
    const max = Math.round(calculated * 1.1);
    return { min, max };
  };

  const priceEstimate = calculateEstimatedPrice();
  const whatsappUrl = buildWhatsAppBookingUrl(formState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    // Open whatsapp in new window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="agendamento" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            Agendamento & Simulação
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Reserve o horário do seu melhor amigo
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Preencha os dados do seu pet para calcular a estimativa e enviar a solicitação diretamente para o nosso WhatsApp em Arapongas.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: 7 cols */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6"
          >
            {/* Step 1: Pet Type & Size */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                1. Tipo de Pet
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="pet-type-dog"
                  onClick={() => setFormState({ ...formState, petType: 'cachorro' })}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border text-sm font-bold transition-all ${
                    formState.petType === 'cachorro'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <Dog className="w-5 h-5" />
                  <span>Cachorro</span>
                </button>
                <button
                  type="button"
                  id="pet-type-cat"
                  onClick={() => setFormState({ ...formState, petType: 'gato' })}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border text-sm font-bold transition-all ${
                    formState.petType === 'gato'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <Cat className="w-5 h-5" />
                  <span>Gato</span>
                </button>
              </div>
            </div>

            {/* Step 2: Porte do Pet */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                2. Porte do Animal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'pequeno', label: 'Pequeno', sub: 'Até 7kg' },
                  { id: 'medio', label: 'Médio', sub: '7 a 15kg' },
                  { id: 'grande', label: 'Grande', sub: '15 a 25kg' },
                  { id: 'gigante', label: 'Gigante', sub: 'Acima 25kg' },
                ].map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    id={`pet-size-${size.id}`}
                    onClick={() => setFormState({ ...formState, petSize: size.id as PetSize })}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      formState.petSize === size.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xs font-black">{size.label}</span>
                    <span className={`text-[11px] ${formState.petSize === size.id ? 'text-white/80' : 'text-stone-500'}`}>
                      {size.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pelagem */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                3. Tipo de Pelagem
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'curto', label: 'Curto' },
                  { id: 'medio', label: 'Médio' },
                  { id: 'longo', label: 'Longo / Com nós' },
                ].map((coat) => (
                  <button
                    key={coat.id}
                    type="button"
                    id={`coat-type-${coat.id}`}
                    onClick={() => setFormState({ ...formState, coatType: coat.id as CoatType })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      formState.coatType === coat.id
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {coat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Serviços Desejados */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                4. Serviços Desejados
              </label>
              <div className="space-y-2">
                {availableServices.map((svc) => {
                  const isChecked = formState.selectedServices.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => handleToggleService(svc.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all select-none ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                            isChecked ? 'bg-emerald-700 text-white' : 'border border-stone-300 bg-stone-50'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex items-center gap-2">
                          {getServiceIcon(svc.id)}
                          <span className="text-xs sm:text-sm">
                            {svc.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Táxi Pet Checkbox */}
            <div className="p-4 bg-emerald-100/60 border border-emerald-200/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="needsTransportationCheckbox"
                  checked={formState.needsTransportation}
                  onChange={(e) => setFormState({ ...formState, needsTransportation: e.target.checked })}
                  className="w-5 h-5 accent-emerald-700 rounded cursor-pointer"
                />
                <label htmlFor="needsTransportationCheckbox" className="cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold text-emerald-950 block">
                    Preciso de Táxi Pet (Leva e Traz em Arapongas)
                  </span>
                  <span className="text-[11px] text-emerald-800">
                    Buscamos e entregamos seu animalzinho em casa com total segurança.
                  </span>
                </label>
              </div>
              <span className="text-xs text-emerald-900 font-medium">
                (Opcional)
              </span>
            </div>

            {/* Step 6: Informações do Pet e Tutor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nome do seu Pet *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Thor, Mel, Bob..."
                  value={formState.petName}
                  onChange={(e) => setFormState({ ...formState, petName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Seu Nome (Tutor) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Silva"
                  value={formState.tutorName}
                  onChange={(e) => setFormState({ ...formState, tutorName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Data de Preferência
                </label>
                <input
                  type="date"
                  value={formState.preferredDate}
                  onChange={(e) => setFormState({ ...formState, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Horário Sugerido
                </label>
                <select
                  value={formState.preferredTime}
                  onChange={(e) => setFormState({ ...formState, preferredTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="08:30">08:30 (Manhã)</option>
                  <option value="09:30">09:30 (Manhã)</option>
                  <option value="10:30">10:30 (Manhã)</option>
                  <option value="11:30">11:30 (Manhã)</option>
                  <option value="13:30">13:30 (Tarde)</option>
                  <option value="14:30">14:30 (Tarde)</option>
                  <option value="15:30">15:30 (Tarde)</option>
                  <option value="16:30">16:30 (Tarde)</option>
                  <option value="17:30">17:30 (Tarde)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Algum cuidado especial? (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ex: idoso, tem medo de barulho alto, possui alergia na pele, etc."
                value={formState.notes}
                onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <button
              type="submit"
              id="calculator-submit-btn"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-700/30 transition-all text-base hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Agendamento para o WhatsApp</span>
            </button>
          </form>

          {/* Right Summary Card: 5 cols */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            {/* Price Box */}
            <div className="bg-[#183623] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">
                Resumo da Simulação
              </span>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {priceEstimate.min > 0
                    ? `R$ ${priceEstimate.min} - ${priceEstimate.max}`
                    : 'Selecione um serviço'}
                </span>
                {priceEstimate.min > 0 && <span className="text-xs text-emerald-300 font-semibold">(estimado)</span>}
              </div>
              <p className="text-xs text-white/70 mt-1">
                * O valor exato pode variar ligeiramente de acordo com o estado da pelagem e nós no momento da avaliação na loja.
              </p>

              {/* Breakdown */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs">
                <div className="flex justify-between text-white/90">
                  <span>Pet:</span>
                  <span className="font-bold capitalize">
                    {formState.petName ? formState.petName : 'Não informado'} ({formState.petType})
                  </span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>Porte / Pelagem:</span>
                  <span className="font-bold capitalize">
                    {formState.petSize} • {formState.coatType}
                  </span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>Serviços selecionados:</span>
                  <span className="font-bold">{formState.selectedServices.length} serviço(s)</span>
                </div>
                {formState.needsTransportation && (
                  <div className="flex justify-between text-emerald-300">
                    <span>Leva e Traz (Táxi Pet):</span>
                    <span className="font-bold">Solicitado</span>
                  </div>
                )}
                {formState.preferredDate && (
                  <div className="flex justify-between text-white/90">
                    <span>Data / Horário:</span>
                    <span className="font-bold">
                      {formState.preferredDate} às {formState.preferredTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Direct action */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  id="summary-direct-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-stone-900 bg-white hover:bg-emerald-50 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Confirmar pelo WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-stone-700 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Garantia Agro-pet Mix Arapongas
              </h4>
              <ul className="text-xs space-y-2 text-stone-600">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Toalhas esterilizadas e abertas na frente do tutor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Produtos hipoalergênicos e hidratação com PH fisiológico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ambiente monitorado e sem gaiolas apertadas.</span>
                </li>
              </ul>
            </div>

            {bookingSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  Sua simulação foi gerada com sucesso e a janela do WhatsApp foi aberta! Caso não tenha aberto, clique no botão acima.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
