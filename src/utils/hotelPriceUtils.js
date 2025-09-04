// src/utils/hotelPriceUtils.js

export const calculateHotelPricing = (hotel, allHotel) => {
  // Calculate number of nights
  const checkIn = new Date(allHotel?.checkIn);
  const checkOut = new Date(allHotel?.checkOut);
  const firstRate = hotel?.rooms?.[0]?.rates?.[0];

  const nights =
    allHotel?.checkIn && allHotel?.checkOut
      ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 1;

  // Prices
  const totalPrice = Number(firstRate?.net) || 0;
  const perNightPrice = nights > 0 ? totalPrice / nights : totalPrice;

  return { nights, totalPrice, perNightPrice };
};
