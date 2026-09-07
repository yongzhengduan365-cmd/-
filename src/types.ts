export type WuXing = '金' | '木' | '水' | '火' | '土';

export type YinYang = '阴' | '阳';

export interface StemDetail {
  name: string;
  yinYang: YinYang;
  wuXing: WuXing;
  direction: string;
  season: string;
  desc: string;
}

export interface BranchDetail {
  name: string;
  shengXiao: string;
  yinYang: YinYang;
  wuXing: WuXing;
  shichenName: string;
  timeRange: string;
  monthName: string;
  desc: string;
}

export interface PillarData {
  gan: string;
  zhi: string;
  ganZhi: string;
  wuXingGan: WuXing;
  wuXingZhi: WuXing;
  wuXingDesc: string;
  naYin: string;
  shengXiao?: string;
  shiShenGan?: string;
  diShi?: string;
}

export interface FourPillars {
  year: PillarData;
  month: PillarData;
  day: PillarData;
  time: PillarData;
}

export interface GanzhiDateResult {
  solarDateStr: string;
  solarTimeStr: string;
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  solarHour: number;
  solarMinute: number;
  weekDayName: string;
  
  lunarYearInChinese: string;
  lunarMonthInChinese: string;
  lunarDayInChinese: string;
  lunarDateStr: string;
  isLeapMonth: boolean;
  
  pillars: FourPillars;
  fullGanzhi: string; // e.g. 丙午年 丁酉月 甲申日 壬申时
  
  shengXiao: string;
  jieQi: string | null;
  prevJieQi: { name: string; date: string } | null;
  nextJieQi: { name: string; date: string } | null;
  
  pengZuGan: string;
  pengZuZhi: string;
  chong: string;
  sha: string;
  xiShen: string;
  fuShen: string;
  caiShen: string;
  
  shichensOfDay: Array<{
    name: string;
    branch: string;
    ganZhi: string;
    timeRange: string;
    wuXing: string;
    isCurrent: boolean;
  }>;

  wuXingCounts: Record<WuXing, number>;
}
