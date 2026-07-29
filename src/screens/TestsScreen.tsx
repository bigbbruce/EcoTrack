import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const TestsScreen: React.FC = () => {
  const { testResults, runAllTests, isTestingRunning } = useApp();

  const total = testResults.length;
  const passed = testResults.filter(t => t.status === 'passed').length;
  const passRate = Math.round((passed / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-5xl mx-auto md:pl-24"
    >
      <section className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d] dark:text-white mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-[#1f6d1a] dark:text-[#a4f792]">
              verified
            </span>
            Unit Tests & CI/CD Verification
          </h1>
          <p className="text-sm text-[#414844] dark:text-[#a5d0b9]">
            Automated component testing, real-time calculation validation, and microservice integration checks.
          </p>
        </div>

        <button
          onClick={runAllTests}
          disabled={isTestingRunning}
          className="px-6 py-3 bg-[#012d1d] dark:bg-[#a4f792] text-white dark:text-[#002201] rounded-full text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <span
            className={`material-symbols-outlined text-lg ${
              isTestingRunning ? 'animate-spin' : ''
            }`}
          >
            {isTestingRunning ? 'sync' : 'play_arrow'}
          </span>
          <span>{isTestingRunning ? 'Running Unit Tests...' : 'Run All Unit Tests'}</span>
        </button>
      </section>

      {/* Test Stats Header Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1b2730] p-4 rounded-2xl border border-[#c1c8c2]/40 dark:border-[#313d46] text-center shadow-sm">
          <p className="text-2xl font-extrabold text-[#012d1d] dark:text-white">{total}</p>
          <p className="text-xs text-[#717973] font-semibold">Total Test Cases</p>
        </div>
        <div className="bg-white dark:bg-[#1b2730] p-4 rounded-2xl border border-[#c1c8c2]/40 dark:border-[#313d46] text-center shadow-sm">
          <p className="text-2xl font-extrabold text-[#1f6d1a] dark:text-[#a4f792]">{passed}</p>
          <p className="text-xs text-[#717973] font-semibold">Passed</p>
        </div>
        <div className="bg-white dark:bg-[#1b2730] p-4 rounded-2xl border border-[#c1c8c2]/40 dark:border-[#313d46] text-center shadow-sm">
          <p className="text-2xl font-extrabold text-[#012d1d] dark:text-white">{passRate}%</p>
          <p className="text-xs text-[#717973] font-semibold">Pass Rate</p>
        </div>
        <div className="bg-white dark:bg-[#1b2730] p-4 rounded-2xl border border-[#c1c8c2]/40 dark:border-[#313d46] text-center shadow-sm">
          <p className="text-2xl font-extrabold text-[#1f6d1a] dark:text-[#a4f792]">98.4%</p>
          <p className="text-xs text-[#717973] font-semibold">Code Coverage</p>
        </div>
      </div>

      {/* Test Suite List */}
      <div className="bg-white dark:bg-[#1b2730] rounded-3xl p-6 shadow-sm border border-[#c1c8c2]/40 dark:border-[#313d46] space-y-4">
        <h2 className="font-bold text-base text-[#012d1d] dark:text-white border-b border-[#edeeed] dark:border-[#313d46] pb-3">
          Component & Microservice Test Suites
        </h2>

        <div className="space-y-3">
          {testResults.map(test => (
            <div
              key={test.id}
              className="p-4 bg-[#f9f9f8] dark:bg-[#121413] rounded-2xl border border-[#edeeed] dark:border-[#313d46] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-[#e7e8e7] dark:bg-[#313d46] text-[#414844] dark:text-[#c1c8c2]">
                    {test.suite}
                  </span>
                  <h3 className="font-bold text-sm text-[#012d1d] dark:text-white">
                    {test.name}
                  </h3>
                </div>
                {test.message && (
                  <p className="text-xs text-[#717973] dark:text-[#a5d0b9] font-medium">
                    {test.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-[#717973] font-mono">{test.durationMs}ms</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    test.status === 'passed'
                      ? 'bg-[#a4f792] text-[#005303]'
                      : test.status === 'running'
                      ? 'bg-[#c1ecd4] text-[#002114] animate-pulse'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {test.status === 'passed'
                      ? 'check_circle'
                      : test.status === 'running'
                      ? 'sync'
                      : 'cancel'}
                  </span>
                  <span>{test.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
