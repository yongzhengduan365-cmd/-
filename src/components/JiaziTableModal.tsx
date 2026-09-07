import React, { useState } from 'react';
import { X, Filter, Search, Sparkles } from 'lucide-react';
import { JIAZI_LIST, NAYIN_DICT, STEM_DETAILS, BRANCH_DETAILS, WUXING_COLORS } from '../utils/ganzhi';
import { WuXing } from '../types';

interface JiaziTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJiazi?: (ganzhi: string) => void;
}

export const JiaziTableModal: React.FC<JiaziTableModalProps> = ({
  isOpen,
  onClose,
  onSelectJiazi,
}) => {
  const [selectedWuXing, setSelectedWuXing] = useState<WuXing | '全部'>('全部');
  const [searchKey, setSearchKey] = useState<string>('');

  if (!isOpen) return null;

  const filteredList = JIAZI_LIST.map((gz, index) => {
    const gan = gz[0];
    const zhi = gz[1];
    const naYin = NAYIN_DICT[gz] || '';
    const ganInfo = STEM_DETAILS[gan];
    const zhiInfo = BRANCH_DETAILS[zhi];
    const num = index + 1;

    // Calculate sample years for this Ganzhi in the modern era
    // Reference: 1984 is 甲子 (1)
    const offset = index; // 0 for 甲子
    const year1900 = 1984 - 60 + offset; // 1924 + offset
    const yearModern = 1984 + offset;
    const yearFuture = 2044 + offset;

    return {
      num,
      ganZhi: gz,
      gan,
      zhi,
      naYin,
      ganInfo,
      zhiInfo,
      years: [year1900, yearModern, yearFuture],
    };
  }).filter((item) => {
    const matchesSearch =
      !searchKey ||
      item.ganZhi.includes(searchKey) ||
      item.naYin.includes(searchKey) ||
      item.zhiInfo?.shengXiao?.includes(searchKey) ||
      String(item.num) === searchKey;

    if (!matchesSearch) return false;

    if (selectedWuXing !== '全部') {
      const stemMatch = item.ganInfo?.wuXing === selectedWuXing;
      const zhiMatch = item.zhiInfo?.wuXing === selectedWuXing;
      const naYinMatch = item.naYin.includes(selectedWuXing);
      return stemMatch || zhiMatch || naYinMatch;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-700/80 text-amber-100 flex items-center justify-center font-serif font-bold text-xs border border-amber-600">
              六十
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-50">
                六十花甲子全表
              </h3>
              <p className="text-xs text-stone-400">
                天干地支六十年一轮回，周而复始，纳音备焉
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-500 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              五行筛选:
            </span>
            {(['全部', '木', '火', '土', '金', '水'] as const).map((wx) => (
              <button
                key={wx}
                onClick={() => setSelectedWuXing(wx)}
                className={`px-2.5 py-1 rounded-md transition ${
                  selectedWuXing === wx
                    ? 'bg-amber-800 text-amber-50 font-semibold shadow-xs'
                    : 'bg-white hover:bg-stone-200/80 text-stone-700 border border-stone-300/80'
                }`}
              >
                {wx}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="搜索干支/生肖/纳音..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Jiazi Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredList.map((item) => {
            const ganCol = WUXING_COLORS[item.ganInfo?.wuXing || '土'];

            return (
              <div
                key={item.ganZhi}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 pb-1 mb-1 border-b border-stone-200/60">
                    <span className="font-mono">第{item.num}位</span>
                    <span className="text-stone-500">肖{item.zhiInfo?.shengXiao}</span>
                  </div>

                  <div className="flex items-center gap-2 my-1">
                    <span className="text-xl font-serif font-black text-stone-900 group-hover:text-amber-800 transition">
                      {item.ganZhi}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${ganCol.badgeBg} ${ganCol.badgeText}`}
                    >
                      {item.ganInfo?.wuXing}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-stone-700 font-serif">
                    纳音：<span className="text-stone-900 font-bold">{item.naYin}</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-200/60 text-[10px] text-stone-500">
                  <span>干支纪年：</span>
                  <span className="font-mono">{item.years[1]}年</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>共 {filteredList.length} 组干支</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
