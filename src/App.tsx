/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DesktopSidebar } from './components/DesktopSidebar';
import { LogActivityModal } from './components/LogActivityModal';
import { SplashScreen } from './screens/SplashScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TestsScreen } from './screens/TestsScreen';

function MainApp() {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen bg-[#f9f9f8] dark:bg-[#121413] text-[#191c1c] dark:text-[#f0f1f0] transition-colors duration-300">
      <Header />
      <DesktopSidebar />

      <main className="w-full">
        {currentPage === 'splash' && <SplashScreen />}
        {currentPage === 'dashboard' && <DashboardScreen />}
        {currentPage === 'activity' && <ActivityScreen />}
        {currentPage === 'insights' && <InsightsScreen />}
        {currentPage === 'settings' && <SettingsScreen />}
        {currentPage === 'tests' && <TestsScreen />}
      </main>

      <BottomNav />
      <LogActivityModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
