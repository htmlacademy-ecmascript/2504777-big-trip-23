import dayjs from 'dayjs';
import { DATE_FORMAT } from './const';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueNumberGenerator = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const usedNumbers = [];

  return () => {
    let currentNumber = 0;

    if (usedNumbers.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`); //eslint-disable-line
      return null;
    }

    do {
      currentNumber = getRandomInteger(min, max);
    } while (usedNumbers.includes(currentNumber));

    usedNumbers.push(currentNumber);
    return currentNumber;
  };
};

const generateId = createUniqueNumberGenerator();

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createArray = (arrayLength, constructorFunction) => Array.from({length: arrayLength}, constructorFunction);

const flipCoin = () => Math.random() > 0.5;

const humanizeWatpointDate = (date) => dayjs(date).format(DATE_FORMAT);

const getElementById = (id, bearer) => {
  for (const elem of bearer) {
    if (elem.id === id) {
      return elem;
    }
  }
};

export { getRandomInteger, generateId, getRandomArrayElement, createArray, flipCoin, humanizeWatpointDate, getElementById };