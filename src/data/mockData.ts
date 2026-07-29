import { ActivityItem, CategorySummary, EcoTip, TestResult, MetricLog } from '../types';

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: '30km Drive',
    description: 'Commute to downtown office',
    category: 'transport',
    amountKg: 4.2,
    isPositive: false,
    date: 'Today, 8:30 AM',
    timeSegment: 'day',
    icon: 'directions_car'
  },
  {
    id: 'act-2',
    title: 'Vegan Meal',
    description: 'Plant-based dinner at home',
    category: 'food',
    amountKg: 1.8,
    isPositive: true,
    date: 'Today, 1:15 PM',
    timeSegment: 'day',
    icon: 'restaurant'
  },
  {
    id: 'act-3',
    title: 'Recycled Plastics',
    description: '2.5kg of PET processed',
    category: 'shopping',
    amountKg: 0.5,
    isPositive: true,
    date: 'Today, 3:45 PM',
    timeSegment: 'day',
    icon: 'recycling'
  },
  {
    id: 'act-4',
    title: 'Hot Wash Laundry',
    description: 'Full load at 60°C',
    category: 'home',
    amountKg: 0.8,
    isPositive: false,
    date: 'Yesterday, 7:00 PM',
    timeSegment: 'day',
    icon: 'laundry'
  },
  {
    id: 'act-5',
    title: 'E-Bike Transit',
    description: '12km replacement for car',
    category: 'transport',
    amountKg: 2.1,
    isPositive: true,
    date: 'Today, 5:20 PM',
    timeSegment: 'day',
    icon: 'electric_bike'
  },
  {
    id: 'act-6',
    title: 'Solar Roof Generation',
    description: '8.5kWh exported to clean grid',
    category: 'home',
    amountKg: 3.4,
    isPositive: true,
    date: '3 days ago',
    timeSegment: 'week',
    icon: 'solar_power'
  },
  {
    id: 'act-7',
    title: 'Local Farmers Market',
    description: 'Zero packaging local produce',
    category: 'food',
    amountKg: 1.2,
    isPositive: true,
    date: '5 days ago',
    timeSegment: 'week',
    icon: 'shopping_basket'
  },
  {
    id: 'act-8',
    title: 'Eco Thermostat Mode',
    description: 'Reduced heating by 2°C over weekend',
    category: 'home',
    amountKg: 4.5,
    isPositive: true,
    date: '2 weeks ago',
    timeSegment: 'month',
    icon: 'thermostat'
  }
];

export const INITIAL_CATEGORIES: CategorySummary[] = [
  {
    categoryKey: 'transport',
    title: 'Transport',
    amountKg: 420,
    changePercent: 12,
    changeType: 'up',
    icon: 'directions_car',
    monthlyBars: [40, 60, 30, 80, 50]
  },
  {
    categoryKey: 'food',
    title: 'Food',
    amountKg: 280,
    changePercent: -5,
    changeType: 'down',
    icon: 'restaurant',
    monthlyBars: [70, 50, 40, 30, 20]
  },
  {
    categoryKey: 'home',
    title: 'Home',
    amountKg: 350,
    changePercent: 0,
    changeType: 'stable',
    icon: 'home',
    monthlyBars: [60, 60, 60, 60, 60]
  },
  {
    categoryKey: 'shopping',
    title: 'Shopping',
    amountKg: 150,
    changePercent: 24,
    changeType: 'up',
    icon: 'shopping_bag',
    monthlyBars: [20, 10, 30, 50, 90]
  }
];

export const INITIAL_ECO_TIPS: EcoTip[] = [
  {
    id: 'tip-1',
    title: 'Switch to LED bulbs',
    description: 'Replacing just 5 high-use bulbs can save significant energy and CO2 annually.',
    saveKgText: 'SAVE 50KG CO2/YEAR',
    icon: 'lightbulb',
    category: 'home',
    isSaved: false
  },
  {
    id: 'tip-2',
    title: 'Carbon Offsets',
    description: 'Since flights are your top contributor, consider verified carbon offset programs.',
    saveKgText: 'REDUCE IMPACT 100%',
    icon: 'flight_takeoff',
    category: 'transport',
    isSaved: true
  },
  {
    id: 'tip-3',
    title: 'Meatless Mondays',
    description: 'Swapping beef for plant-based proteins just once a week makes a massive difference.',
    saveKgText: 'SAVE 220KG CO2/YEAR',
    icon: 'restaurant',
    category: 'food',
    isSaved: false
  },
  {
    id: 'tip-4',
    title: 'Cold Water Washing',
    description: 'Washing clothes at 30°C uses up to 75% less energy than hot water cycles.',
    saveKgText: 'SAVE 40KG CO2/YEAR',
    icon: 'laundry',
    category: 'home',
    isSaved: false
  }
];

export const INITIAL_TEST_RESULTS: TestResult[] = [
  {
    id: 'test-1',
    name: 'Real-time Activity Filtering',
    suite: 'UI Components',
    status: 'passed',
    durationMs: 14,
    message: 'Filter matches title, description, category and impact values smoothly'
  },
  {
    id: 'test-2',
    name: 'Carbon Impact Gauge Calculation',
    suite: 'Core Logic',
    status: 'passed',
    durationMs: 8,
    message: 'Target 2.0t progress stroke offset correctly calculated at 60%'
  },
  {
    id: 'test-3',
    name: 'Responsive Layout Adaptability',
    suite: 'Viewport & Design',
    status: 'passed',
    durationMs: 22,
    message: 'Adapts navigation from mobile bottom bar to desktop side anchor seamlessly'
  },
  {
    id: 'test-4',
    name: 'Dark Mode Contrast & Tokens',
    suite: 'Accessibility & Theme',
    status: 'passed',
    durationMs: 12,
    message: 'Passes WCAG AA color contrast check in dark and light modes'
  },
  {
    id: 'test-5',
    name: 'Activity Logging Mutation API',
    suite: 'Microservices Backend',
    status: 'passed',
    durationMs: 31,
    message: 'POST /api/activities updates state and updates category totals atomically'
  },
  {
    id: 'test-6',
    name: 'Security & OAuth Token Validation',
    suite: 'Security Protocols',
    status: 'passed',
    durationMs: 19,
    message: 'Encrypted bearer tokens verified against microservice auth gateway'
  }
];

export const INITIAL_METRIC_LOGS: MetricLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-07-29T10:14:02Z',
    service: 'auth-gateway',
    type: 'SECURITY',
    message: 'TLS 1.3 encrypted session established with client 192.168.1.42'
  },
  {
    id: 'log-102',
    timestamp: '2026-07-29T10:15:10Z',
    service: 'carbon-calc-service',
    type: 'INFO',
    message: 'Processed 54 activity logging requests. Mean response time 1.2ms'
  },
  {
    id: 'log-103',
    timestamp: '2026-07-29T10:18:22Z',
    service: 'analytics-pipeline',
    type: 'METRIC',
    message: 'Footprint trend dataset synchronized across 12 microservice instances'
  }
];
