import { expect } from 'chai';
import GoodsDisconut from '../../src/output/goods-discount';

describe('OrderRepresentation', () => {
  it('满减商品找到正确优惠金额', async () => {
    let goods = {
      productNo: '002003',
      amount: 2
    };
    let productInfo = new GoodsDisconut(goods.productNo, goods.amount).getGoodsMessage();
    expect(productInfo).to.include({discount: 10});
  });

  it('满减商品和打折商品找到正确优惠金额', async () => {
    let goods = {
      productNo: '002003',
      amount: 5
    };
    let productInfo = new GoodsDisconut(goods.productNo, goods.amount,['9折券']).getGoodsMessage();
    expect(productInfo).to.include({discount: 350});
  });
});