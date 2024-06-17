import dayjs from 'dayjs';
import { getDuration } from './common';
import { SortType } from '../const';

const sortByDefault = (waypoints) => waypoints.toSorted((leftPoint, rightPoint) => dayjs(leftPoint.dateFrom).valueOf() - dayjs(rightPoint.dateFrom).valueOf());
const sortByTime = (waypoints) => waypoints.toSorted((leftPoint, rightPoint) => getDuration(rightPoint.dateFrom, rightPoint.dateTo) - getDuration(leftPoint.dateFrom, leftPoint.dateTo));
const sortByPrice = (waypoints) => waypoints.toSorted((leftPoint, rightPoint) => rightPoint.basePrice - leftPoint.basePrice);

const sortByCurrentType = (currentSortType, waypoints) => {
  switch(currentSortType) {
    case SortType.PRICE:
      return sortByPrice(waypoints);
    case SortType.TIME:
      return sortByTime(waypoints);
  }
  return sortByDefault(waypoints);
};

export { sortByCurrentType };

