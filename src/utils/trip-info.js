import { SeparatorType, TripInfoViewType } from '../const.js';

const {DASH, ELLIPSIS} = SeparatorType;
const {COUNT_FOR_DASH_JOINT, COUNT_FOR_ELIPSIS_JOINT} = TripInfoViewType;

const getRouteTrip = (waypoints, destinations) => {
  const tripDestinationList = waypoints
    .map((waypoint) => destinations.find((destination) => destination.id === waypoint.destination))
    .map((destination) => destination.name);

  const startPoint = tripDestinationList[0];
  const endPoint = tripDestinationList.at(-1);

  if (tripDestinationList.length <= COUNT_FOR_DASH_JOINT) {
    return `${startPoint}${DASH}${endPoint}`;
  }
  if (tripDestinationList.length >= COUNT_FOR_ELIPSIS_JOINT) {
    return `${startPoint}${ELLIPSIS}${endPoint}`;
  }

  return tripDestinationList.join(DASH);
};

const getOffersPriceSum = (selectedOffers, offers) => {
  const offersList = offers.map((offer) => offer.offers).flat();
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
  const selectedOffers = waypoints.map((waypoint) => waypoint.offers).flat();
  const offersPriceSum = selectedOffers.length ? getOffersPriceSum(selectedOffers, offers) : 0;
  return basePriceSum + offersPriceSum;
};

export { getRouteTrip, getTripCost };
