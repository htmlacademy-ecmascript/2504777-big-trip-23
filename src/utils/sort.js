import dayjs from 'dayjs';
import { getDuration } from './common';

const sortByDefault = (waypoints) => waypoints.toSorted((a, b) => dayjs(a.dateFrom).valueOf() - dayjs(b.dateFrom).valueOf());
const sortByTime = (waypoints) => waypoints.toSorted((a, b) => getDuration(b.dateFrom, b.dateTo) - getDuration(a.dateFrom, a.dateTo));
const sortByPrice = (waypoints) => waypoints.toSorted((a, b) => b.basePrice - a.basePrice);

export { sortByDefault, sortByTime, sortByPrice };

