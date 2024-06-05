// import { mockWaypoints } from '../mock/waypoints.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class WaypointsModel extends Observable {
  #waypoints = [];
  #destinations = mockDestinations;
  #offers = mockOffers;
  #eventsApiService = null;

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
    } catch(err) {
      this.#waypoints = [];
    }

    try {
      const destinations = await this.#eventsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }

    try {
      const offers = await this.#eventsApiService.offers;
      this.#offers = offers.map(this.#adaptToClient);
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateWaypoint(updateType, updatedWaypoint) {
    if (!this.#waypoints.find((waypoint) => waypoint.id === updatedWaypoint.id)) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    this.#waypoints = this.#waypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);

    this._notify(updateType, updatedWaypoint);
  }

  addWaypoint(updateType, waypointToAdd) {
    this.#waypoints = this.#waypoints.concat(waypointToAdd);

    this._notify(updateType, waypointToAdd);
  }

  deleteWaypoint(updateType, waypointToDelete) {
    if (!this.#waypoints.find((waypoint) => waypoint.id === waypointToDelete.id)) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    this.#waypoints = this.#waypoints.filter((point) => point.id !== waypointToDelete.id);

    this._notify(updateType);
  }

  #adaptToClient(waypoint) {
    const adaptedWaypoint = {...waypoint,
      basePrice: waypoint['base_price'],
      dateFrom: new Date(waypoint['date_from']),
      dateTo: new Date(waypoint['date_to']),
      isFavorite: waypoint['is_favorite'],
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];

    return adaptedWaypoint;
  }
}
