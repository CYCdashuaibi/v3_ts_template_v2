import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 扩展插件
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 日期格式化工具
 * @param date 可接受的日期类型：Date对象 | 时间戳(毫秒) | 日期字符串 | Day.js对象 | undefined(默认为当前时间)
 * @param format 格式字符串，可选值：
 *   - 预定义格式：
 *        'date'       -> 'YYYY-MM-DD'
 *        'time'       -> 'HH:mm:ss'
 *        'datetime'   -> 'YYYY-MM-DD HH:mm:ss'
 *        'iso'        -> ISO8601格式
 *        'relative'   -> 相对时间（如：3小时前）
 *   - 自定义格式：任意Day.js支持的格式字符串
 *        'YYYY/MM/DD' -> 2023/10/01
 *        'HH:mm'      -> 14:30
 * @param timezone 时区设置，例如：'Asia/Shanghai'（默认使用系统时区）
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
	date: Date | number | string | dayjs.Dayjs | undefined = undefined,
	format: string = 'datetime',
	timezone?: string,
): string => {
	// 处理空值（默认当前时间）
	const input = date ?? new Date();

	// 创建Day.js对象（应用时区）
	let d = dayjs(input);
	if (timezone) {
		d = d.tz(timezone);
	}

	// 检查日期有效性
	if (!d.isValid()) {
		throw new Error(`Invalid date: ${date}`);
	}

	// 处理预定义格式
	switch (format) {
		case 'date':
			return d.format('YYYY-MM-DD');
		case 'time':
			return d.format('HH:mm:ss');
		case 'datetime':
			return d.format('YYYY-MM-DD HH:mm:ss');
		case 'iso':
			return d.toISOString();
		case 'relative':
			return d.fromNow();
		default:
			return d.format(format);
	}
};
