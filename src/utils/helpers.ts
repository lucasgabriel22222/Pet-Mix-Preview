import { BookingFormState } from '../types';

export function getBusinessStatus(): {
  isOpen: boolean;
  statusText: string;
  nextOpenText: string;
} {
  // Use Brazil/Sao Paulo timezone (UTC-3)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  // Brazil standard time is UTC-3
  const brazilTime = new Date(utc - 3 * 3600000);

  const day = brazilTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = brazilTime.getHours();
  const minute = brazilTime.getMinutes();
  const currentMinutes = hour * 60 + minute;

  // Sunday: 8:00 to 12:00
  if (day === 0) {
    const openMinutes = 8 * 60;
    const closeMinutes = 12 * 60;
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        isOpen: true,
        statusText: 'Aberto agora (fecha às 12:00)',
        nextOpenText: 'Aberto hoje até as 12:00',
      };
    }
    if (currentMinutes < openMinutes) {
      return {
        isOpen: false,
        statusText: 'Fechado agora (abre hoje às 08:00)',
        nextOpenText: 'Abre hoje às 08:00',
      };
    }
    return {
      isOpen: false,
      statusText: 'Fechado agora (abre amanhã às 08:00)',
      nextOpenText: 'Abre segunda-feira às 08:00',
    };
  }

  // Mon - Sat: 8:00 to 19:00
  const openMinutes = 8 * 60;
  const closeMinutes = 19 * 60;
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      statusText: 'Aberto agora (fecha às 19:00)',
      nextOpenText: 'Aberto hoje até as 19:00',
    };
  }
  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusText: 'Fechado agora (abre hoje às 08:00)',
      nextOpenText: 'Abre hoje às 08:00',
    };
  }
  return {
    isOpen: false,
    statusText: 'Fechado agora (abre amanhã às 08:00)',
    nextOpenText: day === 6 ? 'Abre domingo às 08:00' : 'Abre amanhã às 08:00',
  };
}

export function buildWhatsAppBookingUrl(booking: BookingFormState): string {
  const serviceLabels: Record<string, string> = {
    'banho-completo': 'Banho Tradicional',
    'tosa-higienica': 'Tosa Higiênica',
    'tosa-completa-raca': 'Tosa Geral / da Raça',
    'hidratacao-pelagem': 'Hidratação Profunda',
    'corte-unhas': 'Corte de Unhas',
    'limpeza-ouvidos': 'Limpeza Auricular',
  };

  const servicesFormatted =
    booking.selectedServices.length > 0
      ? booking.selectedServices
          .map((id) => serviceLabels[id] || id)
          .join(', ')
      : 'Banho & Tosa';

  const petTypeFormatted = booking.petType === 'cachorro' ? 'Cão' : 'Gato';
  const sizeFormatted = {
    pequeno: 'Pequeno (até 7kg)',
    medio: 'Médio (7 a 15kg)',
    grande: 'Grande (15 a 25kg)',
    gigante: 'Gigante (+25kg)',
  }[booking.petSize];

  const coatFormatted = {
    curto: 'Pelagem Curta',
    medio: 'Pelagem Média',
    longo: 'Pelagem Longa',
  }[booking.coatType];

  let message = `Olá, Pet Shop Agro-pet Mix!\n`;
  message += `Gostaria de agendar um atendimento para o meu pet através do site:\n\n`;
  message += `• Tutor(a): ${booking.tutorName || 'Não informado'}\n`;
  if (booking.tutorPhone) message += `• Telefone: ${booking.tutorPhone}\n`;
  message += `• Pet: ${booking.petName || 'Meu pet'} (${petTypeFormatted} - ${sizeFormatted}, ${coatFormatted})\n`;
  message += `• Serviços de interesse: ${servicesFormatted}\n`;
  if (booking.preferredDate) message += `• Data sugerida: ${booking.preferredDate}\n`;
  if (booking.preferredTime) message += `• Horário sugerido: ${booking.preferredTime}\n`;
  message += `• Precisa de Táxi Pet (Leva e Traz)?: ${booking.needsTransportation ? 'Sim, favor incluir orçamento de transporte' : 'Não, levarei na loja'}\n`;
  if (booking.notes) message += `• Observações/Cuidados: ${booking.notes}\n`;
  message += `\nPoderiam confirmar a disponibilidade e o valor certinho? Obrigado(a)!`;

  return `https://wa.me/5543991140043?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppUrl(productName: string, category: string): string {
  const message = `Olá, equipe Agro-pet Mix!\nVi o produto "${productName}" (${category}) no site e gostaria de saber o valor atualizado, disponibilidade e se vocês entregam aqui em Arapongas!`;
  return `https://wa.me/5543991140043?text=${encodeURIComponent(message)}`;
}
