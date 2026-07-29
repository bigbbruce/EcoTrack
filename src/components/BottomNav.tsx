import React from 'react';
import { useApp } from '../context/AppContext';
import { NavigationPage } from '../types';

export const BottomNav: React.FC = () => {
  const { currentPage, setPage } = useApp();

  if (currentPage === 'splash') {
    return null;
  }

  const items: { page: NavigationPage; label: string; icon: string }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { page: 'activity', label: 'Activity', icon: 'qr_code_2' },
    { page: 'insights', label: 'Insights', icon: 'monitoring' },
    { page: 'settings', label: 'Settings', icon: 'settings' },
    { page: 'tests', label: 'Tests', icon: 'verified' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#f9f9f8]/95 dark:bg-[#121413]/95 backdrop-blur-md pt-2 pb-safe pb-3 px-2 border-t border-[#e1e3e2]/80 dark:border-[#313d46] rounded-t-2xl shadow-[0_-4px_16px_rgba(27,67,50,0.08)] md:hidden">
      {items.map(item => {
        const isActive = currentPage === item.page;
        return (
          <button
            key={item.page}
            onClick={() => setPage(item.page)}
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl transition-all duration-200 active:scale-90 ${
              isActive
                ? 'bg-[#a4f792] text-[#002201] font-bold shadow-sm'
                : 'text-[#414844] dark:text-[#bbc8d3] hover:text-[#012d1d]'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
              }}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
