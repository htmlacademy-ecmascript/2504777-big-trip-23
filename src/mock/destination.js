import { getRandomInteger, generateId, getRandomArrayElement, createArray } from '../utils.js';
import { PICTURE_SRC, descriptionFish, cities } from '../const.js';

const getPictureSrc = () => `${PICTURE_SRC}${getRandomInteger(1, 100)}`;

const getDescription = (fishData) => {
  const description = [];
  const descriptionLength = getRandomInteger(1, 5);
  const usedSentences = [];
  let sentence;

  for (let i = 0; i < descriptionLength; i++) {
    do {
      sentence = getRandomArrayElement(fishData);
    } while (usedSentences.includes(sentence));

    description.push(sentence);
    usedSentences.push(sentence);
  }

  return description.join('. ');
};
// console.log(`getDescription: ${getDescription(descriptionFish)}`);

const createPicture = () => ({
  src: getPictureSrc(),
  description: getRandomArrayElement(descriptionFish),
});
// console.log(createPicture());

const getDestinationName = (usedName, names) => {
  let name;

  do {
    name = getRandomArrayElement(names)}
  while (usedName.includes(name));

  usedName.push(name);
  return name;
};

const createDestinationGenerator = () => {
  const usedDestinations = [];

  return () => ({
    id: generateId(),
    description: getDescription(descriptionFish),
    name: getDestinationName(usedDestinations, cities),
    pictures: createArray(getRandomInteger(0, 4), createPicture),
  });
};
// console.log(createDestination());

const generateDestination = createDestinationGenerator();

const mockDestinations = createArray(9, generateDestination);

const getRandomDestination = () => getRandomArrayElement(mockDestinations);

export { getRandomDestination };

// console.log(getDestinations());

