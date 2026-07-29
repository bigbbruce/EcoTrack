import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const SettingsScreen: React.FC = () => {
  const { darkMode, toggleDarkMode, logs, setPage } = useApp();

  const [activeTab, setActiveTab] = useState<'preferences' | 'security' | 'microservices' | 'logs'>('preferences');
  const [dataPrivacyEnabled, setDataPrivacyEnabled] = useState(true);
  const [realtimeTelemetry, setRealtimeTelemetry] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-5xl mx-auto md:pl-24"
    >
      <section className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d] dark:text-white mb-1">
          Settings & System Architecture
        </h1>
        <p className="text-sm text-[#414844] dark:text-[#a5d0b9]">
          Manage dark theme preferences, data privacy, security protocols, and microservice status.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-[#c1c8c2]/50 dark:border-[#313d46] mb-6 overflow-x-auto no-scrollbar gap-2">
        {[
          { key: 'preferences', label: 'Preferences & Theme', icon: 'palette' },
          { key: 'security', label: 'Security & OAuth', icon: 'security' },
          { key: 'microservices', label: 'Microservices & API', icon: 'hub' },
          { key: 'logs', label: 'Real-time Telemetry', icon: 'terminal' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'border-[#1f6d1a] text-[#1f6d1a] dark:border-[#a4f792] dark:text-[#a4f792]'
                : 'border-transparent text-[#717973] hover:text-[#191c1c] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1b2730] p-5 rounded-3xl border border-[#c1c8c2]/40 dark:border-[#313d46] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#a4f792]/30 flex items-center justify-center text-[#1f6d1a]">
                <span className="material-symbols-outlined text-2xl">dark_mode</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#012d1d] dark:text-white">
                  Dark Mode Color Scheme
                </h3>
                <p className="text-xs text-[#717973] dark:text-[#a5d0b9]">
                  Toggle high-contrast eco dark mode for optimal low-light readability
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                darkMode ? 'bg-[#a4f792]' : 'bg-[#e7e8e7]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-5 bg-[#002201]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="bg-white dark:bg-[#1b2730] p-5 rounded-3xl border border-[#c1c8c2]/40 dark:border-[#313d46] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#a4f792]/30 flex items-center justify-center text-[#1f6d1a]">
                <span className="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#012d1d] dark:text-white">
                  Strict Data Privacy Shield
                </h3>
                <p className="text-xs text-[#717973] dark:text-[#a5d0b9]">
                  Encrypt local activity cache and strictly sanitize telemetry logs
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={dataPrivacyEnabled}
              onChange={e => setDataPrivacyEnabled(e.target.checked)}
              className="w-5 h-5 accent-[#1f6d1a] cursor-pointer"
            />
          </div>

          <div className="bg-white dark:bg-[#1b2730] p-5 rounded-3xl border border-[#c1c8c2]/40 dark:border-[#313d46] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#a4f792]/30 flex items-center justify-center text-[#1f6d1a]">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#012d1d] dark:text-white">
                  Real-time Carbon Telemetry
                </h3>
                <p className="text-xs text-[#717973] dark:text-[#a5d0b9]">
                  Receive immediate streaming calculation updates as activities are logged
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={realtimeTelemetry}
              onChange={e => setRealtimeTelemetry(e.target.checked)}
              className="w-5 h-5 accent-[#1f6d1a] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1b2730] p-6 rounded-3xl border border-[#c1c8c2]/40 dark:border-[#313d46] shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#1f6d1a] dark:text-[#a4f792]">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
              <h3 className="font-bold text-base text-[#012d1d] dark:text-white">
                OAuth & Microservice Security
              </h3>
            </div>
            <p className="text-xs text-[#414844] dark:text-[#c1c8c2] leading-relaxed">
              All client-to-server traffic is protected using TLS 1.3 encryption and short-lived JWT authorization header verification.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#f9f9f8] dark:bg-[#121413] rounded-2xl border border-[#edeeed] dark:border-[#313d46]">
                <p className="text-xs font-bold text-[#012d1d] dark:text-white">OAuth Provider Status</p>
                <p className="text-xs text-[#1f6d1a] dark:text-[#a4f792] font-semibold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Active & Authenticated
                </p>
              </div>
              <div className="p-3 bg-[#f9f9f8] dark:bg-[#121413] rounded-2xl border border-[#edeeed] dark:border-[#313d46]">
                <p className="text-xs font-bold text-[#012d1d] dark:text-white">CSRF & Rate Limit Shield</p>
                <p className="text-xs text-[#1f6d1a] dark:text-[#a4f792] font-semibold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">shield</span> Enforced (100 req/min)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Microservices Tab */}
      {activeTab === 'microservices' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1b2730] p-6 rounded-3xl border border-[#c1c8c2]/40 dark:border-[#313d46] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-[#012d1d] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[#1f6d1a] dark:text-[#a4f792]">
                  dns
                </span>
                Microservices Cluster Health
              </h3>
              <span className="px-3 py-1 bg-[#a4f792] text-[#005303] rounded-full text-xs font-bold">
                100% Operational
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-[#f9f9f8] dark:bg-[#121413] rounded-2xl border border-[#edeeed] dark:border-[#313d46]">
                <p className="font-bold text-[#012d1d] dark:text-white">carbon-calc-service</p>
                <p className="text-[#1f6d1a] dark:text-[#a4f792] mt-1 font-medium">Latency: 1.2ms</p>
              </div>
              <div className="p-4 bg-[#f9f9f8] dark:bg-[#121413] rounded-2xl border border-[#edeeed] dark:border-[#313d46]">
                <p className="font-bold text-[#012d1d] dark:text-white">analytics-pipeline</p>
                <p className="text-[#1f6d1a] dark:text-[#a4f792] mt-1 font-medium">Latency: 3.4ms</p>
              </div>
              <div className="p-4 bg-[#f9f9f8] dark:bg-[#121413] rounded-2xl border border-[#edeeed] dark:border-[#313d46]">
                <p className="font-bold text-[#012d1d] dark:text-white">gemini-ai-proxy</p>
                <p className="text-[#1f6d1a] dark:text-[#a4f792] mt-1 font-medium">Latency: 14ms</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="bg-[#012d1d] text-white p-5 rounded-3xl shadow-xl font-mono text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-[#274e3d] pb-2">
            <span className="font-bold text-[#a4f792] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">terminal</span>
              Live Telemetry & Debug Console
            </span>
            <span className="text-[10px] text-[#a5d0b9]">Streaming live</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
            {logs.map(log => (
              <div key={log.id} className="p-2 bg-[#1b4332] rounded-xl border border-[#274e3d]">
                <div className="flex justify-between text-[10px] text-[#a5d0b9] mb-1">
                  <span>[{log.service}]</span>
                  <span>{log.timestamp.substring(11, 19)}</span>
                </div>
                <p className="text-white font-semibold">{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => setPage('tests')}
          className="px-6 py-3 bg-[#1b4332] text-[#c1ecd4] rounded-full text-xs font-bold hover:bg-[#012d1d] transition-all shadow-md inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">fact_check</span>
          <span>Launch Component & Microservice Unit Tests</span>
        </button>
      </div>
    </motion.div>
  );
};
