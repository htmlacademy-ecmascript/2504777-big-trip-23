import TripInfoView from '../view/trip-info-view';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { getRouteTrip } from '../utils/trip-info.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #waypointsModel = null;
  #tripInfoComponent = null;
  #routeTrip = null;
  #waypoints = [];
  #destinations = [];
  #offers = [];
  #tripDestinationList = [];


  constructor({tripInfoContainer, waypointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#waypoints = this.#waypointsModel.waypoints;
    this.#destinations = this.#waypointsModel.destinations;

    this.#tripDestinationList = this.#waypoints
      .map((waypoint) => this.#destinations.find((destination) => destination.id === waypoint.destination))
      .map((destination) => destination.name);

    this.#routeTrip = getRouteTrip(this.#tripDestinationList);

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(
      this.#routeTrip,
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
