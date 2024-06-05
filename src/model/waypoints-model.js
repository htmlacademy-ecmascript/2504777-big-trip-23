import { mockWaypoints } from '../mock/waypoints.js';
import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class WaypointsModel extends Observable {
  #waypoints = mockWaypoints;
  #destinations = mockDestinations;
  #offers = mockOffers;
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.waypoints.then((waypoints) => {
      console.log(waypoints);
    });
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
}
