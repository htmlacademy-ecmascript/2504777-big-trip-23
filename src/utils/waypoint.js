import dayjs from 'dayjs';
import { TimeAbbreviation, TimeUnit } from '../const';

const { MINUTES, HOURS, DAYS } = TimeAbbreviation;
const {MILLISECONDS_PER_SECOND, MINUTES_PER_HOUR, HOURS_PER_DAY} = TimeUnit;

const humanizeWaypointDate = (date, format) => dayjs(date).format(format);

const convertTime = (milliseconds) => {
  const seconds = milliseconds / MILLISECONDS_PER_SECOND;
  const minutes = Math.round(seconds / MINUTES_PER_HOUR);
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const days = Math.floor(hours / HOURS_PER_DAY);

  return {
    minutes,
    hours,
    days,
  };
};

const renderDuration = ({ minutes, hours, days }) => {
  if (minutes < MINUTES_PER_HOUR) {
    return `${String(minutes).padStart(2, '0')}${MINUTES}`;
  } else if (hours < HOURS_PER_DAY) {
    return `${String(hours).padStart(2, '0')}${HOURS} ${String(minutes % MINUTES_PER_HOUR).padStart(2, '0')}${MINUTES}`;
  } else {
    return `${String(days).padStart(2, '0')}${DAYS} ${String(hours % HOURS_PER_DAY).padStart(2, '0')}${HOURS} ${String(minutes % MINUTES_PER_HOUR).padStart(2, '0')}${MINUTES}`;
  }
};

const formatOfferTitle = (title) => {
  const replasedTitle = title.replace(/ /gi, '-');
  return replasedTitle.charAt(0).toLowerCase() + replasedTitle.slice(1);
};

const upFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB, 'm');

const isMinorUpdate = (data, updata) => !isDatesEqual(data.dateFrom, updata.dateFrom) || !isDatesEqual(data.dateTo, updata.dateTo) || data.basePrice !== updata.basePrice;

export { humanizeWaypointDate, convertTime, renderDuration, formatOfferTitle, upFirstLetter, isMinorUpdate };
