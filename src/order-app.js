import OrderRepresentation from './output/order-representation';
import OrderItem from './output/order-item';
import DiscountItem from './output/discount-item';
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
    // 获取订单商品使用优惠劵的信息
    let goodsList =orderInfo.items.map(item => {
      let goodsDisconut = new GoodsDisconut(item.product, item.amount, orderInfo.discountCards);
      return goodsDisconut.getGoodsMessage();
    });
    //  构造订单详情和优惠详情的字符串 获取商品总金额和实际金额
    let orderItemList = [];
    let discountItemList = [];
    let totalPrice = 0;
    let discountPrice = 0;
    goodsList.forEach(item => {
      totalPrice = totalPrice + item.price;
      orderItemList.push(new OrderItem({productNo: item.productNo, productName: item.productName, price: item.price, amount: item.amount, subTotal:item.subTotal}));
      // 如果存在优惠，则构造优惠信息
      if(item.discount && item.discount > 0){
        discountPrice = discountPrice + item.discount;
        discountItemList.push(new DiscountItem({productNo: item.productNo, productName: item.productName,discount: -item.discount}));
      }
    });
    let payments = [{
      type: orderInfo.payments[0].type,
      amount: totalPrice - discountPrice
    }];
    
    
    return (new OrderRepresentation({data})).toString();
  }
}
