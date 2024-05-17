import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import ListEmptyView from '../view/list-empty-view.js';

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

    this.#renderEventsBoard();
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#eventWaypoints = this.#eventWaypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint, this.#destinations, this.#offers);
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.modeReset());
  };

  #renderWaypoint(waypoint, destination, offers) {
    const waypointPresenter = new WaypointPresenter(
      this.#eventListComponent.element,
      this.#handleWaypointChange,
      this.#handleModeChange,
    );
    waypointPresenter.init(waypoint, destination, offers);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #renderEventsBoard() {
    if (!this.#eventWaypoints.length) {
      render(new ListEmptyView(), this.#eventContainer);
      return;
    }

    render(new SortingView(), this.#eventContainer);
    render(this.#eventListComponent, this.#eventContainer);

    for (let i = 0; i < this.#eventWaypoints.length; i++) {
      this.#renderWaypoint(this.#eventWaypoints[i], this.#destinations, this.#offers);
    }
  }
}
