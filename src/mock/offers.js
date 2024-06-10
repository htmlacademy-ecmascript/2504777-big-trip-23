// import { TYPES_OF_WAYPOINT, offersToWaypoints } from '../const.js';
// import { generateId, getRandomInteger } from '../utils/common.js';

// const getOffers = () =>
//   TYPES_OF_WAYPOINT
//     .map((type) => ({
//       type,
//       offers: offersToWaypoints[type]
//         .map((offer) => ({
//           id: String(generateId()),
//           title: offer,
//           price: getRandomInteger(25, 125),
//         }))
//     }));

// const mockOffers = getOffers();
// // console.log(mockOffers);

// const getOffersForWaypoint = (waypoint) => {
//   for (const offer of mockOffers) {
//     if (offer.type === waypoint) {
//       return offer.offers;
//     }
//   }
// };

// export { mockOffers, getOffersForWaypoint };

