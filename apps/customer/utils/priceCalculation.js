const calculatePrice = (area) => {
  if (area > 3000) {
    let price = 350 + (area - 3000) * 0.11;
    return Math.round(price * 100) / 100;
  } else if (area > 90) {
    return 350;
  } else if (area < 90) {
    return 250;
  }
};

export default calculatePrice;
