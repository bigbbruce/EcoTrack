export type NavigationPage = 'splash' | 'dashboard' | 'activity' | 'insights' | 'settings' | 'tests';

export type TimeSegment = 'day' | 'week' | 'month';

export type CategoryKey = 'transport' | 'food' | 'home' | 'shopping';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  category: CategoryKey;
  amountKg: number; // positive number in kg
  isPositive: boolean; // true = CO2 saved (-), false = CO2 emitted (+)
  date: string;
  timeSegment: TimeSegment;
  icon: string;
}

export interface CategorySummary {
  categoryKey: CategoryKey;
  title: string;
  amountKg: number;
  changePercent: number; // e.g. +12, -5
  changeType: 'up' | 'down' | 'stable';
  icon: string;
  monthlyBars: number[]; // 5 bar values for visual sparkline
}

export interface EcoTip {
  id: string;
  title: string;
  description: string;
  saveKgText: string;
  icon: string;
  category: CategoryKey;
  isSaved: boolean;
}

export interface TestResult {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  durationMs: number;
  message?: string;
}

export interface MetricLog {
  id: string;
  timestamp: string;
  service: string;
  type: 'INFO' | 'WARN' | 'SECURITY' | 'METRIC';
  message: string;
}
