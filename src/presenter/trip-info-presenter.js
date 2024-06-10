import TripInfoView from '../view/trip-info-view';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { getRouteTrip, getTripCost } from '../utils/trip-info.js';

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
    this.#waypoints = this.#waypointsModel.waypoints;

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

  #handleModelEvent = () => {
    this.init();
  };
}
