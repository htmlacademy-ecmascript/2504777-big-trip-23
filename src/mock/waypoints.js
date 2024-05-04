import { generateId, getRandomInteger, getRandomArrayElement, flipCoin, createArray } from '../utils.js';
import { TYPES_OF_WAYPOINT, DATE_FROM_LIST, DATE_TO_LIST } from '../const.js';
import { getRandomDestination } from './destination.js';
// import { getOffersForWaypoint } from './offers.js';

// const getId = (element) => {
//   if (Array.isArray(element)) {
//     return element.map((value) => value.id);
//   } else {
//     return element.id;
//   }
// };

// const createWaypoint = () => {
//   const typeOfWaypoint = getRandomArrayElement(TYPES_OF_WAYPOINT);
//   const destinationOfWaypoint = getRandomDestination();
//   const offersOfWaypoint = getOffersForWaypoint(typeOfWaypoint);

//   return {
//     id: generateId(),
//     type: typeOfWaypoint,
//     basePrice: getRandomInteger(200, 1000),
//     dateFrom: new Date(getRandomArrayElement(DATE_FROM_LIST)),
//     dateTo: new Date(getRandomArrayElement(DATE_TO_LIST)),
//     destination: getId(destinationOfWaypoint),
//     isFavorite: flipCoin(),
//     offers: getId(offersOfWaypoint),
//   };
// };

const createWaypoint = () => ({
  id: generateId(),
  type: getRandomArrayElement(TYPES_OF_WAYPOINT),
  basePrice: getRandomInteger(200, 1000),
  dateFrom: new Date(getRandomArrayElement(DATE_FROM_LIST)),
  dateTo: new Date(getRandomArrayElement(DATE_TO_LIST)),
  destination: getRandomDestination().id,
  isFavorite: flipCoin(),
  offers: [],
});

const mockWaypoints = createArray(8, createWaypoint);
// console.log(mockWaypoints);

const getRandomWaypoint = () => getRandomArrayElement(mockWaypoints);

export { getRandomWaypoint };
