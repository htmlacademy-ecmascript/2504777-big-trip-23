import dayjs from 'dayjs';
import { getDuration } from './common';
import { SortType } from '../const';

const sortByDefault = (waypoints) => waypoints.toSorted((a, b) => dayjs(a.dateFrom).valueOf() - dayjs(b.dateFrom).valueOf());
const sortByTime = (waypoints) => waypoints.toSorted((a, b) => getDuration(b.dateFrom, b.dateTo) - getDuration(a.dateFrom, a.dateTo));
const sortByPrice = (waypoints) => waypoints.toSorted((a, b) => b.basePrice - a.basePrice);

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

