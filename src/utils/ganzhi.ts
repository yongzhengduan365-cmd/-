import { Solar, Lunar } from 'lunar-typescript';
import { GanzhiDateResult, PillarData, FourPillars, WuXing, StemDetail, BranchDetail } from '../types';

export const STEM_DETAILS: Record<string, StemDetail> = {
  甲: { name: '甲', yinYang: '阳', wuXing: '木', direction: '东方', season: '春季', desc: '栋梁之木，主仁慈、正直、向上' },
  乙: { name: '乙', yinYang: '阴', wuXing: '木', direction: '东方', season: '春季', desc: '花草之木，主柔顺、坚韧、机敏' },
  丙: { name: '丙', yinYang: '阳', wuXing: '火', direction: '南方', season: '夏季', desc: '太阳之火，主热情、光明、急燥' },
  丁: { name: '丁', yinYang: '阴', wuXing: '火', direction: '南方', season: '夏季', desc: '灯烛之火，主细腻、敏锐、温和' },
  戊: { name: '戊', yinYang: '阳', wuXing: '土', direction: '中央', season: '季夏', desc: '城墙之土，主沉稳、厚重、包容' },
  己: { name: '己', yinYang: '阴', wuXing: '土', direction: '中央', season: '季夏', desc: '田园之土，主内敛、承载、周全' },
  庚: { name: '庚', yinYang: '阳', wuXing: '金', direction: '西方', season: '秋季', desc: '刀剑之金，主刚毅、果决、义气' },
  辛: { name: '辛', yinYang: '阴', wuXing: '金', direction: '西方', season: '秋季', desc: '珠玉之金，主温润、清秀、自律' },
  壬: { name: '壬', yinYang: '阳', wuXing: '水', direction: '北方', season: '冬季', desc: '江河之水，主奔涌、智慧、应变' },
  癸: { name: '癸', yinYang: '阴', wuXing: '水', direction: '北方', season: '冬季', desc: '雨露之水，主润物、潜移、灵动' },
};

export const BRANCH_DETAILS: Record<string, BranchDetail> = {
  子: { name: '子', shengXiao: '鼠', yinYang: '阳', wuXing: '水', shichenName: '子时', timeRange: '23:00 - 01:00', monthName: '十一月 (仲冬)', desc: '夜半更深，阴极阳生' },
  丑: { name: '丑', shengXiao: '牛', yinYang: '阴', wuXing: '土', shichenName: '丑时', timeRange: '01:00 - 03:00', monthName: '十二月 (季冬)', desc: '荒鸡鸣唱，蓄力待旦' },
  寅: { name: '寅', shengXiao: '虎', yinYang: '阳', wuXing: '木', shichenName: '寅时', timeRange: '03:00 - 05:00', monthName: '正月 (孟春)', desc: '平旦晨曦，万物萌发' },
  卯: { name: '卯', shengXiao: '兔', yinYang: '阴', wuXing: '木', shichenName: '卯时', timeRange: '05:00 - 07:00', monthName: '二月 (仲春)', desc: '日出东方，生机盎然' },
  辰: { name: '辰', shengXiao: '龙', yinYang: '阳', wuXing: '土', shichenName: '辰时', timeRange: '07:00 - 09:00', monthName: '三月 (季春)', desc: '朝食之时，飞龙行云' },
  巳: { name: '巳', shengXiao: '蛇', yinYang: '阴', wuXing: '火', shichenName: '巳时', timeRange: '09:00 - 11:00', monthName: '四月 (孟夏)', desc: '日禺将中，阳气舒展' },
  午: { name: '午', shengXiao: '马', yinYang: '阳', wuXing: '火', shichenName: '午时', timeRange: '11:00 - 13:00', monthName: '五月 (仲夏)', desc: '日正当午，阳极转阴' },
  未: { name: '未', shengXiao: '羊', yinYang: '阴', wuXing: '土', shichenName: '未时', timeRange: '13:00 - 15:00', monthName: '六月 (季夏)', desc: '日昳向斜，温养滋荣' },
  申: { name: '申', shengXiao: '猴', yinYang: '阳', wuXing: '金', shichenName: '申时', timeRange: '15:00 - 17:00', monthName: '七月 (孟秋)', desc: '晡时向晚，金风渐起' },
  酉: { name: '酉', shengXiao: '鸡', yinYang: '阴', wuXing: '金', shichenName: '酉时', timeRange: '17:00 - 19:00', monthName: '八月 (仲秋)', desc: '日落西山，酉时归巢' },
  戌: { name: '戌', shengXiao: '狗', yinYang: '阳', wuXing: '土', shichenName: '戌时', timeRange: '19:00 - 21:00', monthName: '九月 (季秋)', desc: '黄昏向暮，烟火归宁' },
  亥: { name: '亥', shengXiao: '猪', yinYang: '阴', wuXing: '水', shichenName: '亥时', timeRange: '21:00 - 23:00', monthName: '十月 (孟冬)', desc: '人定归息，夜色深沉' },
};

