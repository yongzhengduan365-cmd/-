import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CurrentDateCard } from './components/CurrentDateCard';
import { DateQueryCard } from './components/DateQueryCard';
import { JiaziTableModal } from './components/JiaziTableModal';
import { KnowledgeModal } from './components/KnowledgeModal';
import { calculateGanzhiFromDate } from './utils/ganzhi';
import { GanzhiDateResult } from './types';
import { Compass, BookOpen, Calendar as CalendarIcon, Info } from 'lucide-react';

export default function App() {
  const [now, setNow] = useState<Date>(new Date());
  const [currentGanzhi, setCurrentGanzhi] = useState<GanzhiDateResult>(() =>
    calculateGanzhiFromDate(new Date())
  );

  // Modals
  const [showJiaziModal, setShowJiaziModal] = useState<boolean>(false);
  const [showKnowledgeModal, setShowKnowledgeModal] = useState<boolean>(false);

  // Date query component key/initial state trigger
  const [queryKey, setQueryKey] = useState<number>(1);
  const [queryInitialDate, setQueryInitialDate] = useState<Date>(() => new Date());

  // Update current live time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);
      setCurrentGanzhi(calculateGanzhiFromDate(current));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sync current time into query input
  const handleSyncCurrentToQuery = () => {
    const current = new Date();
    setQueryInitialDate(current);
    setQueryKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navigation Header */}
      <Header
        currentDateStr={currentGanzhi.solarDateStr}
        currentTimeStr={currentGanzhi.solarTimeStr}
        currentWeekday={currentGanzhi.weekDayName}
        onOpenKnowledge={() => setShowKnowledgeModal(true)}
        onOpenJiazi={() => setShowJiaziModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Intro banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-900 text-stone-100 p-4 rounded-xl border border-stone-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-700/80 text-amber-100 flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-amber-600/60">
              历
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-serif text-amber-100">
                干支历法 · 实时与指定日期双轨推算
              </h2>
              <p className="text-xs text-stone-400">
                自动展现当前实时天干地支；下方输入任意公历或农历日期，即可解析对应年、月、日、时四柱八字。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowKnowledgeModal(true)}
              className="px-2.5 py-1 text-xs rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>推算原理</span>
            </button>
            <button
              onClick={() => setShowJiaziModal(true)}
              className="px-2.5 py-1 text-xs rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition flex items-center gap-1.5"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>六十甲子表</span>
            </button>
          </div>
        </div>

        {/* 1. Real-time Current Date Ganzhi Showcase */}
        <CurrentDateCard
          currentInfo={currentGanzhi}
          onSyncToQuery={handleSyncCurrentToQuery}
        />

        {/* 2. Custom Date Query Section */}
        <DateQueryCard
          key={queryKey}
          initialDate={queryInitialDate}
        />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-200/90 bg-white py-6 text-stone-500 text-xs text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-700">天干地支日历</span>
            <span className="text-stone-400">·</span>
            <span>依据干支历法与《钦定协纪辨方书》传统算法推演</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>十天干 · 十二地支 · 六十花甲子</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <JiaziTableModal
        isOpen={showJiaziModal}
        onClose={() => setShowJiaziModal(false)}
      />

      <KnowledgeModal
        isOpen={showKnowledgeModal}
        onClose={() => setShowKnowledgeModal(false)}
      />
    </div>
  );
}
