import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryKey } from '../types';

export const LogActivityModal: React.FC = () => {
  const { isLogModalOpen, setIsLogModalOpen, addActivity } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryKey>('transport');
  const [amountKg, setAmountKg] = useState('2.5');
  const [isPositive, setIsPositive] = useState(true); // default: saved CO2

  if (!isLogModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedKg = parseFloat(amountKg) || 1.0;

    let icon = 'eco';
    if (category === 'transport') icon = isPositive ? 'electric_bike' : 'directions_car';
    if (category === 'food') icon = 'restaurant';
    if (category === 'home') icon = isPositive ? 'solar_power' : 'laundry';
    if (category === 'shopping') icon = isPositive ? 'recycling' : 'shopping_bag';

    addActivity({
      title: title.trim(),
      description: description.trim() || `${category.toUpperCase()} activity`,
      category,
      amountKg: parsedKg,
      isPositive,
      date: 'Just now',
      timeSegment: 'day',
      icon
    });

    setTitle('');
    setDescription('');
    setAmountKg('2.5');
    setIsLogModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#1b2730] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#c1c8c2]/40 dark:border-[#313d46] space-y-5">
        <div className="flex items-center justify-between border-b border-[#edeeed] dark:border-[#313d46] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#a4f792] flex items-center justify-center text-[#002201]">
              <span className="material-symbols-outlined text-xl">add_task</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#012d1d] dark:text-white">
                Log New Carbon Activity
              </h2>
              <p className="text-xs text-[#717973] dark:text-[#a5d0b9]">
                Calculate & track your daily environmental footprint
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLogModalOpen(false)}
            className="p-2 text-[#717973] hover:text-[#191c1c] dark:hover:text-white rounded-full hover:bg-[#edeeed] dark:hover:bg-[#313d46]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#414844] dark:text-[#c1c8c2] uppercase mb-1">
              Activity Name
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. 15km Metro Transit, Solar Cooking, Farmers Market"
              className="w-full px-4 py-2.5 bg-[#f9f9f8] dark:bg-[#121413] border border-[#c1c8c2] dark:border-[#313d46] rounded-xl text-[#191c1c] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1f6d1a]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#414844] dark:text-[#c1c8c2] uppercase mb-1">
              Description / Context
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Replaced car trip to city center"
              className="w-full px-4 py-2.5 bg-[#f9f9f8] dark:bg-[#121413] border border-[#c1c8c2] dark:border-[#313d46] rounded-xl text-[#191c1c] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1f6d1a]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#414844] dark:text-[#c1c8c2] uppercase mb-1">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['transport', 'food', 'home', 'shopping'] as CategoryKey[]).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 capitalize transition-all ${
                    category === cat
                      ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
                      : 'bg-[#f3f4f3] dark:bg-[#121413] text-[#414844] dark:text-[#c1c8c2] border-[#c1c8c2]/50 dark:border-[#313d46]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {cat === 'transport'
                      ? 'directions_car'
                      : cat === 'food'
                      ? 'restaurant'
                      : cat === 'home'
                      ? 'home'
                      : 'shopping_bag'}
                  </span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Impact Type (Saved vs Emitted) */}
          <div>
            <label className="block text-xs font-bold text-[#414844] dark:text-[#c1c8c2] uppercase mb-1">
              Environmental Impact Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsPositive(true)}
                className={`py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isPositive
                    ? 'bg-[#a4f792] text-[#002201] border-[#a4f792] shadow-md'
                    : 'bg-[#f3f4f3] dark:bg-[#121413] text-[#717973] border-[#c1c8c2]/50 dark:border-[#313d46]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">eco</span>
                <span>CO2 Saved (- kg)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPositive(false)}
                className={`py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  !isPositive
                    ? 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6] shadow-md'
                    : 'bg-[#f3f4f3] dark:bg-[#121413] text-[#717973] border-[#c1c8c2]/50 dark:border-[#313d46]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">cloud_off</span>
                <span>CO2 Emitted (+ kg)</span>
              </button>
            </div>
          </div>

          {/* Amount in kg */}
          <div>
            <label className="block text-xs font-bold text-[#414844] dark:text-[#c1c8c2] uppercase mb-1">
              CO2 Impact (kg)
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={amountKg}
                onChange={e => setAmountKg(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f9f9f8] dark:bg-[#121413] border border-[#c1c8c2] dark:border-[#313d46] rounded-xl text-[#191c1c] dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#1f6d1a]"
              />
              <span className="absolute right-4 text-xs font-bold text-[#717973] uppercase">
                kg CO2e
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={() => setIsLogModalOpen(false)}
              className="flex-1 py-3 bg-[#e7e8e7] dark:bg-[#313d46] text-[#414844] dark:text-white rounded-2xl font-bold text-xs hover:bg-[#c1c8c2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#012d1d] hover:bg-[#1b4332] text-white dark:bg-[#a4f792] dark:text-[#002201] rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Save Activity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
