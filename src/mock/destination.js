import { getRandomInteger, generateId, getRandomArrayElement, createArray, getElementById } from '../utils.js';
import { PICTURE_SRC, descriptionFish, DESTINATIONS } from '../const.js';

const getPictureSrc = () => `${PICTURE_SRC}${getRandomInteger(1, 100)}`;

const createPicture = () => ({
  src: getPictureSrc(),
  description: getRandomArrayElement(descriptionFish),
});

const getDescription = (fishData) => {
  const description = [];
  const descriptionLength = getRandomInteger(0, 5);
  const usedSentences = [];
  let sentence;

  if (descriptionLength === 0) {
    return '';
  }

  for (let i = 0; i < descriptionLength; i++) {
    do {
      sentence = getRandomArrayElement(fishData);
    } while (usedSentences.includes(sentence));

    description.push(sentence);
    usedSentences.push(sentence);
  }

  return description.join('. ');
};

const createDestination = (destination) => ({
  id: generateId(),
  description: getDescription(descriptionFish),
  name: destination,
  pictures: createArray(getRandomInteger(0, 5), createPicture),
});

const getDestinations = () => DESTINATIONS.map((destination) => createDestination(destination));

const mockDestinations = getDestinations();

// console.log(mockDestinations);

const getRandomDestination = () => getRandomArrayElement(mockDestinations);

const getDestinationById = (id) => getElementById(id, mockDestinations);

export { getRandomDestination, getDestinationById };

