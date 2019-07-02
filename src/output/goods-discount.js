import { rules,goods } from './../../test/resources/commom.json'

export default class GoodsDisconut {
  /**
   * 计算商品优惠的最大值
   */
  constructor(productNo, amount, discountCards) {
    this.product = goods.find(item => {
      return item.productNo === productNo;
      });
    this.amount = amount;
    this.product.subTotal = this.product.price * amount;
    this.discountCards = discountCards;
    this.priceList = [];
  }

  getGoodsMessage(){
    if(!this.product.rules || this.product.rules.length === 0){
      this.product.discount = 0;
    } else {
      this.product.rules.forEach(item => {
        let kind = rules[item].kind;
        this['discountKind' + kind](rules[item]);
      });
      // 取最大优惠值
      if(this.priceList.length > 0){
        let maxDiscountPrice = Math.max.apply(null, this.priceList) || 0;
        this.product.discount = maxDiscountPrice;
      } else {
        this.product.discount = 0;
      }
    }
    return {
      productNo: this.product.productNo,
      productName: this.product.productName,
      discount: this.product.discount,
      price: this.product.price.toFixed(2),
      subTotal: this.product.subTotal.toFixed(2),
      amount: this.amount
    };
  }
  discountKind0(rule){
    // 判断打折的优惠金额
    // 如果使用了对应的打折卷
    if(this.discountCards.includes(rule.desc)){
      let discountPrice = this.product.subTotal - this.product.subTotal * rule.discount;
      this.priceList.push(discountPrice);
    }
  }
  discountKind1(rule){
    // 判断第n件x折
    if(this.amount >= rule.needAmount){
      let discountNum = Math.floor(this.amount / rule.needAmount);
      let discountPrice = this.product.price *(1 - this.rule.discount) * discountNum;
      this.priceList.push(discountPrice);
    }
  }
  discountKind2(rule){
    // 判断满减的优惠金额
    if(this.product.subTotal >= rule.needPrice){
      let discountNum = Math.floor(this.product.subTotal / rule.needPrice);
      let discountPrice = rule.discount * discountNum;
      this.priceList.push(discountPrice);
    }
    
  }
  discountKind3(rule){
    // 判断打折的优惠金额
    if(this.amount >= rule.needAmount){
      let discountNum = Math.floor(this.amount / rule.needAmount);
      let discountPrice = discountNum * this.product.price;
      this.priceList.push(discountPrice);
    }
  }
}