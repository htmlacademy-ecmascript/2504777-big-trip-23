import { generateId, getRandomInteger, getRandomArrayElement, flipCoin, createArray, getRandomNumberOfRandomElements } from '../utils.js';
import { TYPES_OF_WAYPOINT, DATE_FROM_LIST, DATE_TO_LIST } from '../const.js';
import { getRandomDestination } from './destination.js';
import { getOffersForWaypoint } from './offers.js';

const getOffersId = (list) => list.map((offer) => offer.id);

const createWaypoint = () => {
  const typeOfWaypoint = getRandomArrayElement(TYPES_OF_WAYPOINT);
  const offersOfWaypoint = getOffersForWaypoint(typeOfWaypoint);
  const offersIdList = getOffersId(offersOfWaypoint);

  return {
    id: generateId(),
    type: typeOfWaypoint,
    basePrice: getRandomInteger(200, 1000),
    dateFrom: new Date(getRandomArrayElement(DATE_FROM_LIST)),
    dateTo: new Date(getRandomArrayElement(DATE_TO_LIST)),
    destination: getRandomDestination().id,
    isFavorite: flipCoin(),
    offers: getRandomNumberOfRandomElements(offersIdList, 0, 2),
  };
};

const mockWaypoints = createArray(8, createWaypoint);

const getRandomWaypoint = () => getRandomArrayElement(mockWaypoints);

export { getRandomWaypoint };
