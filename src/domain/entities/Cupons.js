class Cupons {
  constructor({ productId, discount, expirationDate }) {
    this.productid = productId;
    this.discount = discount;
    this.expirationdate = expirationDate;
  }
}

module.exports = Cupons;
