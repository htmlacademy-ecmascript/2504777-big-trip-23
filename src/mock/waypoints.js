import { generateId, getRandomInteger, getRandomArrayElement, flipCoin, createArray } from '../utils.js';
import { typesOfWaypoint, dateFromList, dateToList } from '../const.js';
import { getRandomDestination } from './destination.js';
import { getOffersForWaypoint } from './offers.js';

const getId = (element) => {
  if (Array.isArray(element)) {
    return element.map((value) => value.id);
  } else {
    return element.id;
  }
};

const createWaypoint = () => {
  const typeOfWaypoint = getRandomArrayElement(typesOfWaypoint);
  // console.log(typeOfWaypoint);
  const destinationOfWaypoint = getRandomDestination();
  // console.log(destinationOfWaypoint);
  const offersOfWaypoint = getOffersForWaypoint(typeOfWaypoint);
  // console.log(offersOfWaypoint);

  return {
    id: generateId(),
    type: typeOfWaypoint,
    basePrice: getRandomInteger(200, 1000),
    dateFrom: new Date(getRandomArrayElement(dateFromList)),
    dateTo: new Date(getRandomArrayElement(dateToList)),
    destination: getId(destinationOfWaypoint),
    isFavorite: flipCoin(),
    offers: getId(offersOfWaypoint),
  };
};

// const createWaypoint = () => ({
//   id: generateId(),
//   type: getRandomArrayElement(typesOfWaypoint),
//   basePrice: getRandomInteger(200, 1000),
//   dateFrom: new Date(getRandomArrayElement(dateFromList)),
//   dateTo: new Date(getRandomArrayElement(dateToList)),
//   destination: '',
//   isFavorite: flipCoin(),
//   offers: [],
// });

const mockWaypoints = createArray(8, createWaypoint);
// console.log(mockWaypoints);

const getRandomWaypoint = () => getRandomArrayElement(mockWaypoints);

export { getRandomWaypoint };
