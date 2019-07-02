import fs from 'fs';
import { promisify } from 'util';
import {userInfo, mumberType} from '../../test/resources/commom.json';

// 格式化日期
export const formatDate = (date, formatStr) => {
  if (!date) return formatStr;
	let str = formatStr;
	const weeks = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, date.getFullYear());
	str = str.replace(/yy|YY/, (date.getYear() % 100).toString().padStart(2, '0'));
	str = str.replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'));
	str = str.replace(/M/g, (date.getMonth() + 1));
	str = str.replace(/w|W/g, weeks[date.getDay()]);
	str = str.replace(/dd|DD/, date.getDate().toString().padStart(2, '0'));
	str = str.replace(/d|D/g, date.getDate());
	str = str.replace(/hh|HH/, date.getHours().toString().padStart(2, '0'));
	str = str.replace(/h|H/g, date.getHours());
	str = str.replace(/mm/, date.getMinutes().toString().padStart(2, '0'));
	str = str.replace(/m/g, date.getMinutes());
	str = str.replace(/ss|SS/, date.getSeconds().toString().padStart(2, '0'));
	str = str.replace(/s|S/g, date.getSeconds());
	return str;
};

export const readFile = promisify(fs.readFile);

// 设置积分、等级返回值
let pointParam;
// 获取用户当前卡等级
export const levelCount = (memberId, totalPrice) => {
	pointParam = {
		oldMemberType: '',
		newMemberType: '',
		memberPointsIncreased: '',
		memberPoints: ''
	};
	userInfo.forEach((user) => {
		if (user.cardNumber === memberId) {
			const levelId = user.level;
			pointParam.oldMemberType = levelId; // 会员等级
			return resetPoint(levelId, totalPrice, user.memberPoint);
		}
	});
};

// 计算增值积分
const resetPoint = (levelId, totalPrice, memberPoint) => {
	mumberType.forEach((memberCard) => {
		if (memberCard.id === levelId) {
			const newBasePoint = memberCard.basePoint * totalPrice;
			pointParam.memberPointsIncreased = newBasePoint; // 本次消费积分
			pointParam.memberPoints = memberPoint += newBasePoint; // 最新积分
			return resetCardLevel(pointParam.memberPoints, memberCard, memberPoint);
		}
	});
};
// 重置等级
const resetCardLevel = (newMemberPoints) => {
	mumberType.forEach((memberLevel) => {
		if (memberLevel.maxPont) {
			if (newMemberPoints >= memberLevel.minPoint & newMemberPoints < memberLevel.maxPont) {
				pointParam.newMemberType = memberLevel.name; // 用户最近等级
				return pointParam;
			} else {
				pointParam.newMemberType = mumberType[mumberType.length - 1].name; // 用户最新等级
				return pointParam;
			}
		}
	});
};