import React from 'react';
import { useApp } from '../context/AppContext';
import { NavigationPage } from '../types';

export const DesktopSidebar: React.FC = () => {
  const { currentPage, setPage } = useApp();

  if (currentPage === 'splash') {
    return null;
  }

  const items: { page: NavigationPage; label: string; icon: string }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { page: 'activity', label: 'Activity', icon: 'qr_code_2' },
    { page: 'insights', label: 'Insights', icon: 'monitoring' },
    { page: 'tests', label: 'Tests & CI/CD', icon: 'verified' },
    { page: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex-col items-center py-6 gap-6 bg-[#f9f9f8]/80 dark:bg-[#121413]/80 backdrop-blur-md z-40 border-r border-[#e1e3e2]/60 dark:border-[#313d46]/60">
      <div className="flex flex-col gap-4 items-center w-full px-2">
        {items.map(item => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all relative group ${
                isActive
                  ? 'bg-[#a4f792] text-[#002201] shadow-md scale-105 font-bold'
                  : 'text-[#414844] dark:text-[#c1c8c2] hover:bg-[#e7e8e7] dark:hover:bg-[#313d46]'
              }`}
              title={item.label}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
                }}
              >
                {item.icon}
              </span>

              {/* Tooltip on hover */}
              <div className="absolute left-16 px-2.5 py-1 bg-[#012d1d] text-white dark:bg-[#c1ecd4] dark:text-[#002114] text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
