import { mockWaypoints } from '../mock/waypoints.js';
import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class WaypointsModel extends Observable {
  #waypoints = mockWaypoints;
  #destinations = mockDestinations;
  #offers = mockOffers;

  get waypoints() {
    return this.#waypoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
