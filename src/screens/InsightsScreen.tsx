import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';

export const InsightsScreen: React.FC = () => {
  const {
    ecoTips,
    toggleTipSaved,
    contributeTrees,
    searchQuery,
    selectedCategoryFilter
  } = useApp();

  const [activePointIndex, setActivePointIndex] = useState<number | null>(4);
  const [showBreakdownModal, setShowBreakdownModal] = useState<boolean>(false);

  const monthData = [
    { month: 'Jan', value: 480 },
    { month: 'Feb', value: 450 },
    { month: 'Mar', value: 460 },
    { month: 'Apr', value: 390 },
    { month: 'May', value: 420 },
    { month: 'Jun', value: 350 }
  ];

  // Filter eco-tips by search or category
  const filteredTips = ecoTips.filter(tip => {
    const matchesCat =
      selectedCategoryFilter === 'all' || tip.category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tip.title.toLowerCase().includes(q) ||
      tip.description.toLowerCase().includes(q) ||
      tip.saveKgText.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-7xl mx-auto md:pl-24"
    >
      {/* Real-time SearchBar */}
      <SearchBar />

      {/* Hero Insights Section */}
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d] dark:text-white mb-2">
          Carbon Insights
        </h1>
        <p className="text-sm text-[#414844] dark:text-[#a5d0b9] max-w-2xl leading-relaxed">
          Visualizing your environmental trajectory over the last six months. Small changes today lead to a sustainable tomorrow.
        </p>
      </section>

      {/* Bento Grid for Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Main Trend Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1b2730] rounded-3xl p-6 shadow-[0_12px_24px_rgba(27,67,50,0.04)] border border-[#e1e3e2]/50 dark:border-[#313d46] relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#012d1d] dark:text-white">
                Footprint Trends
              </h2>
              <p className="text-xs text-[#717973] dark:text-[#a5d0b9]">
                Monthly CO2 Emissions (kg)
              </p>
            </div>
            <div className="bg-[#a4f792] text-[#005303] px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
              -12% vs LY
            </div>
          </div>

          {/* Interactive SVG Line Chart */}
          <div className="h-64 w-full relative mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240">
              {/* Horizontal Grid Lines */}
              <line
                x1="0"
                y1="40"
                x2="800"
                y2="40"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-[#e1e3e2] dark:text-[#313d46]"
              />
              <line
                x1="0"
                y1="120"
                x2="800"
                y2="120"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-[#e1e3e2] dark:text-[#313d46]"
              />
              <line
                x1="0"
                y1="200"
                x2="800"
                y2="200"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-[#e1e3e2] dark:text-[#313d46]"
              />

              {/* Area Fill Gradient */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f6d1a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1f6d1a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Fill Path */}
              <path
                d="M 50 180 Q 180 140, 280 150 T 480 80 T 630 110 T 750 40 L 750 220 L 50 220 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth Line Path */}
              <path
                d="M 50 180 Q 180 140, 280 150 T 480 80 T 630 110 T 750 40"
                fill="none"
                stroke="#1f6d1a"
                strokeWidth="4"
                strokeLinecap="round"
                className="dark:stroke-[#a4f792]"
              />

              {/* Interactive Data Dots */}
              {[
                { cx: 50, cy: 180, idx: 0 },
                { cx: 190, cy: 150, idx: 1 },
                { cx: 330, cy: 160, idx: 2 },
                { cx: 470, cy: 90, idx: 3 },
                { cx: 610, cy: 120, idx: 4 },
                { cx: 750, cy: 40, idx: 5 }
              ].map(pt => (
                <g key={pt.idx} className="cursor-pointer">
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r={activePointIndex === pt.idx ? 9 : 6}
                    fill={activePointIndex === pt.idx ? '#a4f792' : '#1f6d1a'}
                    stroke="#ffffff"
                    strokeWidth="3"
                    onClick={() => setActivePointIndex(pt.idx)}
                    className="transition-all hover:scale-125"
                  />
                </g>
              ))}
            </svg>

            {/* X-Axis Month Labels */}
            <div className="flex justify-between px-6 mt-2 text-xs font-bold text-[#717973] dark:text-[#a5d0b9] uppercase tracking-wider">
              {monthData.map((d, i) => (
                <button
                  key={d.month}
                  onClick={() => setActivePointIndex(i)}
                  className={`hover:text-[#012d1d] dark:hover:text-white transition-colors ${
                    activePointIndex === i ? 'text-[#1f6d1a] dark:text-[#a4f792] underline font-extrabold' : ''
                  }`}
                >
                  {d.month}
                </button>
              ))}
            </div>

            {/* Tooltip Popup */}
            {activePointIndex !== null && (
              <div className="mt-3 bg-[#f3f4f3] dark:bg-[#121413] p-2.5 rounded-xl border border-[#c1c8c2]/40 text-xs font-semibold text-[#012d1d] dark:text-white flex items-center justify-between">
                <span>
                  <strong>{monthData[activePointIndex].month} Footprint:</strong> {monthData[activePointIndex].value} kg CO2e
                </span>
                <span className="text-[10px] text-[#1f6d1a] dark:text-[#a4f792] font-bold">
                  {monthData[activePointIndex].value < 400 ? 'Target Achieved 🎉' : 'Above Target'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Top Contributors Card */}
        <div className="lg:col-span-4 bg-[#012d1d] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between border border-[#1b4332]">
          <div>
            <h2 className="text-xl font-bold mb-4">Top Contributors</h2>
            <div className="space-y-4">
              {/* Flights */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Flights</span>
                  <span className="font-bold text-[#a4f792]">45%</span>
                </div>
                <div className="h-2.5 w-full bg-[#1b4332] rounded-full overflow-hidden">
                  <div className="h-full bg-[#a4f792] w-[45%] rounded-full" />
                </div>
              </div>

              {/* Car Transport */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Car Transport</span>
                  <span className="font-bold text-[#a5d0b9]">28%</span>
                </div>
                <div className="h-2.5 w-full bg-[#1b4332] rounded-full overflow-hidden">
                  <div className="h-full bg-[#a5d0b9] w-[28%] rounded-full opacity-90" />
                </div>
              </div>

              {/* Home Energy */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Home Energy</span>
                  <span className="font-bold text-[#a5d0b9]">15%</span>
                </div>
                <div className="h-2.5 w-full bg-[#1b4332] rounded-full overflow-hidden">
                  <div className="h-full bg-[#a5d0b9] w-[15%] rounded-full opacity-70" />
                </div>
              </div>

              {/* Meat-based Diet */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Meat-based Diet</span>
                  <span className="font-bold text-[#a5d0b9]">12%</span>
                </div>
                <div className="h-2.5 w-full bg-[#1b4332] rounded-full overflow-hidden">
                  <div className="h-full bg-[#a5d0b9] w-[12%] rounded-full opacity-50" />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBreakdownModal(true)}
            className="mt-6 bg-[#a4f792] text-[#002201] py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#89da79] active:scale-95 transition-all shadow-md"
          >
            View Full Breakdown
          </button>
        </div>
      </div>

      {/* Personalized Eco-Tips Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#012d1d] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#1f6d1a] dark:text-[#a4f792]">
              tips_and_updates
            </span>
            Personalized Eco-Tips
          </h2>
          <span className="text-xs font-bold text-[#717973] uppercase tracking-wider">
            {filteredTips.length} Recommendations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredTips.map(tip => (
            <div
              key={tip.id}
              className="bg-white/80 dark:bg-[#1b2730]/80 glass-card p-5 rounded-3xl hover:shadow-lg transition-all duration-300 border border-[#c1c8c2]/30 dark:border-[#313d46] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-[#a4f792]/40 dark:bg-[#313d46] rounded-2xl flex items-center justify-center text-[#1f6d1a] dark:text-[#a4f792] group-hover:bg-[#a4f792] transition-colors">
                    <span className="material-symbols-outlined text-2xl">{tip.icon}</span>
                  </div>
                  <button
                    onClick={() => toggleTipSaved(tip.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      tip.isSaved
                        ? 'text-[#1f6d1a] dark:text-[#a4f792]'
                        : 'text-[#c1c8c2] hover:text-[#1f6d1a]'
                    }`}
                    title={tip.isSaved ? 'Bookmarked' : 'Bookmark Tip'}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: tip.isSaved ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                <h3 className="font-bold text-lg text-[#012d1d] dark:text-white mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#414844] dark:text-[#c1c8c2] leading-relaxed mb-4">
                  {tip.description}
                </p>
              </div>

              <div className="bg-[#f3f4f3] dark:bg-[#121413] px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 w-max border border-[#e1e3e2] dark:border-[#313d46]">
                <span className="material-symbols-outlined text-base text-[#1f6d1a] dark:text-[#a4f792]">
                  eco
                </span>
                <span className="text-[11px] font-bold text-[#191c1c] dark:text-white">
                  {tip.saveKgText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Tree Planting Goal Card */}
      <section className="bg-gradient-to-r from-[#012d1d] to-[#1b4332] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#274e3d]">
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a5d0b9] mb-2 block">
            COMMUNITY GOAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
            Plant 10,000 Trees by 2025
          </h2>
          <p className="text-xs sm:text-sm text-[#a5d0b9] mb-6 leading-relaxed">
            We're halfway there! Your consistent reduction efforts are directly funding verified reforestation projects globally.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => contributeTrees(1)}
              className="bg-white text-[#012d1d] hover:bg-[#a4f792] px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-lg active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">park</span>
              <span>CONTRIBUTE 1 TREE</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <span
            className="material-symbols-outlined text-[200px] text-white"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            forest
          </span>
        </div>
      </section>

      {/* Top Contributors Breakdown Modal */}
      {showBreakdownModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1b2730] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#c1c8c2]/40 dark:border-[#313d46] space-y-4">
            <div className="flex justify-between items-center border-b border-[#edeeed] dark:border-[#313d46] pb-3">
              <h3 className="font-bold text-lg text-[#012d1d] dark:text-white">
                Detailed Carbon Contributors
              </h3>
              <button
                onClick={() => setShowBreakdownModal(false)}
                className="p-1 text-[#717973] hover:text-[#191c1c] dark:hover:text-white rounded-full hover:bg-[#edeeed] dark:hover:bg-[#313d46]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#414844] dark:text-[#c1c8c2]">
              <p>
                A granular evaluation of your emissions across transport, lifestyle, and domestic energy consumption.
              </p>

              <div className="space-y-2 pt-2">
                <div className="p-3 bg-[#f9f9f8] dark:bg-[#121413] rounded-xl flex justify-between items-center">
                  <span className="font-bold">Aviation & Long Distance Flights</span>
                  <span className="font-extrabold text-[#ba1a1a]">540 kg CO2e (45%)</span>
                </div>
                <div className="p-3 bg-[#f9f9f8] dark:bg-[#121413] rounded-xl flex justify-between items-center">
                  <span className="font-bold">Gasoline Automobile Commute</span>
                  <span className="font-extrabold text-[#1f6d1a] dark:text-[#a4f792]">
                    336 kg CO2e (28%)
                  </span>
                </div>
                <div className="p-3 bg-[#f9f9f8] dark:bg-[#121413] rounded-xl flex justify-between items-center">
                  <span className="font-bold">Domestic Grid Heating & Cooling</span>
                  <span className="font-extrabold text-[#012d1d] dark:text-white">
                    180 kg CO2e (15%)
                  </span>
                </div>
                <div className="p-3 bg-[#f9f9f8] dark:bg-[#121413] rounded-xl flex justify-between items-center">
                  <span className="font-bold">High Emissions Dietary Choices</span>
                  <span className="font-extrabold text-[#012d1d] dark:text-white">
                    144 kg CO2e (12%)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowBreakdownModal(false)}
              className="w-full py-3 bg-[#012d1d] dark:bg-[#a4f792] text-white dark:text-[#002201] rounded-2xl font-bold text-xs"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
