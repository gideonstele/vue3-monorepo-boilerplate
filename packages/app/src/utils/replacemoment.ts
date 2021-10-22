// 别动这个文件，用 dayjs 替换掉了 antd自带的 moment.js
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import toObject from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import localeData from 'dayjs/plugin/localeData';
import moment from 'dayjs/plugin/isMoment';
import mutable from 'dayjs/plugin/badMutable';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.extend(moment);
dayjs.extend(mutable);
dayjs.extend(toObject);
dayjs.locale('zh-cn');

export const isMoment = dayjs.isDayjs;
export default dayjs;

export type { Dayjs };
