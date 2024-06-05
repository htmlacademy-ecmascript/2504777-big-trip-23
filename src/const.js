const TEXT_FISH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const PICTURE_SRC = 'https://loremflickr.com/248/152?random=';
const WAYPOINTS_COUNT = 6;
const TYPES_OF_WAYPOINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Podgorica', 'London', 'Istanbul', 'Saint Petersburg', 'Berlin', 'Belgrade', 'Rome', 'Kyiv', 'Sofia'];
const DATE_FROM_LIST = ['May 21, 2024 10:25:00', 'May 21, 2024 09:40:00', 'May 21, 2024 06:40:00', 'May 17, 2024 03:05:00', 'May 21, 2024 10:30:00'];
const DATE_TO_LIST = ['May 21, 2024 10:55:00', 'May 22, 2024 14:00:00', 'May 21, 2024 11:05:00', 'May 21, 2024 15:10:00', 'May 21, 2024 11:30:00'];

const NEW_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const DateFormat = {
  FULL: 'DD/MM/YY HH:mm',
  ATTRIBUTE_WITH_TIME: 'YYYY-MM-DD HH:mm',
  ATTRIBUTE_WITHOUT_TIME: 'YYYY-MM-DD',
  DAY: 'MMM DD',
  TIME: 'HH:mm',
  DATE_FOR_FLATPICKR: 'd/m/y H:i',
};

const TimeAbbreviation = {
  MINUTES: 'M',
  HOURS: 'H',
  DAYS: 'D',
};

const Prefix = {
  OFFER_ID: 'event-offer-',
  SORT_ID: 'sort-',
};

const ResetButtonValue = {
  DELETE: 'Delete',
  CANCEL: 'Cancel',
}

const descriptionFish = TEXT_FISH.split('.');

const offersToWaypoints = { // ? Явно именование не соответствует критериям, но не могу использовать капс из-за check-in
  'taxi': ['Switch to comfort', 'Switch to business'],
  'bus': ['Choose seats', 'Add luggage', 'Window seat'],
  'train': ['Transportation of animals', 'Add meal'],
  'ship': [],
  'drive': ['Off-road', 'With a driver', 'Unique auto', 'Van'],
  'flight': ['Switch to business', 'Add luggage', 'Add meal'],
  'check-in': ['Add breakfast'],
  'sightseeing': ['Book a ticket', 'Audio guide', 'Lunch in city'],
  'restaurant': [],
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const MessageOfListEmpty = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_WAYPOINT: 'UPDATE_WAYPOINT',
  ADD_WAYPOINT: 'ADD_WAYPOINT',
  DELETE_WAYPOINT: 'DELETE_WAYPOINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const Service = {
  END_POINT: 'https://23.objects.htmlacademy.pro/big-trip',
  AUTHORIZATION: 'Basic kdds45vdd79mh'
};

const EndUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export { descriptionFish, PICTURE_SRC, DESTINATIONS, TYPES_OF_WAYPOINT, offersToWaypoints, WAYPOINTS_COUNT, DATE_FROM_LIST, DATE_TO_LIST, DateFormat, TimeAbbreviation, NEW_POINT, FilterType, Prefix, SortType, UserAction, UpdateType, ResetButtonValue, MessageOfListEmpty, Method, Service, EndUrl };

