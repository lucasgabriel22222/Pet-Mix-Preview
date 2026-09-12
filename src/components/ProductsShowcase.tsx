import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Truck, Search } from 'lucide-react';
import { PRODUCTS_FEATURED, PET_SHOP_DATA } from '../data/petShopData';
import { ProductItem } from '../types';
import { buildProductWhatsAppUrl } from '../utils/helpers';

export const ProductsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: 'farmacia', label: 'Farmácia & Antipulgas' },
    { id: 'caes', label: 'Cães & Rações' },
    { id: 'gatos', label: 'Gatos' },
    { id: 'acessorios', label: 'Acessórios & Caminhas' },
    { id: 'agro', label: 'Linha Agro & Aves' },
  ];

  const filteredProducts = PRODUCTS_FEATURED.filter((prod: ProductItem) => {
    const matchesCategory = selectedCategory === 'todos' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="produtos" className="py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            Loja & Farmácia Veterinária
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Produtos Selecionados & Farmácia Completa
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Trabalhamos apenas com marcas renomadas, rações frescas e medicamentos veterinários originais para a segurança do seu animal.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`prod-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar ração, remédio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-1">
                  {product.brand}
                </span>
                <h3 className="text-base font-black text-stone-900 mb-1 leading-snug">
                  {product.name}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed mb-4 flex-grow">
                  {product.description}
                </p>

                {/* Price & Action */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">
                      Preço Referência
                    </span>
                    <span className="text-sm font-black text-emerald-800">
                      {product.price || 'Sob Consulta'}
                    </span>
                  </div>

                  <a
                    id={`buy-prod-${product.id}`}
                    href={buildProductWhatsAppUrl(product.name, product.category)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Pedir Rápido</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty search state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6">
            <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto mb-2" />
            <p className="text-stone-700 font-bold text-sm">Nenhum produto encontrado nesta busca.</p>
            <p className="text-stone-500 text-xs mt-1">
              Temos centenas de itens na loja! Chame no WhatsApp que verificamos o estoque na hora.
            </p>
            <a
              id="empty-prod-whatsapp-btn"
              href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1!%20Procuro%20um%20produto%20espec%C3%ADfico%20na%20Agro-pet%20Mix.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar estoque com atendente</span>
            </a>
          </div>
        )}

        {/* Disk Ração Box */}
        <div className="mt-12 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-stone-900">
                Disk Ração & Remédio em Arapongas
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                Acabou a ração do seu pet? Mande uma mensagem que levamos até sua casa com agilidade e máquina de cartão móvel!
              </p>
            </div>
          </div>
          <a
            id="disk-racao-whatsapp-btn"
            href={`https://wa.me/${PET_SHOP_DATA.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20uma%20entrega%20de%20ra%C3%A7%C3%A3o%20em%20Arapongas.`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-5 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors text-xs sm:text-sm shadow-xs"
          >
            Fazer Pedido por Tele-entrega
          </a>
        </div>
      </div>
    </section>
  );
};
