import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  NavigationPage,
  TimeSegment,
  CategoryKey,
  ActivityItem,
  CategorySummary,
  EcoTip,
  TestResult,
  MetricLog
} from '../types';
import {
  INITIAL_ACTIVITIES,
  INITIAL_CATEGORIES,
  INITIAL_ECO_TIPS,
  INITIAL_TEST_RESULTS,
  INITIAL_METRIC_LOGS
} from '../data/mockData';

interface AppContextType {
  currentPage: NavigationPage;
  timeSegment: TimeSegment;
  searchQuery: string;
  selectedCategoryFilter: CategoryKey | 'all';
  darkMode: boolean;
  activities: ActivityItem[];
  categorySummaries: CategorySummary[];
  ecoTips: EcoTip[];
  treesPlanted: number;
  isLogModalOpen: boolean;
  notifications: string[];
  testResults: TestResult[];
  logs: MetricLog[];
  isTestingRunning: boolean;
  setPage: (p: NavigationPage) => void;
  setTimeSegment: (t: TimeSegment) => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategoryFilter: (c: CategoryKey | 'all') => void;
  toggleDarkMode: () => void;
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  deleteActivity: (id: string) => void;
  toggleTipSaved: (id: string) => void;
  contributeTrees: (amount: number) => void;
  setIsLogModalOpen: (open: boolean) => void;
  clearNotifications: () => void;
  runAllTests: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('splash');
  const [timeSegment, setTimeSegment] = useState<TimeSegment>('day');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryKey | 'all'>('all');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [categorySummaries, setCategorySummaries] = useState<CategorySummary[]>(INITIAL_CATEGORIES);
  const [ecoTips, setEcoTips] = useState<EcoTip[]>(INITIAL_ECO_TIPS);
  const [treesPlanted, setTreesPlanted] = useState<number>(12);
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([
    'Welcome to EcoTrack! Your carbon footprint goal is 2.0t/month.',
    'Efficiency Expert: You saved 15% more CO2 this week!'
  ]);
  const [testResults, setTestResults] = useState<TestResult[]>(INITIAL_TEST_RESULTS);
  const [logs, setLogs] = useState<MetricLog[]>(INITIAL_METRIC_LOGS);
  const [isTestingRunning, setIsTestingRunning] = useState<boolean>(false);

  // Sync dark mode class with <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const setPage = (p: NavigationPage) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addActivity = (newAct: Omit<ActivityItem, 'id'>) => {
    const created: ActivityItem = {
      ...newAct,
      id: `act-${Date.now()}`
    };
    setActivities(prev => [created, ...prev]);

    // Update category totals
    setCategorySummaries(prev =>
      prev.map(cat => {
        if (cat.categoryKey === created.category) {
          const delta = created.isPositive ? -created.amountKg : created.amountKg;
          const newAmount = Math.max(0, cat.amountKg + delta);
          return {
            ...cat,
            amountKg: Math.round(newAmount)
          };
        }
        return cat;
      })
    );

    // Push security/activity log
    const newLog: MetricLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      service: 'carbon-activity-service',
      type: 'INFO',
      message: `Logged ${created.title} (${created.isPositive ? '-' : '+'}${created.amountKg}kg CO2e)`
    };
    setLogs(prev => [newLog, ...prev.slice(0, 19)]);

    setNotifications(prev => [
      `Logged new activity: ${created.title} (${created.isPositive ? 'Saved' : 'Emitted'} ${created.amountKg}kg CO2e)`,
      ...prev
    ]);
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const toggleTipSaved = (id: string) => {
    setEcoTips(prev =>
      prev.map(t => (t.id === id ? { ...t, isSaved: !t.isSaved } : t))
    );
  };

  const contributeTrees = (amount: number) => {
    setTreesPlanted(prev => prev + amount);
    setNotifications(prev => [
      `Thank you! You contributed to planting ${amount} tree${amount > 1 ? 's' : ''}!`,
      ...prev
    ]);
  };

  const clearNotifications = () => setNotifications([]);

  const runAllTests = () => {
    setIsTestingRunning(true);
    setTestResults(prev => prev.map(t => ({ ...t, status: 'running' })));

    setTimeout(() => {
      setTestResults(prev =>
        prev.map(t => ({
          ...t,
          status: 'passed',
          durationMs: Math.floor(Math.random() * 25) + 5
        }))
      );
      setIsTestingRunning(false);
      setNotifications(prev => ['All 6 unit test suites executed with 100% pass rate!', ...prev]);
    }, 1200);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        timeSegment,
        searchQuery,
        selectedCategoryFilter,
        darkMode,
        activities,
        categorySummaries,
        ecoTips,
        treesPlanted,
        isLogModalOpen,
        notifications,
        testResults,
        logs,
        isTestingRunning,
        setPage,
        setTimeSegment,
        setSearchQuery,
        setSelectedCategoryFilter,
        toggleDarkMode,
        addActivity,
        deleteActivity,
        toggleTipSaved,
        contributeTrees,
        setIsLogModalOpen,
        clearNotifications,
        runAllTests
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
