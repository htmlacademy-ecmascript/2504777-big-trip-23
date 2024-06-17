const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic kdds45vdd79mh';

const TYPES_OF_WAYPOINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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
  DATE_FOR_INFO: 'DD MMM',
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

const ButtonValue = {
  SAVE: 'Save',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
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
  UNAVAILABLE_SERVER: 'Failed to load latest route information',
  LOADING: 'Loading...',
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
  POST: 'POST',
  DELETE: 'DELETE',
};

const EndUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const TimeLimit = {
  LOWER_LIMIT: 0,
  UPPER_LIMIT: 1000,
};

const SeparatorType = {
  DASH: '&nbsp;&mdash;&nbsp;',
  ELLIPSIS: '&nbsp;&mdash;&nbsp;&#8230;&nbsp;&mdash;&nbsp;',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const TripInfoViewType = {
  COUNT_FOR_DASH_JOINT: 2,
  COUNT_FOR_ELIPSIS_JOINT: 4,
};

const TimeUnit = {
  MILLISECONDS_PER_SECOND: 1000,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
};

export { TYPES_OF_WAYPOINT, DateFormat, TimeAbbreviation, NEW_POINT, FilterType, Prefix, SortType, UserAction, UpdateType, ButtonValue, MessageOfListEmpty, Method, END_POINT, AUTHORIZATION, EndUrl, TimeLimit, SeparatorType, Mode, TripInfoViewType, TimeUnit };

