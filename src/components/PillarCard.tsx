import React from 'react';
import { PillarData, WuXing } from '../types';
import { WUXING_COLORS, STEM_DETAILS, BRANCH_DETAILS } from '../utils/ganzhi';

interface PillarCardProps {
  label: string;
  subLabel: string;
  data: PillarData;
  highlight?: boolean;
}

export const PillarCard: React.FC<PillarCardProps> = ({
  label,
  subLabel,
  data,
  highlight = false,
}) => {
  const ganInfo = STEM_DETAILS[data.gan];
  const zhiInfo = BRANCH_DETAILS[data.zhi];

  const ganColors = WUXING_COLORS[data.wuXingGan] || WUXING_COLORS['土'];
  const zhiColors = WUXING_COLORS[data.wuXingZhi] || WUXING_COLORS['土'];

  return (
    <div
      id={`pillar-card-${label}`}
      className={`relative flex flex-col items-center justify-between rounded-xl p-4 transition-all duration-300 border ${
        highlight
          ? 'bg-amber-50/50 border-amber-300 shadow-sm'
          : 'bg-stone-50/60 border-stone-200/80 hover:border-stone-300'
      }`}
    >
      {/* Pillar Title Header */}
      <div className="flex items-center justify-between w-full border-b border-stone-200/70 pb-2 mb-3">
        <span className="text-xs font-semibold tracking-wider text-stone-700">
          {label}
        </span>
        <span className="text-[11px] text-stone-500 font-serif">
          {subLabel}
        </span>
      </div>

      {/* Main Big Characters */}
      <div className="flex flex-col items-center my-1 space-y-2">
        {/* TianGan */}
        <div className="flex items-center gap-2">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-serif text-3xl font-bold border shadow-xs ${ganColors.badgeBg} ${ganColors.text} ${ganColors.border}`}
          >
            {data.gan}
          </div>
          <div className="flex flex-col text-left text-xs">
            <span className="font-medium text-stone-800">
              {ganInfo?.yinYang}
              <span className={`ml-0.5 font-bold ${ganColors.text}`}>
                {data.wuXingGan}
              </span>
            </span>
            <span className="text-[10px] text-stone-500">{ganInfo?.direction}</span>
          </div>
        </div>

        {/* DiZhi */}
        <div className="flex items-center gap-2">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-serif text-3xl font-bold border shadow-xs ${zhiColors.badgeBg} ${zhiColors.text} ${zhiColors.border}`}
          >
            {data.zhi}
          </div>
          <div className="flex flex-col text-left text-xs">
            <span className="font-medium text-stone-800">
              {zhiInfo?.yinYang}
              <span className={`ml-0.5 font-bold ${zhiColors.text}`}>
                {data.wuXingZhi}
              </span>
            </span>
            <span className="text-[10px] text-stone-500">
              {data.shengXiao ? `肖${data.shengXiao}` : zhiInfo?.timeRange}
            </span>
          </div>
        </div>
      </div>

      {/* NaYin & Five Elements Footer */}
      <div className="w-full mt-3 pt-2.5 border-t border-stone-200/70 flex flex-col items-center gap-1">
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
          <span className="text-[10px] text-stone-600 font-medium">纳音:</span>
          <span className="font-semibold text-stone-800">{data.naYin || '—'}</span>
        </div>
      </div>
    </div>
  );
};
