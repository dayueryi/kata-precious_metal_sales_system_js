import OrderRepresentation from './output/order-representation';
import GoodsDisconut from './output/goods-discount';
import { rules, goods, mumberType, userInfo } from './../test/resources/commom.json';




export default class OrderApp {

  checkout(orderCommand) {
    // TODO: 请完成需求指定的功能
    // 获取用户
    let orderInfo = JSON.parse(orderCommand);
    let user = userInfo.find((item) => {
      return item.cardNumber === orderInfo.memberId;
    });
    // 获取订单商品
    let goodsList = orderCommand.items;
    // 获取订单使用优惠劵的信息
    goodsList.map(item => {
      let goodsDisconut = new GoodsDisconut();
      return goodsDisconut.getGoodsMessage(item.product, item.amount, orderCommand.discountCards);
    });

    return (new OrderRepresentation({})).toString();
  }
}
