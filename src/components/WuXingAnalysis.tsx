import React from 'react';
import { WuXing } from '../types';
import { WUXING_COLORS } from '../utils/ganzhi';

interface WuXingAnalysisProps {
  counts: Record<WuXing, number>;
}

const ELEMENTS_INFO: Record<
  WuXing,
  { label: string; nature: string; keyword: string }
> = {
  木: { label: '木', nature: '东方·青龙', keyword: '生发、仁慈、条达' },
  火: { label: '火', nature: '南方·朱雀', keyword: '炎上、热情、通明' },
  土: { label: '土', nature: '中央·勾陈', keyword: '稼穑、厚德、稳健' },
  金: { label: '金', nature: '西方·白虎', keyword: '从革、肃杀、义气' },
  水: { label: '水', nature: '北方·玄武', keyword: '润下、智慧、深邃' },
};

export const WuXingAnalysis: React.FC<WuXingAnalysisProps> = ({ counts }) => {
  const elements: WuXing[] = ['木', '火', '土', '金', '水'];
  const total = elements.reduce((sum, elem) => sum + (counts[elem] || 0), 0) || 8;

  return (
    <div id="wuxing-analysis-card" className="bg-stone-50 rounded-xl p-4 border border-stone-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-stone-700 font-serif flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          四柱八字 · 五行格局分布
        </span>
        <span className="text-[11px] text-stone-500">
          四干四支共八字统计
        </span>
      </div>

      {/* Visual Element Proportions Bar */}
      <div className="h-3.5 w-full bg-stone-200 rounded-full overflow-hidden flex shadow-inner mb-3">
        {elements.map((elem) => {
          const count = counts[elem] || 0;
          if (count === 0) return null;
          const pct = (count / total) * 100;
          const c = WUXING_COLORS[elem];
          return (
            <div
              key={elem}
              style={{ width: `${pct}%` }}
              className={`h-full bg-gradient-to-r ${c.gradient} transition-all duration-500`}
              title={`${elem}: ${count}个 (${pct.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Grid of Element Counts */}
      <div className="grid grid-cols-5 gap-2">
        {elements.map((elem) => {
          const count = counts[elem] || 0;
          const c = WUXING_COLORS[elem];
          const info = ELEMENTS_INFO[elem];

          return (
            <div
              key={elem}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                count > 0
                  ? `${c.bg} ${c.border}`
                  : 'bg-stone-100/50 border-stone-200/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className={`text-base font-bold font-serif ${count > 0 ? c.text : 'text-stone-400'}`}>
                  {elem}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                    count > 0 ? `${c.badgeBg} ${c.badgeText}` : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 mt-1 scale-90">
                {info.nature}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
