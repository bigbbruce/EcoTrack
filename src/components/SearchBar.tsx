import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryKey } from '../types';

export const SearchBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter
  } = useApp();

  const categories: { key: CategoryKey | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: 'grid_view' },
    { key: 'transport', label: 'Transport', icon: 'directions_car' },
    { key: 'food', label: 'Food', icon: 'restaurant' },
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'shopping', label: 'Shopping', icon: 'shopping_bag' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 space-y-3">
      {/* Input box */}
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-4 text-[#717973] dark:text-[#a5d0b9] pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search activities, CO2 savings, tips, or categories..."
          className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-[#1b2730] border border-[#c1c8c2] dark:border-[#313d46] rounded-2xl shadow-sm text-sm text-[#191c1c] dark:text-white placeholder-[#717973] dark:placeholder-[#717973] focus:outline-none focus:ring-2 focus:ring-[#1f6d1a] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 p-1 rounded-full text-[#717973] hover:text-[#191c1c] dark:hover:text-white hover:bg-[#edeeed] dark:hover:bg-[#313d46] transition-colors"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* Category quick filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => {
          const isActive = selectedCategoryFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategoryFilter(cat.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#a4f792] text-[#002201] shadow-sm font-bold scale-105'
                  : 'bg-[#f3f4f3] dark:bg-[#1b2730] text-[#414844] dark:text-[#c1c8c2] hover:bg-[#e7e8e7] dark:hover:bg-[#313d46]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
