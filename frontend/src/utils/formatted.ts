export function FormattedPrice(price: number) {
  const totalPrice = price * 100;
  return totalPrice.toFixed(2);
}
