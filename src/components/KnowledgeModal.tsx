import React, { useState } from 'react';
import { X, BookOpen, Layers, Clock, SunMedium } from 'lucide-react';
import { STEM_DETAILS, BRANCH_DETAILS, WUXING_COLORS } from '../utils/ganzhi';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'stems' | 'branches' | 'rules'>('stems');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-700/80 text-amber-100 flex items-center justify-center font-serif font-bold text-xs border border-amber-600">
              道藏
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-50">
                天干地支基础知识与推算指引
              </h3>
              <p className="text-xs text-stone-400">
                十天干、十二地支、五行相生与歌诀推算法理
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

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('stems')}
            className={`px-4 py-2.5 text-xs font-serif font-bold rounded-t-lg transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'stems'
                ? 'bg-white border-amber-600 text-amber-900 shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <SunMedium className="w-3.5 h-3.5" />
            十天干详解 (甲至癸)
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2.5 text-xs font-serif font-bold rounded-t-lg transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'branches'
                ? 'bg-white border-amber-600 text-amber-900 shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            十二地支与时辰 (子至亥)
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2.5 text-xs font-serif font-bold rounded-t-lg transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-white border-amber-600 text-amber-900 shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            推算歌诀 (五鼠遁/五虎遁)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-stone-800 space-y-4">
          {activeTab === 'stems' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(STEM_DETAILS).map((stem) => {
                const color = WUXING_COLORS[stem.wuXing];
                return (
                  <div
                    key={stem.name}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white transition flex items-start gap-3"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-serif text-2xl font-bold border ${color.badgeBg} ${color.text} ${color.border} shrink-0`}
                    >
                      {stem.name}
                    </div>
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900 font-serif">
                          {stem.name} ({stem.yinYang}{stem.wuXing})
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                          {stem.direction} · {stem.season}
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        {stem.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(BRANCH_DETAILS).map((branch) => {
                const color = WUXING_COLORS[branch.wuXing];
                return (
                  <div
                    key={branch.name}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white transition flex items-start gap-3"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-serif text-2xl font-bold border ${color.badgeBg} ${color.text} ${color.border} shrink-0`}
                    >
                      {branch.name}
                    </div>
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900 font-serif">
                          {branch.name} · 肖{branch.shengXiao}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                          {branch.yinYang}{branch.wuXing}
                        </span>
                      </div>
                      <div className="text-amber-800 font-mono text-[11px]">
                        {branch.shichenName} ({branch.timeRange})
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        {branch.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 text-xs leading-relaxed text-stone-700">
              {/* Wu Shu Dun */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <h4 className="font-serif font-bold text-sm text-amber-950 mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  日上起时歌（五鼠遁元日上起时法）
                </h4>
                <p className="text-stone-600 mb-2.5">
                  根据每日的日干，推算当日十二时辰的天干配法：
                </p>
                <div className="bg-white p-3 rounded-lg border border-amber-200/80 font-serif text-amber-900 text-sm leading-loose space-y-1">
                  <div>甲己还加甲，乙庚丙作初；</div>
                  <div>丙辛从戊起，丁壬庚子居；</div>
                  <div>戊癸何方发？壬子是真途。</div>
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  如：逢甲日或己日，夜半子时即为「甲子时」；逢乙日或庚日，子时即为「丙子时」。
                </div>
              </div>

              {/* Wu Hu Dun */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                <h4 className="font-serif font-bold text-sm text-stone-900 mb-1 flex items-center gap-1.5">
                  <SunMedium className="w-4 h-4 text-amber-700" />
                  年上起月歌（五虎遁月法）
                </h4>
                <p className="text-stone-600 mb-2.5">
                  根据每年的年干，以正月（寅月）为起点推算十二月份的天干配法：
                </p>
                <div className="bg-white p-3 rounded-lg border border-stone-200 font-serif text-stone-800 text-sm leading-loose space-y-1">
                  <div>甲己之年丙作首，乙庚之岁戊为头；</div>
                  <div>丙辛必定寻庚起，丁壬壬位顺行流；</div>
                  <div>若问戊癸何方发，甲寅之上好追求。</div>
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  如：逢丙年或辛年，正月即为「庚寅月」，二月为「辛卯月」，以此顺推。
                </div>
              </div>

              {/* Na Yin Intro */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                <h4 className="font-serif font-bold text-sm text-stone-900 mb-1">
                  什么是六十甲子纳音五行？
                </h4>
                <p className="text-stone-600">
                  六十甲子纳音是将干支与中国古代音律相配而成的五行象意。两个相邻干支同属一纳音（如甲子、乙丑同为「海中金」），涵盖了海中金、炉中火、大林木、路旁土等三十种纳音象意，用以形象化地阐释事物的物象与本质。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
