import { SeparatorType } from '../const.js';

const {DASH, ELLIPSIS} = SeparatorType;

const getRouteTrip = (waypoints, destinations) => {
  const tripDestinationList = waypoints
    .map((waypoint) => destinations.find((destination) => destination.id === waypoint.destination))
    .map((destination) => destination.name);

  if (tripDestinationList.length === 1 || tripDestinationList.length > 3) {
    return `${tripDestinationList[0]}${tripDestinationList.length === 1 ? DASH : ELLIPSIS}${tripDestinationList.at(-1)}`;
  }
  return tripDestinationList.join(DASH);
};

const getOffersPriceSum = (waypoints, offers) => {
  const offersList = offers.map((offer) => offer.offers).flat();
  const selectedOffers = waypoints.map((waypoint) => waypoint.offers).flat();
  return selectedOffers
    .map((currentOffer) => offersList.find((offer) => offer.id === currentOffer))
    .map((offer) => offer.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
};

const getTripCost = (waypoints, offers) => {
  const basePriceSum = waypoints.reduce(
    (accumulator, currentValue) => accumulator + currentValue.basePrice,
    0,
  );
  const offersPriceSum = getOffersPriceSum(waypoints, offers);
  return basePriceSum + offersPriceSum;
}

export { getRouteTrip, getTripCost };
