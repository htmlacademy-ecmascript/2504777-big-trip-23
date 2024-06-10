import { TripDestinationSeparator } from '../const.js';

const {DASH, ELLIPSIS} = TripDestinationSeparator;

const getRouteTrip = (tripDestinationList) => {
  if (tripDestinationList.length === 1 || tripDestinationList.length > 3) {
    return `${tripDestinationList[0]}${tripDestinationList.length === 1 ? DASH : ELLIPSIS}${tripDestinationList.at(-1)}`;
  }
  return tripDestinationList.join(DASH);
};

export { getRouteTrip };