export const JIAZI_LIST = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
];

export const NAYIN_DICT: Record<string, string> = {
  甲子: '海中金', 乙丑: '海中金', 丙寅: '炉中火', 丁卯: '炉中火', 戊辰: '大林木', 己巳: '大林木',
  庚午: '路旁土', 辛未: '路旁土', 壬申: '剑锋金', 癸酉: '剑锋金', 甲戌: '山头火', 乙亥: '山头火',
  丙子: '涧下水', 丁丑: '涧下水', 戊寅: '城头土', 己卯: '城头土', 庚辰: '白蜡金', 辛巳: '白蜡金',
  壬午: '杨柳木', 癸未: '杨柳木', 甲申: '泉中水', 乙酉: '泉中水', 丙戌: '屋上土', 丁亥: '屋上土',
  戊子: '霹雳火', 己丑: '霹雳火', 庚寅: '松柏木', 辛卯: '松柏木', 壬辰: '长流水', 癸巳: '长流水',
  甲午: '沙中金', 乙未: '沙中金', 丙申: '山下火', 丁酉: '山下火', 戊戌: '平地木', 己亥: '平地木',
  庚子: '壁上土', 辛丑: '壁上土', 壬寅: '金箔金', 癸卯: '金箔金', 甲辰: '覆灯火', 乙巳: '覆灯火',
  丙午: '天河水', 丁未: '天河水', 戊申: '大驿土', 己酉: '大驿土', 庚戌: '钗钏金', 辛亥: '钗钏金',
  壬子: '桑柘木', 癸丑: '桑柘木', 甲寅: '大溪水', 乙卯: '大溪水', 丙辰: '沙中土', 丁巳: '沙中土',
  戊午: '天上火', 己未: '天上火', 庚申: '石榴木', 辛酉: '石榴木', 壬戌: '大海水', 癸亥: '大海水',
};

export const WUXING_COLORS: Record<WuXing, {
  text: string;
  bg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
}> = {
  木: {
    text: 'text-emerald-700',
    bg: 'bg-emerald-50/70',
    border: 'border-emerald-300',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    gradient: 'from-emerald-500 to-teal-700',
  },
  火: {
    text: 'text-rose-700',
    bg: 'bg-rose-50/70',
    border: 'border-rose-300',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    gradient: 'from-rose-500 to-red-700',
  },
  土: {
    text: 'text-amber-700',
    bg: 'bg-amber-50/70',
    border: 'border-amber-300',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    gradient: 'from-amber-500 to-amber-700',
  },
  金: {
    text: 'text-yellow-700',
    bg: 'bg-yellow-50/70',
    border: 'border-yellow-300',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-800',
    gradient: 'from-yellow-500 to-amber-600',
  },
  水: {
    text: 'text-sky-700',
    bg: 'bg-sky-50/70',
    border: 'border-sky-300',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-800',
    gradient: 'from-sky-500 to-blue-700',
  },
};

/**
 * Parses a single pillar's data
 */
function createPillar(gan: string, zhi: string, naYinFallback?: string): PillarData {
  const ganInfo = STEM_DETAILS[gan];
  const zhiInfo = BRANCH_DETAILS[zhi];
  const ganZhi = `${gan}${zhi}`;
  const naYin = NAYIN_DICT[ganZhi] || naYinFallback || '';

  return {
    gan,
    zhi,
    ganZhi,
    wuXingGan: ganInfo?.wuXing || '土',
    wuXingZhi: zhiInfo?.wuXing || '土',
    wuXingDesc: `${ganInfo?.wuXing || ''}${zhiInfo?.wuXing || ''}`,
    naYin,
    shengXiao: zhiInfo?.shengXiao,
  };
}

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const SHICHEN_HOURS = [
  { branch: '子', hour: 0, range: '23:00 - 01:00' },
  { branch: '丑', hour: 2, range: '01:00 - 03:00' },
  { branch: '寅', hour: 4, range: '03:00 - 05:00' },
  { branch: '卯', hour: 6, range: '05:00 - 07:00' },
  { branch: '辰', hour: 8, range: '07:00 - 09:00' },
  { branch: '巳', hour: 10, range: '09:00 - 11:00' },
  { branch: '午', hour: 12, range: '11:00 - 13:00' },
  { branch: '未', hour: 14, range: '13:00 - 15:00' },
  { branch: '申', hour: 16, range: '15:00 - 17:00' },
  { branch: '酉', hour: 18, range: '17:00 - 19:00' },
  { branch: '戌', hour: 20, range: '19:00 - 21:00' },
  { branch: '亥', hour: 22, range: '21:00 - 23:00' },
];

/**
 * Calculates complete Ganzhi details for a solar date and time
 */
