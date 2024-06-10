import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getDuration = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom));

export { isEscapeKey, getDuration };
