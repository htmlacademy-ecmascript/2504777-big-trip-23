import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { getRouteTrip, getTripCost } from '../utils/trip-info.js';
import { sortByCurrentType } from '../utils/sort.js';
import { SortType } from '../const.js';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #waypointsModel = null;
  #tripInfoComponent = null;
  #routeTrip = null;
  #tripCost = null;
  #waypoints = [];

  constructor({tripInfoContainer, waypointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#waypoints = sortByCurrentType(SortType.DEFAULT, this.#waypointsModel.waypoints);
    this.#routeTrip = getRouteTrip(this.#waypoints, this.#waypointsModel.destinations);
    this.#tripCost = getTripCost(this.#waypoints, this.#waypointsModel.offers);

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(
      this.#routeTrip,
      this.#waypoints,
      this.#tripCost,
    );

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #destroy() {
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }

  #handleModelEvent = () => (this.#waypointsModel.waypoints.length === 0 || this.#waypointsModel.isUnavailableServer) ? this.#destroy() : this.init();
}
