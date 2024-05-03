const TEXT_FISH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const PICTURE_SRC = 'https://loremflickr.com/248/152?random=';
const WAYPOINTS_COUNT = 5;
// const DateFormat = {
//   FULL: 'DD/MM/YY HH:mm',
//   DAY: 'MMM DD',
//   TIME: 'HH:mm',
// };
const DATE_FORMAT = 'DD/MM/YY HH:mm';

const TYPES_OF_WAYPOINT = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Podgorica', 'London', 'Istanbul', 'Saint Petersburg', 'Berlin', 'Belgrade', 'Rome', 'Kyiv', 'Sofia'];
const DATE_FROM_LIST = ['May 10, 2024 10:25:00', 'May 9, 2024 12:00:00', 'May 10, 2024 18:40:00', 'May 10, 2024 03:05:00', 'May 10, 2024 10:25:00'];
const DATE_TO_LIST = ['May 10, 2024 19:25:00', 'May 11, 2024 02:00:00', 'May 10, 2024 23:40:00', 'May 11, 2024 6:10:00', 'May 10, 2024 20:55:00'];

const descriptionFish = TEXT_FISH.split('.');

const offersToWaypoints = { // ? Явно именование не соответствует критериям, но не могу использовать капс из-за check-in
  'taxi': ['Upgrade to comfort', 'Upgrade to a business class'],
  'bus': ['Choose seats', 'Add luggage', 'Window seat'],
  'train': ['Transportation of animals', 'Add meal'],
  'ship': [],
  'drive': ['Off-road', 'With a driver', 'Unique auto', 'Van'],
  'flight': ['Upgrade to a business class', 'Add luggage', 'Add meal'],
  'check-in': ['Add breakfast'],
  'sightseeing': ['Book a ticket', 'Audio guide', 'Lunch in city'],
  'restaurant': [],
};

export { descriptionFish, PICTURE_SRC, DESTINATIONS, TYPES_OF_WAYPOINT, offersToWaypoints, WAYPOINTS_COUNT, DATE_FROM_LIST, DATE_TO_LIST, DATE_FORMAT };

