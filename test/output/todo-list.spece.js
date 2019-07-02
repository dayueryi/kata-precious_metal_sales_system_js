import { expect } from 'chai';
import {levelCount} from '../../src/output/utils';

describe('levelCount', () => {
    it('积分值增加，等级提升', async () => {
        const tempMember = '6630009999';
        const totalPrice = 3558;
        expect(levelCount(tempMember,totalPrice)).to.include({newMemberType: '白金卡', memberPoints: 54197});
    });
});