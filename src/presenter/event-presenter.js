import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';

export default class EventPresenter {
  #eventContainer = null;
  #waypointsModel = null;

  #eventListComponent = new EventListView();

  #eventWaypoints = [];
  #destinations = [];
  #offers = [];

  #waypointPresenters = new Map();

  constructor({eventContainer, waypointsModel}) {
    this.#eventContainer = eventContainer;
    this.#waypointsModel = waypointsModel;
  }

  init() {
    this.#eventWaypoints = [...this.#waypointsModel.waypoints];
    this.#destinations = [...this.#waypointsModel.destinations];
    this.#offers = [...this.#waypointsModel.offers];

    render(new SortingView(), this.#eventContainer);
    render(this.#eventListComponent, this.#eventContainer);

    for (let i = 0; i < this.#eventWaypoints.length; i++) {
      this.#renderWaypoint(this.#eventWaypoints[i], this.#destinations, this.#offers);
    }
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#eventWaypoints = this.#eventWaypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint, this.#destinations, this.#offers);
  };

  #renderWaypoint(waypoint, destination, offers) {
    const waypointPresenter = new WaypointPresenter(
      this.#eventListComponent.element,
      this.#handleWaypointChange,
    );
    waypointPresenter.init(waypoint, destination, offers);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

}
