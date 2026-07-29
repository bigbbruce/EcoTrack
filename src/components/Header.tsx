import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentPage,
    setPage,
    darkMode,
    toggleDarkMode,
    notifications,
    clearNotifications,
    setIsLogModalOpen
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);

  if (currentPage === 'splash') {
    return null; // Splash screen has its own integrated header
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#f9f9f8]/90 dark:bg-[#121413]/90 backdrop-blur-md border-b border-[#e1e3e2]/60 dark:border-[#313d46]/60 transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        {/* Left: Profile & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage('dashboard')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#c1ecd4] dark:border-[#3f6653] shadow-sm active:scale-95 transition-transform"
            title="Go to Dashboard"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMcRrNqdkZlmQkqvcShq4UcKhjpgwXtBFpH1ikR_x_zGNcorVgcgCp2btnOWHcds4JapCuHMYmROhFvB7JUFJno50mOMXKDHL7nJILEyY1lbNlWj90tkE7kg96nDlhlSP8EWQ1aZiz1yw1OcaVmfC154wJVSLkkubGGvEFvVzQIOSWPCCZ8Fne9Hi3_JBcRkXxT1mHL28D6jEscRyUm2ZBKQKi7rnaJtwknP_6VD5PO1ukr8IJUSUn-Q"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
          <button
            onClick={() => setPage('dashboard')}
            className="text-left group"
          >
            <h1 className="font-bold text-xl md:text-2xl text-[#012d1d] dark:text-[#c1ecd4] tracking-tight group-hover:opacity-80 transition-opacity">
              EcoTrack
            </h1>
          </button>
        </div>

        {/* Right: Controls & Dark Mode */}
        <div className="flex items-center gap-2">
          {/* Quick Add Log Activity button */}
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#a4f792] hover:bg-[#89da79] text-[#002201] rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Log Activity</span>
          </button>

          {/* Tests & CI/CD Status button */}
          <button
            onClick={() => setPage('tests')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              currentPage === 'tests'
                ? 'bg-[#1b4332] text-white'
                : 'bg-[#f3f4f3] dark:bg-[#1b2730] text-[#414844] dark:text-[#c1c8c2] hover:bg-[#e7e8e7]'
            }`}
            title="CI/CD Pipelines & Unit Tests"
          >
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="hidden md:inline">Tests & CI/CD</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-[#012d1d] dark:text-[#a5d0b9] hover:bg-[#e7e8e7] dark:hover:bg-[#313d46] transition-colors active:scale-95"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications button with popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="p-2 rounded-full text-[#012d1d] dark:text-[#a5d0b9] hover:bg-[#e7e8e7] dark:hover:bg-[#313d46] transition-colors active:scale-95 relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white dark:ring-[#121413]" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1b2730] rounded-2xl shadow-xl border border-[#c1c8c2]/50 dark:border-[#313d46] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-3 border-b border-[#edeeed] dark:border-[#313d46] pb-2">
                  <h3 className="font-bold text-sm text-[#012d1d] dark:text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">notifications</span>
                    Notifications
                  </h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-[#1f6d1a] dark:text-[#a5d0b9] font-medium hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <p className="text-xs text-[#717973] text-center py-4">No new notifications</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                    {notifications.map((msg, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#f9f9f8] dark:bg-[#121413] rounded-xl text-xs text-[#191c1c] dark:text-[#f0f1f0] border border-[#edeeed] dark:border-[#313d46]"
                      >
                        {msg}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
