// import { getRandomInteger, generateId, getRandomArrayElement, createArray, getRandomNumberOfRandomElements } from '../utils/common.js';
// import { PICTURE_SRC, descriptionFish, DESTINATIONS } from '../const.js';

// const getPictureSrc = () => `${PICTURE_SRC}${getRandomInteger(1, 100)}`;

// const createPicture = () => ({
//   src: getPictureSrc(),
//   description: getRandomArrayElement(descriptionFish),
// });

// const createDestination = (destination) => ({
//   id: generateId(),
//   description: getRandomNumberOfRandomElements(descriptionFish, 0, 5).join('. '),
//   name: destination,
//   pictures: createArray(getRandomInteger(0, 5), createPicture),
// });

// const getDestinations = () => DESTINATIONS.map((destination) => createDestination(destination));

// const mockDestinations = getDestinations();

// // console.log(mockDestinations);


// const getRandomDestination = () => getRandomArrayElement(mockDestinations);

// // const getDestinationById = (id) => getElementById(id, mockDestinations);

// export { getRandomDestination, mockDestinations };

