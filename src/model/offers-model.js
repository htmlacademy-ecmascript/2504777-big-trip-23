import { mockOffers } from '../mock/offers.js';

export default class WaypointsModel {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }
}
