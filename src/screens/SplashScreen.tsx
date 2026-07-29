import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setPage } = useApp();

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#012d1d]">
      {/* Hero Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-10000 scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI418-Bz8fF_PfEdAeF-ilLnoDkJANDuTgqSHwJJTWBNJzfZOo4wsiqmSZSgSLNJDN7tajDxPv509hWWnsNfISUVW4hnkeCTB7tZP6SUy6KeJ54gztHHe618DsAjf4iiqDusEaQQGA2UnVF1k4a8NBMTg63JRTBGJzGZ31D_YYNKqkHjhr9DoyCjchl5BacWTxBYFvPJD3rphmVvlOcCwYldWh3KF873A4tkNVP7mEnQIVJdIh8jhSRQ')`
          }}
        >
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#012d1d]/50 via-[#012d1d]/30 to-[#012d1d]/90" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 md:px-10 py-12 text-center max-w-4xl mx-auto w-full">
        {/* Brand Logo Anchor */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-[#c1ecd4] rounded-full flex items-center justify-center shadow-lg mb-2">
              <span
                className="material-symbols-outlined text-[#012d1d] text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>
            <h1 className="font-extrabold text-4xl md:text-5xl text-white tracking-tight">
              EcoTrack
            </h1>
          </div>
        </motion.header>

        {/* Hero Text Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl my-auto py-8"
        >
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            The path to a greener <br className="hidden md:block" />
            planet starts with you.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto leading-relaxed">
            Track your carbon footprint, analyze your impact, and discover actionable steps toward environmental stewardship.
          </p>
        </motion.section>

        {/* Call to Action Area */}
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md pb-6"
        >
          <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-2xl">
            <button
              onClick={() => setPage('dashboard')}
              className="w-full bg-[#a4f792] hover:bg-[#89da79] transition-all text-[#002201] font-bold h-14 rounded-full flex items-center justify-center gap-2 text-lg shadow-xl active:scale-95 group cursor-pointer"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <p className="text-xs font-bold text-white/80 uppercase tracking-widest pt-1">
              JOIN 2.5 MILLION ECO-WARRIORS
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-sm text-white/80 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#a4f792]">
                check_circle
              </span>
              <span>Data Privacy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#a4f792]">
                check_circle
              </span>
              <span>Real-time Metrics</span>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Atmospheric Blur Accents */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#89da79]/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c1ecd4]/20 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
};