export function calculateGanzhiFromSolar(
  year: number,
  month: number,
  day: number,
  hour: number = 12,
  minute: number = 0,
  second: number = 0
): GanzhiDateResult {
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  const yearGan = eightChar.getYearGan();
  const yearZhi = eightChar.getYearZhi();
  const monthGan = eightChar.getMonthGan();
  const monthZhi = eightChar.getMonthZhi();
  const dayGan = eightChar.getDayGan();
  const dayZhi = eightChar.getDayZhi();
  const timeGan = eightChar.getTimeGan();
  const timeZhi = eightChar.getTimeZhi();

  const yearPillar = createPillar(yearGan, yearZhi, eightChar.getYearNaYin());
  const monthPillar = createPillar(monthGan, monthZhi, eightChar.getMonthNaYin());
  const dayPillar = createPillar(dayGan, dayZhi, eightChar.getDayNaYin());
  const timePillar = createPillar(timeGan, timeZhi, eightChar.getTimeNaYin());

  const pillars: FourPillars = {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    time: timePillar,
  };

  // Count WuXing in four pillars (8 characters total)
  const wuXingCounts: Record<WuXing, number> = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
  const allStems = [yearGan, monthGan, dayGan, timeGan];
  const allBranches = [yearZhi, monthZhi, dayZhi, timeZhi];

  allStems.forEach((g) => {
    const wx = STEM_DETAILS[g]?.wuXing;
    if (wx) wuXingCounts[wx]++;
  });
  allBranches.forEach((b) => {
    const wx = BRANCH_DETAILS[b]?.wuXing;
    if (wx) wuXingCounts[wx]++;
  });

  // Calculate 12 Shichens of this day
  const currentBranch = BRANCH_DETAILS[timeZhi]?.name;
  const shichensOfDay = SHICHEN_HOURS.map((item) => {
    const s = Solar.fromYmdHms(year, month, day, item.hour, 0, 0);
    const l = s.getLunar();
    const gz = l.getTimeInGanZhi();
    return {
      name: `${item.branch}时`,
      branch: item.branch,
      ganZhi: gz,
      timeRange: item.range,
      wuXing: NAYIN_DICT[gz] || '',
      isCurrent: item.branch === currentBranch,
    };
  });

  const prevJq = lunar.getPrevJieQi();
  const nextJq = lunar.getNextJieQi();

  const prevJieQi = prevJq
    ? {
        name: prevJq.getName(),
        date: prevJq.getSolar().toYmd(),
      }
    : null;

  const nextJieQi = nextJq
    ? {
        name: nextJq.getName(),
        date: nextJq.getSolar().toYmd(),
      }
    : null;

  return {
    solarDateStr: `${year}年${String(month).padStart(2, '0')}月${String(day).padStart(2, '0')}日`,
    solarTimeStr: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
    solarYear: year,
    solarMonth: month,
    solarDay: day,
    solarHour: hour,
    solarMinute: minute,
    weekDayName: WEEKDAYS[solar.getWeek()],

    lunarYearInChinese: `${lunar.getYearInChinese()}年`,
    lunarMonthInChinese: `${lunar.getMonthInChinese()}月`,
    lunarDayInChinese: lunar.getDayInChinese(),
    lunarDateStr: `农历 ${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    isLeapMonth: (lunar as any).isLeap ? (lunar as any).isLeap() : false,

    pillars,
    fullGanzhi: `${yearPillar.ganZhi}年 ${monthPillar.ganZhi}月 ${dayPillar.ganZhi}日 ${timePillar.ganZhi}时`,

    shengXiao: lunar.getYearShengXiao(),
    jieQi: lunar.getJieQi() || null,
    prevJieQi,
    nextJieQi,

    pengZuGan: lunar.getPengZuGan(),
    pengZuZhi: lunar.getPengZuZhi(),
    chong: lunar.getDayChongDesc(),
    sha: lunar.getDaySha(),
    xiShen: lunar.getDayPositionXiDesc(),
    fuShen: lunar.getDayPositionFuDesc(),
    caiShen: lunar.getDayPositionCaiDesc(),

    shichensOfDay,
    wuXingCounts,
  };
}

/**
 * Calculates Ganzhi from a Date object
 */
export function calculateGanzhiFromDate(date: Date): GanzhiDateResult {
  return calculateGanzhiFromSolar(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
}

/**
 * Calculates Ganzhi from a Lunar date input
 */
export function calculateGanzhiFromLunar(
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
  hour: number = 12,
  minute: number = 0,
  second: number = 0,
  isLeap: boolean = false
): GanzhiDateResult | null {
  try {
    const lunar = Lunar.fromYmdHms(
      lunarYear,
      isLeap ? -Math.abs(lunarMonth) : Math.abs(lunarMonth),
      lunarDay,
      hour,
      minute,
      second
    );
    const solar = lunar.getSolar();
    return calculateGanzhiFromSolar(
      solar.getYear(),
      solar.getMonth(),
      solar.getDay(),
      hour,
      minute,
      second
    );
  } catch (err) {
    console.error('Failed to convert lunar date', err);
    return null;
  }
}
