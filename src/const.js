const TEXT_FISH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const PICTURE_SRC = 'https://loremflickr.com/248/152?random=';
const WAYPOINTS_COUNT = 5;

const typesOfWaypoint = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restauran'];
const cities = ['Podgorica', 'London', 'Istanbul', 'Saint Petersburg', 'Berlin', 'Belgrade', 'Rome', 'Kyiv', 'Sofia'];

const descriptionFish = TEXT_FISH.split('.');

const offersToWaypoints = {
  'taxi': ['Upgrade to comfort', 'Upgrade to a business class'],
  'bus': ['Choose seats', 'Add luggage', 'Window seat'],
  'train': ['Transportation of animals', 'Add meal'],
  'ship': [],
  'drive': ['Off-road', 'With a driver', 'Unique auto', 'Van'],
  'flight': ['Upgrade to a business class', 'Add luggage', 'Add meal'],
  'check-in': ['Add breakfast'],
  'sightseeing': ['Book a ticket', 'Audio guide', 'Lunch in city'],
  'restauran': [],
};

export { descriptionFish, PICTURE_SRC, cities, typesOfWaypoint, offersToWaypoints, WAYPOINTS_COUNT};

