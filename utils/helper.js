export const getDiscountValue = (discountedPrice, originalPrice) => {
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return discount.toFixed(1);
};
