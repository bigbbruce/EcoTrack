import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { CategoryKey, CategorySummary } from '../types';

export const DashboardScreen: React.FC = () => {
  const {
    categorySummaries,
    treesPlanted,
    setPage,
    setIsLogModalOpen,
    searchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CategorySummary | null>(null);

  // Filter categories if user types or selects category filter
  const filteredCategories = categorySummaries.filter(cat => {
    const matchesFilter =
      selectedCategoryFilter === 'all' || selectedCategoryFilter === cat.categoryKey;
    const matchesQuery =
      !searchQuery ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.amountKg.toString().includes(searchQuery);
    return matchesFilter && matchesQuery;
  });

  // Calculate total monthly footprint in tons
  const totalKg = categorySummaries.reduce((sum, c) => sum + c.amountKg, 0);
  const totalTons = (totalKg / 1000).toFixed(1);
  const targetTons = 2.0;
  const targetPercent = Math.round((parseFloat(totalTons) / targetTons) * 100);

  // Circle gauge stroke values: circumference = 2 * PI * 100 = 628.3
  const circumference = 628.3;
  const strokeOffset = circumference - (circumference * Math.min(targetPercent, 100)) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-7xl mx-auto md:pl-24"
    >
      {/* Search & Quick Filters */}
      <SearchBar />

      {/* Hero Impact Gauge */}
      <section className="flex flex-col items-center justify-center my-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#717973] dark:text-[#a5d0b9] mb-2">
          Your Monthly Impact
        </span>

        {/* Radial Gauge */}
        <div className="relative w-64 h-64 my-2 animate-pulse-subtle flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
            {/* Background Track */}
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              className="text-[#e1e3e2] dark:text-[#313d46]"
            />
            {/* Animated Gauge Progress Fill */}
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="#012d1d"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="dark:stroke-[#a4f792] transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Stat */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-extrabold text-5xl md:text-6xl text-[#012d1d] dark:text-white tracking-tight">
              {totalTons}
            </span>
            <span className="text-sm font-semibold text-[#414844] dark:text-[#c1c8c2] mt-0.5">
              Tons CO2
            </span>
          </div>
        </div>

        {/* Goal Badge */}
        <div className="mt-2 bg-[#1b4332] text-[#c1ecd4] px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg text-xs md:text-sm font-bold">
          <span
            className="material-symbols-outlined text-lg text-[#a4f792]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
          <span>{targetPercent}% of your 2.0t monthly target</span>
        </div>
      </section>

      {/* Categories Grid Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#012d1d] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-[#1f6d1a] dark:text-[#a4f792]">
            pie_chart
          </span>
          Emission Categories
        </h2>
        {selectedCategoryFilter !== 'all' && (
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className="text-xs font-semibold text-[#1f6d1a] dark:text-[#a4f792] hover:underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Categories Bento Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {filteredCategories.map(cat => (
          <motion.div
            key={cat.categoryKey}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedCategory(cat)}
            className="bg-white dark:bg-[#1b2730] rounded-3xl p-5 shadow-[0_12px_24px_rgba(27,67,50,0.06)] dark:shadow-none hover:shadow-xl transition-all border border-[#e1e3e2]/50 dark:border-[#313d46] cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#a4f792]/30 dark:bg-[#313d46] flex items-center justify-center text-[#1f6d1a] dark:text-[#a4f792]">
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                </div>
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    cat.changeType === 'up'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : cat.changeType === 'down'
                      ? 'bg-[#a4f792] text-[#005303]'
                      : 'bg-[#edeeed] text-[#414844] dark:bg-[#313d46] dark:text-[#c1c8c2]'
                  }`}
                >
                  {cat.changePercent > 0
                    ? `+${cat.changePercent}%`
                    : cat.changePercent < 0
                    ? `${cat.changePercent}%`
                    : 'Stable'}
                </span>
              </div>
              <h3 className="font-extrabold text-2xl text-[#012d1d] dark:text-white mb-0.5">
                {cat.amountKg}kg
              </h3>
              <p className="text-xs font-medium text-[#717973] dark:text-[#a5d0b9] capitalize mb-3">
                {cat.title}
              </p>
            </div>

            {/* Sparkline Bar Chart */}
            <div className="h-10 w-full flex items-end gap-1 pt-1">
              {cat.monthlyBars.map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className={`flex-1 rounded-t-sm transition-all ${
                    idx === cat.monthlyBars.length - 1
                      ? 'bg-[#012d1d] dark:bg-[#a4f792]'
                      : 'bg-[#a5d0b9]/40 dark:bg-[#313d46]'
                  }`}
                  title={`Bar ${idx + 1}: ${val}%`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Sustainable Path & Trees Saved Banner Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feature Card: Sustainable Path */}
        <div className="lg:col-span-8 bg-[#f3f4f3] dark:bg-[#1b2730] rounded-3xl p-6 sm:p-8 border border-[#c1c8c2]/30 dark:border-[#313d46] relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="relative z-10 max-w-md">
            <span className="inline-block px-3 py-1 bg-[#1b4332] text-[#c1ecd4] rounded-full text-xs font-bold mb-3 tracking-wide uppercase">
              SUSTAINABLE PATH
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl text-[#012d1d] dark:text-white mb-3">
              On track for 15% reduction
            </h2>
            <p className="text-sm sm:text-base text-[#414844] dark:text-[#c1c8c2] mb-6 leading-relaxed">
              You're currently on track to reduce your carbon footprint by 15% this year. Keep focusing on transport options!
            </p>
            <button
              onClick={() => setPage('insights')}
              className="bg-[#012d1d] dark:bg-[#a4f792] text-white dark:text-[#002201] px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>VIEW DETAILED INSIGHTS</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden md:block opacity-40 hover:opacity-60 transition-opacity">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7CLL1hNj_Wn78gjx_fMLl1UedwZTCJU5bCqzP2oDuS5cUYdoBRlgGn6A-fvidaOtpv0DZxD-1f-e6TST3eCEjEcSoS7c50XaG9INCquQx2sLY8qysxA1PSrPP5xOs1WPFC--J4_esD0wgTme1Rn43FJaSFySjuUbWlJcVOOeFEWLApOU1sIzZov0IBdNiMNB4aKBBpthjpmJg6g_jvSY18HcLsOliRMVAJ6_tbcPeoTdGPsTacExesA')`
              }}
            />
          </div>
        </div>

        {/* Stat Card: Trees Saved */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1b2730] rounded-3xl p-6 sm:p-8 shadow-[0_12px_24px_rgba(27,67,50,0.04)] border border-[#e1e3e2]/40 dark:border-[#313d46] flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#c1ecd4]/50 dark:bg-[#313d46] flex items-center justify-center text-[#012d1d] dark:text-[#a4f792] mb-4">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              park
            </span>
          </div>
          <h4 className="font-extrabold text-2xl text-[#012d1d] dark:text-white mb-2">
            {treesPlanted} Trees Saved
          </h4>
          <p className="text-xs sm:text-sm text-[#717973] dark:text-[#c1c8c2] max-w-xs leading-normal">
            Your environmental efforts this year are equivalent to planting {treesPlanted} mature trees.
          </p>
        </div>
      </section>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1b2730] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#c1c8c2]/50 dark:border-[#313d46]">
            <div className="flex justify-between items-center pb-3 border-b border-[#edeeed] dark:border-[#313d46] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-[#a4f792]/30 flex items-center justify-center text-[#1f6d1a]">
                  <span className="material-symbols-outlined text-2xl">
                    {selectedCategory.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#012d1d] dark:text-white capitalize">
                    {selectedCategory.title} Category
                  </h3>
                  <p className="text-xs text-[#717973] dark:text-[#a5d0b9]">
                    Detailed carbon metrics
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-1 rounded-full text-[#717973] hover:bg-[#edeeed] dark:hover:bg-[#313d46]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-[#f9f9f8] dark:bg-[#121413] p-4 rounded-2xl border border-[#edeeed] dark:border-[#313d46] flex justify-between items-center">
                <span className="text-xs text-[#414844] dark:text-[#c1c8c2] font-semibold">
                  Monthly Total
                </span>
                <span className="text-xl font-extrabold text-[#012d1d] dark:text-white">
                  {selectedCategory.amountKg} kg CO2e
                </span>
              </div>

              <div className="bg-[#f9f9f8] dark:bg-[#121413] p-4 rounded-2xl border border-[#edeeed] dark:border-[#313d46] flex justify-between items-center">
                <span className="text-xs text-[#414844] dark:text-[#c1c8c2] font-semibold">
                  Month-over-Month Change
                </span>
                <span
                  className={`text-sm font-bold ${
                    selectedCategory.changePercent > 0
                      ? 'text-[#ba1a1a]'
                      : selectedCategory.changePercent < 0
                      ? 'text-[#1f6d1a] dark:text-[#a4f792]'
                      : 'text-[#414844]'
                  }`}
                >
                  {selectedCategory.changePercent > 0
                    ? `+${selectedCategory.changePercent}% (Increase)`
                    : selectedCategory.changePercent < 0
                    ? `${selectedCategory.changePercent}% (Saved)`
                    : 'Stable (0%)'}
                </span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(selectedCategory.categoryKey);
                    setSelectedCategory(null);
                    setPage('activity');
                  }}
                  className="w-full py-3 bg-[#012d1d] dark:bg-[#a4f792] text-white dark:text-[#002201] rounded-2xl font-bold text-xs shadow-md"
                >
                  View Activities in Activity Tab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Log Activity FAB (+) */}
      <button
        onClick={() => setIsLogModalOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 z-40 bg-[#012d1d] dark:bg-[#a4f792] text-white dark:text-[#002201] w-14 h-14 rounded-full shadow-[0_8px_24px_rgba(1,45,29,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        title="Log New Activity"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">
          add
        </span>
      </button>
    </motion.div>
  );
};
