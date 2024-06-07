// import { mockWaypoints } from '../mock/waypoints.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
// import { mockDestinations } from '../mock/destination.js';
// import { mockOffers } from '../mock/offers.js';

export default class WaypointsModel extends Observable {
  #waypoints = [];
  #destinations = [];
  #offers = [];
  #eventsApiService = null;
  isUnavailableServer = false;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get waypoints() {
    return this.#waypoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const waypoints = await this.#eventsApiService.waypoints;
      this.#waypoints = waypoints.map(this.#adaptToClient);
      this.#destinations = await this.#eventsApiService.destinations;
      this.#offers = await this.#eventsApiService.offers;
    } catch(err) {
      this.#waypoints = [];
      this.#destinations = [];
      this.#offers = [];
      this.isUnavailableServer = true;
    }

    this._notify(UpdateType.INIT);
  }

  async updateWaypoint(updateType, update) {
    if (!this.#waypoints.find((waypoint) => waypoint.id === update.id)) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    try {
      const response = await this.#eventsApiService.updateWaypoint(update);
      const updatedWaypoint = this.#adaptToClient(response);
      this.#waypoints = this.#waypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);
      this._notify(updateType, updatedWaypoint);
    } catch(err) {
      throw new Error('Can\'t update waypoint');
    }
  }

  async addWaypoint(updateType, update) {
    try {
      const response = await this.#eventsApiService.addWaypoint(update);
      const addedWaypoint = this.#adaptToClient(response);
      this.#waypoints = this.#waypoints.concat(addedWaypoint);
      this._notify(updateType, addedWaypoint);
    } catch(err) {
      throw new Error('Can\'t add waypoint');
    }
  }

  async deleteWaypoint(updateType, update) {
    if (!this.#waypoints.find((waypoint) => waypoint.id === update.id)) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    try {
      await this.#eventsApiService.deleteWaypoint(update);
      this.#waypoints = this.#waypoints.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete waypoint');
    }
  }

  #adaptToClient(waypoint) {
    const adaptedWaypoint = {...waypoint,
      basePrice: waypoint['base_price'],
      dateFrom: waypoint['date_from'] !== null ? new Date(waypoint['date_from']) : waypoint['date_from'],
      dateTo: waypoint['date_to'] !== null ? new Date(waypoint['date_to']) : waypoint['date_to'],
      isFavorite: waypoint['is_favorite'],
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];

    return adaptedWaypoint;
  }
}
