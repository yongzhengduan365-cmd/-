import React from 'react';
import { NAYIN_DICT } from '../utils/ganzhi';

interface ShichenItem {
  name: string;
  branch: string;
  ganZhi: string;
  timeRange: string;
  wuXing: string;
  isCurrent: boolean;
}

interface ShichenTableProps {
  shichens: ShichenItem[];
  selectedHour: number;
  onSelectHour: (hour: number) => void;
}

export const ShichenTable: React.FC<ShichenTableProps> = ({
  shichens,
  selectedHour,
  onSelectHour,
}) => {
  // Map branch to typical hour
  const branchToHour: Record<string, number> = {
    子: 0,
    丑: 2,
    寅: 4,
    卯: 6,
    辰: 8,
    巳: 10,
    午: 12,
    未: 14,
    申: 16,
    酉: 18,
    戌: 20,
    亥: 22,
  };

  const isSelectedBranch = (branch: string) => {
    const h = selectedHour;
    if (branch === '子') return h === 23 || h === 0;
    if (branch === '丑') return h >= 1 && h <= 2;
    if (branch === '寅') return h >= 3 && h <= 4;
    if (branch === '卯') return h >= 5 && h <= 6;
    if (branch === '辰') return h >= 7 && h <= 8;
    if (branch === '巳') return h >= 9 && h <= 10;
    if (branch === '午') return h >= 11 && h <= 12;
    if (branch === '未') return h >= 13 && h <= 14;
    if (branch === '申') return h >= 15 && h <= 16;
    if (branch === '酉') return h >= 17 && h <= 18;
    if (branch === '戌') return h >= 19 && h <= 20;
    if (branch === '亥') return h >= 21 && h <= 22;
    return false;
  };

  return (
    <div id="shichen-table-container" className="bg-stone-50 rounded-xl p-4 border border-stone-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-stone-700 font-serif flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
          当日十二时辰干支分布表 (点击可切换时柱)
        </span>
        <span className="text-[11px] text-stone-500">
          依日上起时（五鼠遁元）而定
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {shichens.map((item) => {
          const selected = isSelectedBranch(item.branch);
          const targetHour = branchToHour[item.branch] ?? 0;

          return (
            <button
              key={item.branch}
              onClick={() => onSelectHour(targetHour)}
              className={`text-left p-2 rounded-lg border transition-all flex flex-col justify-between ${
                selected
                  ? 'bg-amber-100/80 border-amber-400 shadow-xs ring-1 ring-amber-400'
                  : 'bg-white hover:bg-stone-100/70 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-sm font-serif text-stone-800">
                  {item.name}
                </span>
                <span
                  className={`font-serif font-bold text-sm ${
                    selected ? 'text-amber-900' : 'text-stone-900'
                  }`}
                >
                  {item.ganZhi}
                </span>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-500">
                <span>{item.timeRange}</span>
                <span className="text-stone-400 truncate max-w-[60px]">
                  {NAYIN_DICT[item.ganZhi] || ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
