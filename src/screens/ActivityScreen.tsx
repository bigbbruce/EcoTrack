import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { TimeSegment } from '../types';

export const ActivityScreen: React.FC = () => {
  const {
    activities,
    timeSegment,
    setTimeSegment,
    searchQuery,
    selectedCategoryFilter,
    deleteActivity,
    setIsLogModalOpen,
    setPage
  } = useApp();

  // Filter activities based on timeSegment, searchQuery, and categoryFilter
  const filteredActivities = activities.filter(act => {
    // Check timeSegment filter
    const matchesTime = act.timeSegment === timeSegment;

    // Check category filter
    const matchesCat =
      selectedCategoryFilter === 'all' || act.category === selectedCategoryFilter;

    // Check search query
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      act.title.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.category.toLowerCase().includes(q) ||
      act.amountKg.toString().includes(q);

    return matchesTime && matchesCat && matchesQuery;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-5xl mx-auto md:pl-24"
    >
      {/* Search Bar */}
      <SearchBar />

      {/* Summary Header */}
      <section className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d] dark:text-white mb-1">
          Your Impact
        </h1>
        <p className="text-sm text-[#414844] dark:text-[#a5d0b9]">
          Review your latest environmental contributions.
        </p>
      </section>

      {/* Segmented Control Filter (Sticky) */}
      <section className="sticky top-16 z-30 bg-[#f9f9f8]/95 dark:bg-[#121413]/95 backdrop-blur-md py-2.5 mb-6">
        <div className="bg-[#f3f4f3] dark:bg-[#1b2730] p-1 rounded-full flex w-full max-w-md mx-auto shadow-sm border border-[#c1c8c2]/30 dark:border-[#313d46]">
          {(['day', 'week', 'month'] as TimeSegment[]).map(seg => {
            const isActive = timeSegment === seg;
            return (
              <button
                key={seg}
                onClick={() => setTimeSegment(seg)}
                className={`flex-1 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                  isActive
                    ? 'bg-[#a4f792] text-[#002201] shadow-md scale-[1.02]'
                    : 'text-[#414844] dark:text-[#c1c8c2] hover:bg-[#e7e8e7] dark:hover:bg-[#313d46]'
                }`}
              >
                {seg === 'day' ? 'Day' : seg === 'week' ? 'Week' : 'Month'}
              </button>
            );
          })}
        </div>
      </section>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#1b2730] rounded-2xl border border-[#c1c8c2]/30 dark:border-[#313d46] p-6 space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#717973]">
              search_off
            </span>
            <p className="text-sm font-semibold text-[#414844] dark:text-[#c1c8c2]">
              No activities match your current filter or search criteria.
            </p>
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-4 py-2 bg-[#012d1d] dark:bg-[#a4f792] text-white dark:text-[#002201] rounded-full text-xs font-bold"
            >
              Log New Activity
            </button>
          </div>
        ) : (
          filteredActivities.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-[#1b2730] rounded-2xl p-4 sm:p-5 shadow-[0_8px_16px_rgba(27,67,50,0.04)] border border-[#edeeed] dark:border-[#313d46] flex items-center justify-between gap-4 hover:shadow-md transition-shadow group"
            >
              {/* Left icon badge */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  act.isPositive
                    ? 'bg-[#a4f792] text-[#002201]'
                    : 'bg-[#edeeed] dark:bg-[#313d46] text-[#414844] dark:text-[#c1c8c2]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: act.isPositive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {act.icon}
                </span>
              </div>

              {/* Title & description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#012d1d] dark:text-white truncate">
                    {act.title}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#f3f4f3] dark:bg-[#313d46] text-[#717973] dark:text-[#a5d0b9]">
                    {act.category}
                  </span>
                </div>
                <p className="text-xs text-[#717973] dark:text-[#c1c8c2] truncate mt-0.5">
                  {act.description}
                </p>
              </div>

              {/* Right Impact Value */}
              <div className="text-right shrink-0 flex items-center gap-3">
                <div>
                  <p
                    className={`text-base font-bold ${
                      act.isPositive
                        ? 'text-[#1f6d1a] dark:text-[#a4f792]'
                        : 'text-[#ba1a1a] dark:text-[#ffdad6]'
                    }`}
                  >
                    {act.isPositive ? `-${act.amountKg}kg` : `+${act.amountKg}kg`}
                  </p>
                  <p className="text-[10px] font-bold text-[#717973] uppercase tracking-wider">
                    {act.isPositive ? 'SAVED' : 'CO2E'}
                  </p>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => deleteActivity(act.id)}
                  className="p-1.5 text-[#717973] hover:text-[#ba1a1a] rounded-full hover:bg-[#ffdad6]/40 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete activity"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Feature Card / Bento Insight */}
      <div className="bg-[#1b4332] text-white rounded-3xl p-6 mt-8 relative overflow-hidden shadow-lg border border-[#274e3d]">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-[#c1ecd4]/20 backdrop-blur-md rounded-full text-[11px] font-bold mb-3 uppercase tracking-wider text-[#a5d0b9]">
            WEEKLY HIGHLIGHT
          </span>
          <h4 className="text-xl font-bold mb-2 text-white">Efficiency Expert</h4>
          <p className="text-sm text-[#a5d0b9] max-w-md leading-relaxed">
            You've saved 15% more CO2 than last week by switching to plant-based meals.
          </p>
          <button
            onClick={() => setPage('insights')}
            className="mt-4 bg-[#a4f792] text-[#002201] font-bold text-xs px-6 py-2.5 rounded-full active:scale-95 transition-transform shadow-md"
          >
            View Details
          </button>
        </div>

        <div className="absolute right-4 -bottom-6 w-32 h-32 bg-[#a4f792]/10 rounded-full blur-2xl pointer-events-none" />
      </div>

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
