import dayjs from 'dayjs';
import { TimeAbbreviations } from '../const';

const { MINUTES, HOURS, DAYS } = TimeAbbreviations;

const humanizeWaypointDate = (date, format) => dayjs(date).format(format);

const convertTime = (milliseconds) => {
  const seconds = milliseconds / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    minutes,
    hours,
    days,
  };
};

const renderDuration = ({ minutes, hours, days }) => {
  if (minutes < 60) {
    return `${String(minutes).padStart(2, '0')}${MINUTES}`;
  } else if (hours < 24) {
    return `${String(hours).padStart(2, '0')}${HOURS} ${String(minutes % 60).padStart(2, '0')}${MINUTES}`;
  } else {
    return `${String(days).padStart(2, '0')}${DAYS} ${String(hours % 24).padStart(2, '0')}${HOURS} ${String(minutes % 60).padStart(2, '0')}${MINUTES}`;
  }
};

const formatOfferTitle = (title) => {
  const replasedTitle = title.replace(/ /gi, '-');
  return replasedTitle.charAt(0).toLowerCase() + replasedTitle.slice(1);
};

const upFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export { humanizeWaypointDate, convertTime, renderDuration, formatOfferTitle, upFirstLetter };
