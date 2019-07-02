import OrderRepresentation from './output/order-representation';
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


    return (new OrderRepresentation({})).toString();
  }
}
