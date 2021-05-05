export function getSortedData(products, sortBy) {
  if (sortBy === "Price_Low_To_High")
    return [...products].sort((a, b) => a.markedprice - b.markedprice);
  if (sortBy === "Price_High_To_Low")
    return [...products].sort((a, b) => b.markedprice - a.markedprice);
  return products;
}
