import { generateId, getRandomInteger, getRandomArrayElement, flipCoin, createArray } from '../utils.js';
import { typesOfWaypoint } from '../const.js';
// import { getRandomDestination } from './destination.js';
// import { getOffersForWaypoint } from './offers.js';


// const getId = (element) => {
//   if (Array.isArray(element)) {
//     return element.map((value) => value.id);
//   } else {
//     return element.id;
//   }
// };

const createWaypoint = () => ({
  id: generateId(),
  type: getRandomArrayElement(typesOfWaypoint),
  basePrice: getRandomInteger(200, 1000),
  dateFrom: new Date('May 10, 2024 10:25:00'),
  dateTo: new Date('May 10, 2024 15:30:00'),
  destination: '',
  isFavorite: flipCoin(),
  offers: [],
});

const mockWaypoints = createArray(8, createWaypoint);

const getRandomWaypoint = () => getRandomArrayElement(mockWaypoints);

export { getRandomWaypoint };
