import React, { useState, useEffect } from 'react';
import { GanzhiDateResult } from '../types';
import { calculateGanzhiFromSolar, calculateGanzhiFromLunar } from '../utils/ganzhi';
import { PillarCard } from './PillarCard';
import { WuXingAnalysis } from './WuXingAnalysis';
import { ShichenTable } from './ShichenTable';
import {
  Calendar as CalendarIcon,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Compass,
  Clock,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';

interface DateQueryCardProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

const LUNAR_MONTHS = [
  { val: 1, label: '正月' },
  { val: 2, label: '二月' },
  { val: 3, label: '三月' },
  { val: 4, label: '四月' },
  { val: 5, label: '五月' },
  { val: 6, label: '六月' },
  { val: 7, label: '七月' },
  { val: 8, label: '八月' },
  { val: 9, label: '九月' },
  { val: 10, label: '十月' },
  { val: 11, label: '冬月 (十一月)' },
  { val: 12, label: '腊月 (十二月)' },
];

const LUNAR_DAYS = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

export const DateQueryCard: React.FC<DateQueryCardProps> = ({
  initialDate = new Date(),
}) => {
  // Calendar type: 'solar' (公历) or 'lunar' (农历)
  const [calType, setCalType] = useState<'solar' | 'lunar'>('solar');

  // Solar states
  const [solarYear, setSolarYear] = useState<number>(initialDate.getFullYear());
  const [solarMonth, setSolarMonth] = useState<number>(initialDate.getMonth() + 1);
  const [solarDay, setSolarDay] = useState<number>(initialDate.getDate());
  const [selectedHour, setSelectedHour] = useState<number>(initialDate.getHours());
  const [selectedMinute, setSelectedMinute] = useState<number>(initialDate.getMinutes());

  // Lunar states
  const [lunarYear, setLunarYear] = useState<number>(initialDate.getFullYear());
  const [lunarMonth, setLunarMonth] = useState<number>(7);
  const [lunarDay, setLunarDay] = useState<number>(26);
  const [isLeapMonth, setIsLeapMonth] = useState<boolean>(false);

  // Result
  const [result, setResult] = useState<GanzhiDateResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Recalculate whenever inputs change
  useEffect(() => {
    if (calType === 'solar') {
      const res = calculateGanzhiFromSolar(
        solarYear,
        solarMonth,
        solarDay,
        selectedHour,
        selectedMinute,
        0
      );
      setResult(res);
    } else {
      const res = calculateGanzhiFromLunar(
        lunarYear,
        lunarMonth,
        lunarDay,
        selectedHour,
        selectedMinute,
        0,
        isLeapMonth
      );
      if (res) {
        setResult(res);
      }
    }
  }, [
    calType,
    solarYear,
    solarMonth,
    solarDay,
    lunarYear,
    lunarMonth,
    lunarDay,
    isLeapMonth,
    selectedHour,
    selectedMinute,
  ]);

  // Handle native HTML date input
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const parts = val.split('-');
    if (parts.length === 3) {
      setSolarYear(parseInt(parts[0], 10));
      setSolarMonth(parseInt(parts[1], 10));
      setSolarDay(parseInt(parts[2], 10));
    }
  };

  const getFormattedDateString = () => {
    const y = String(solarYear).padStart(4, '0');
    const m = String(solarMonth).padStart(2, '0');
    const d = String(solarDay).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Quick Presets
  const setQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setCalType('solar');
    setSolarYear(d.getFullYear());
    setSolarMonth(d.getMonth() + 1);
    setSolarDay(d.getDate());
    setSelectedHour(d.getHours());
    setSelectedMinute(d.getMinutes());
  };

  const setSpecialYear = (year: number) => {
    setCalType('solar');
    setSolarYear(year);
  };

  const handleCopyResult = () => {
    if (!result) return;
    const text = `【指定日期干支查询结果】
公历日期：${result.solarDateStr} ${result.solarTimeStr} (${result.weekDayName})
农历日期：${result.lunarDateStr} (生肖：${result.shengXiao})
四柱干支：${result.fullGanzhi}
年柱：${result.pillars.year.ganZhi} [${result.pillars.year.naYin}]
月柱：${result.pillars.month.ganZhi} [${result.pillars.month.naYin}]
日柱：${result.pillars.day.ganZhi} [${result.pillars.day.naYin}]
时柱：${result.pillars.time.ganZhi} [${result.pillars.time.naYin}]
节气：${result.jieQi || '无'}
冲煞：冲${result.chong} 煞${result.sha}
彭祖百忌：${result.pengZuGan} ${result.pengZuZhi}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="date-query-section"
      className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
    >
      {/* Section Header */}
      <div className="bg-stone-50 border-b border-stone-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-700" />
            指定日期天干地支查询
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            输入公历或农历日期与时辰，即刻推算四柱八字、五行纳音与当令时局
          </p>
        </div>

        {/* Solar / Lunar Toggle */}
        <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg text-xs font-medium">
          <button
            id="tab-solar"
            onClick={() => setCalType('solar')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${
              calType === 'solar'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            公历 (阳历)
          </button>
          <button
            id="tab-lunar"
            onClick={() => setCalType('lunar')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${
              calType === 'lunar'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
            农历 (阴历)
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Input Controls Bar */}
        <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-4 space-y-4">
          {calType === 'solar' ? (
            /* Solar Input Controls */
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              {/* Native Date Picker */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="solar-native-date"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  选择公历日期
                </label>
                <input
                  id="solar-native-date"
                  type="date"
                  value={getFormattedDateString()}
                  onChange={handleDateInputChange}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-xs"
                />
              </div>

              {/* Year Select/Input */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="input-solar-year"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  年份 (公元)
                </label>
                <input
                  id="input-solar-year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={solarYear}
                  onChange={(e) => setSolarYear(parseInt(e.target.value) || 2026)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
              </div>

              {/* Month Select */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="select-solar-month"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  月份
                </label>
                <select
                  id="select-solar-month"
                  value={solarMonth}
                  onChange={(e) => setSolarMonth(parseInt(e.target.value))}
                  className="w-full px-2 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      {m}月
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Select */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="input-solar-day"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  日份
                </label>
                <select
                  id="input-solar-day"
                  value={solarDay}
                  onChange={(e) => setSolarDay(parseInt(e.target.value))}
                  className="w-full px-2 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d}日
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* Lunar Input Controls */
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-3">
                <label
                  htmlFor="lunar-year"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  农历年份
                </label>
                <input
                  id="lunar-year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={lunarYear}
                  onChange={(e) => setLunarYear(parseInt(e.target.value) || 2026)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="lunar-month"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  农历月份
                </label>
                <select
                  id="lunar-month"
                  value={lunarMonth}
                  onChange={(e) => setLunarMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                >
                  {LUNAR_MONTHS.map((m) => (
                    <option key={m.val} value={m.val}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lunar-day"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  农历日期
                </label>
                <select
                  id="lunar-day"
                  value={lunarDay}
                  onChange={(e) => setLunarDay(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                >
                  {LUNAR_DAYS.map((name, i) => (
                    <option key={i + 1} value={i + 1}>
                      {name} ({i + 1}日)
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 pb-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                  <input
                    type="checkbox"
                    checked={isLeapMonth}
                    onChange={(e) => setIsLeapMonth(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>是否闰月</span>
                </label>
              </div>
            </div>
          )}

          {/* Time & Shichen Selector */}
          <div className="pt-3 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-4 flex items-center gap-2">
              <label
                htmlFor="select-hour"
                className="text-xs font-medium text-stone-700 whitespace-nowrap"
              >
                时间/时辰:
              </label>
              <select
                id="select-hour"
                value={selectedHour}
                onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              >
                <option value={23}>23:00 - 01:00 (子时·夜半)</option>
                <option value={0}>00:00 - 01:00 (子时·早子)</option>
                <option value={2}>01:00 - 03:00 (丑时·鸡鸣)</option>
                <option value={4}>03:00 - 05:00 (寅时·平旦)</option>
                <option value={6}>05:00 - 07:00 (卯时·日出)</option>
                <option value={8}>07:00 - 09:00 (辰时·食时)</option>
                <option value={10}>09:00 - 11:00 (巳时·隅中)</option>
                <option value={12}>11:00 - 13:00 (午时·日中)</option>
                <option value={14}>13:00 - 15:00 (未时·日昳)</option>
                <option value={16}>15:00 - 17:00 (申时·晡时)</option>
                <option value={18}>17:00 - 19:00 (酉时·日入)</option>
                <option value={20}>19:00 - 21:00 (戌时·黄昏)</option>
                <option value={22}>21:00 - 23:00 (亥时·人定)</option>
              </select>
            </div>

            {/* Quick Date Presets */}
            <div className="sm:col-span-8 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-stone-500 mr-1">快捷预设:</span>
              <button
                onClick={() => setQuickDate(0)}
                className="px-2 py-1 text-xs rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition"
              >
                今天
              </button>
              <button
                onClick={() => setQuickDate(-1)}
                className="px-2 py-1 text-xs rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition"
              >
                昨天
              </button>
              <button
                onClick={() => setQuickDate(1)}
                className="px-2 py-1 text-xs rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition"
              >
                明天
              </button>
              <button
                onClick={() => setSpecialYear(1984)}
                className="px-2 py-1 text-xs rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition"
                title="近代甲子年"
              >
                1984 (甲子年)
              </button>
              <button
                onClick={() => setSpecialYear(2024)}
                className="px-2 py-1 text-xs rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition"
                title="甲辰龙年"
              >
                2024 (甲辰)
              </button>
              <button
                onClick={() => setSpecialYear(2026)}
                className="px-2 py-1 text-xs rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition"
                title="丙午马年"
              >
                2026 (丙午)
              </button>
            </div>
          </div>
        </div>

        {/* Results Showcase */}
        {result && (
          <div className="space-y-5">
            {/* Primary Ganzhi Summary Banner */}
            <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50/40 rounded-2xl border border-amber-200/90 p-5 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-800 text-amber-100 font-serif">
                      推算结果
                    </span>
                    <span className="text-xs text-stone-600">
                      公历：{result.solarDateStr} {result.solarTimeStr} · {result.weekDayName}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-wider">
                    {result.fullGanzhi}
                  </div>
                </div>

                <button
                  id="btn-copy-query-result"
                  onClick={handleCopyResult}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-medium transition flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>已复制详细结果</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>复制干支与历法</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Details Row */}
              <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-600">
                <span className="flex items-center gap-1 font-medium text-stone-800">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  {result.lunarDateStr}
                </span>
                <span className="text-stone-300">|</span>
                <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700">
                  生肖：<strong className="text-stone-900 font-serif font-bold">{result.shengXiao}</strong>
                </span>
                {result.jieQi && (
                  <>
                    <span className="text-stone-300">|</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100/70 border border-emerald-300 text-emerald-900 font-medium">
                      当令节气：{result.jieQi}
                    </span>
                  </>
                )}
                <span className="text-stone-300">|</span>
                <span className="text-stone-600">
                  冲煞：冲<strong>{result.chong}</strong> · 煞<strong>{result.sha}</strong>
                </span>
              </div>
            </div>

            {/* Four Pillars Detail Cards */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-stone-700 font-serif tracking-wider">
                  四柱八字干支排盘 (年柱 · 月柱 · 日柱 · 时柱)
                </h3>
                <span className="text-[11px] text-stone-500">
                  含天干地支、阴阳五行与六十甲子纳音
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <PillarCard
                  label="年柱 (岁次)"
                  subLabel="命造根基 · 祖上"
                  data={result.pillars.year}
                />
                <PillarCard
                  label="月柱 (月令)"
                  subLabel="当令节气 · 提纲"
                  data={result.pillars.month}
                />
                <PillarCard
                  label="日柱 (日元)"
                  subLabel="己身日主 · 核心"
                  data={result.pillars.day}
                  highlight={true}
                />
                <PillarCard
                  label="时柱 (时辰)"
                  subLabel="归宿时向 · 终局"
                  data={result.pillars.time}
                />
              </div>
            </div>

            {/* WuXing Balance & Distribution */}
            <WuXingAnalysis counts={result.wuXingCounts} />

            {/* Twelve Shichens of this Day Table */}
            <ShichenTable
              shichens={result.shichensOfDay}
              selectedHour={selectedHour}
              onSelectHour={(h) => setSelectedHour(h)}
            />
          </div>
        )}
      </div>
    </section>
  );
};
