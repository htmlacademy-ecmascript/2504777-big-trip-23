import { mockDestinations } from '../mock/destination.js';

export default class WaypointsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

}
