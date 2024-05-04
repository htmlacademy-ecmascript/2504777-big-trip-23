import { createArray } from '../utils.js';
import { WAYPOINTS_COUNT } from '../const.js';
import { getRandomWaypoint } from '../mock/waypoints.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class WaypointsModel {
  waypoints = createArray(WAYPOINTS_COUNT, getRandomWaypoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getWaypoints() {
    return this.waypoints;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

}
