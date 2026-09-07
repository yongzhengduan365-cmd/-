import React from 'react';
import { Calendar, BookOpen, Clock } from 'lucide-react';

interface HeaderProps {
  currentDateStr: string;
  currentTimeStr: string;
  currentWeekday: string;
  onOpenKnowledge: () => void;
  onOpenJiazi: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDateStr,
  currentTimeStr,
  currentWeekday,
  onOpenKnowledge,
  onOpenJiazi,
}) => {
  return (
    <header className="border-b border-stone-200/90 bg-stone-900 text-stone-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand and Seal */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            {/* Traditional Seal Emblem */}
            <div className="w-9 h-9 rounded-md bg-red-800 border border-red-700 flex items-center justify-center text-amber-100 font-serif font-black text-sm tracking-tight shadow-inner select-none">
              干支
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-wide font-serif text-amber-50">
                  天干地支日历
                </h1>
                <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded bg-stone-800 text-amber-200/90 border border-stone-700 font-serif">
                  岁次推演 · 六十甲子
                </span>
              </div>
              <p className="text-[12px] text-stone-400 font-sans hidden sm:block">
                实时干支显现 · 输入公历或农历即可获知四柱八字
              </p>
            </div>
          </div>

          {/* Quick Action Navigation on Mobile */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              id="btn-knowledge-mobile"
              onClick={onOpenKnowledge}
              className="p-1.5 text-stone-300 hover:text-white bg-stone-800 rounded border border-stone-700 text-xs flex items-center gap-1"
              title="干支全解"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              id="btn-jiazi-mobile"
              onClick={onOpenJiazi}
              className="p-1.5 text-stone-300 hover:text-white bg-stone-800 rounded border border-stone-700 text-xs flex items-center gap-1"
              title="六十甲子表"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Real-time Clock & Reference Actions on Desktop */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
          {/* Real-time Clock Display */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/90 border border-stone-700 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400 font-medium">
              {currentTimeStr}
            </span>
            <span className="text-stone-400 hidden lg:inline">|</span>
            <span className="text-stone-300 hidden lg:inline">{currentDateStr}</span>
            <span className="text-stone-400 hidden md:inline">({currentWeekday})</span>
          </div>

          {/* Knowledge & Jiazi Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="btn-knowledge-desktop"
              onClick={onOpenKnowledge}
              className="px-2.5 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-stone-600 transition flex items-center gap-1.5 font-medium"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>干支知识</span>
            </button>
            <button
              id="btn-jiazi-desktop"
              onClick={onOpenJiazi}
              className="px-2.5 py-1.5 rounded-md bg-amber-900/40 hover:bg-amber-800/50 text-amber-200 border border-amber-800/60 hover:border-amber-700 transition flex items-center gap-1.5 font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>六十甲子表</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
