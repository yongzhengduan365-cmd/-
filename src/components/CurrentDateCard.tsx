import React, { useState } from 'react';
import { GanzhiDateResult } from '../types';
import { PillarCard } from './PillarCard';
import { Clock, Copy, Check, ArrowDownToLine, Sparkles, Compass } from 'lucide-react';

interface CurrentDateCardProps {
  currentInfo: GanzhiDateResult;
  onSyncToQuery: () => void;
}

export const CurrentDateCard: React.FC<CurrentDateCardProps> = ({
  currentInfo,
  onSyncToQuery,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `【当前实时干支】\n公历：${currentInfo.solarDateStr} ${currentInfo.solarTimeStr} (${currentInfo.weekDayName})\n${currentInfo.lunarDateStr} (生肖：${currentInfo.shengXiao})\n天干地支：${currentInfo.fullGanzhi}\n四柱纳音：年柱[${currentInfo.pillars.year.naYin}] 月柱[${currentInfo.pillars.month.naYin}] 日柱[${currentInfo.pillars.day.naYin}] 时柱[${currentInfo.pillars.time.naYin}]`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="current-date-section"
      className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
    >
      {/* Card Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-100 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <span className="font-serif font-bold text-sm tracking-wide text-amber-100">
            当前实时干支 · 今日此时
          </span>
          <span className="text-xs text-stone-400 font-mono">
            {currentInfo.solarDateStr} {currentInfo.solarTimeStr}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-current-ganzhi"
            onClick={handleCopy}
            className="px-2.5 py-1 text-xs rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition flex items-center gap-1.5"
            title="复制今日干支信息"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>复制干支</span>
              </>
            )}
          </button>

          <button
            id="btn-sync-to-query"
            onClick={onSyncToQuery}
            className="px-2.5 py-1 text-xs rounded-md bg-amber-600/20 hover:bg-amber-600/30 text-amber-200 border border-amber-600/50 transition flex items-center gap-1.5"
            title="将下方查询输入重置为当前实时日期时间"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-amber-400" />
            <span>以此日期查询</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5">
        {/* Core Ganzhi String Highlight */}
        <div className="mb-5 p-4 rounded-xl bg-stone-50 border border-stone-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-serif font-bold text-sm tracking-wide shrink-0">
              今日岁次
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-stone-900">
                {currentInfo.fullGanzhi}
              </div>
              <div className="text-xs text-stone-600 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-medium text-stone-800">{currentInfo.lunarDateStr}</span>
                <span className="text-stone-300">|</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px]">
                  生肖属{currentInfo.shengXiao}
                </span>
                {currentInfo.jieQi && (
                  <>
                    <span className="text-stone-300">|</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium">
                      今日节气: {currentInfo.jieQi}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Solar Term Indicator */}
          {currentInfo.nextJieQi && (
            <div className="text-right text-xs text-stone-500 shrink-0 hidden md:block">
              <div className="text-[11px] text-stone-600 font-medium">节气推演</div>
              <div className="text-stone-800 font-medium mt-0.5">
                下一节气: <span className="text-emerald-700 font-bold">{currentInfo.nextJieQi.name}</span>
              </div>
              <div className="text-[11px] text-stone-600">{currentInfo.nextJieQi.date}</div>
            </div>
          )}
        </div>

        {/* Four Pillars Display Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <PillarCard
            label="年柱"
            subLabel="岁次 / 根基"
            data={currentInfo.pillars.year}
          />
          <PillarCard
            label="月柱"
            subLabel="月令 / 提纲"
            data={currentInfo.pillars.month}
          />
          <PillarCard
            label="日柱"
            subLabel="日元 / 己身"
            data={currentInfo.pillars.day}
            highlight={true}
          />
          <PillarCard
            label="时柱"
            subLabel="时辰 / 归宿"
            data={currentInfo.pillars.time}
          />
        </div>

        {/* Additional Traditional Calendar Attributes */}
        <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Auspicious Directions */}
          <div className="bg-stone-50/80 rounded-lg p-2.5 border border-stone-200/80 flex items-start gap-2">
            <Compass className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-700 block mb-0.5">吉神方位</span>
              <span className="text-stone-600">
                喜神: <strong className="text-stone-800">{currentInfo.xiShen}</strong> · 
                福神: <strong className="text-stone-800">{currentInfo.fuShen}</strong> · 
                财神: <strong className="text-stone-800">{currentInfo.caiShen}</strong>
              </span>
            </div>
          </div>

          {/* Chong and Sha */}
          <div className="bg-stone-50/80 rounded-lg p-2.5 border border-stone-200/80 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-700 block mb-0.5">今日冲煞</span>
              <span className="text-stone-600">
                冲: <strong className="text-stone-800">{currentInfo.chong}</strong> · 
                煞: <strong className="text-stone-800">{currentInfo.sha}</strong>
              </span>
            </div>
          </div>

          {/* Pengzu Taboos */}
          <div className="bg-stone-50/80 rounded-lg p-2.5 border border-stone-200/80 flex items-start gap-2">
            <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-700 block mb-0.5">彭祖百忌</span>
              <span className="text-stone-600 truncate block" title={`${currentInfo.pengZuGan} ${currentInfo.pengZuZhi}`}>
                {currentInfo.pengZuGan}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
