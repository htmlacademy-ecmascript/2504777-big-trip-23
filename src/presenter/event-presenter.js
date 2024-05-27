import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import ListEmptyView from '../view/list-empty-view.js';
import { sortByDefault, sortByPrice, sortByTime } from '../utils/sort.js';
import { SortType } from '../const.js';

export default class EventPresenter {
  #eventContainer = null;
  #waypointsModel = null;
  #sortsComponent = null;

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
    this.#eventWaypoints = sortByDefault([...this.#waypointsModel.waypoints]);
    this.#destinations = [...this.#waypointsModel.destinations];
    this.#offers = [...this.#waypointsModel.offers];

    this.#renderEventsBoard();
  }

  #renderWaypoint(waypoint, destination, offers) {
    const waypointPresenter = new WaypointPresenter(
      this.#eventListComponent.element,
      this.#handleWaypointChange,
      this.#handleModeChange,
    );
    waypointPresenter.init(waypoint, destination, offers);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #renderSorts() {
    this.#sortsComponent = new SortingView(this.#handleSortTypeChange);
    render(this.#sortsComponent, this.#eventContainer);
  }

  #renderWaypointsList() {
    render(this.#eventListComponent, this.#eventContainer);

    for (const eventWaypoints of this.#eventWaypoints) {
      this.#renderWaypoint(eventWaypoints, this.#destinations, this.#offers);
    }
  }

  #clearWaypointsList() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }

  #renderEventsBoard() {
    if (!this.#eventWaypoints.length) {
      render(new ListEmptyView(), this.#eventContainer);
      return;
    }

    this.#renderSorts();
    this.#renderWaypointsList();
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#eventWaypoints = this.#eventWaypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint, this.#destinations, this.#offers);
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.modeReset());
  };

  #handleSortTypeChange = (type) => {
    switch(type) {
      case SortType.PRICE:
        sortByPrice(this.#eventWaypoints);
        break;
      case SortType.TIME:
        sortByTime(this.#eventWaypoints);
        break;
      case SortType.DEFAULT:
        sortByDefault(this.#eventWaypoints);
        break;
    }
    this.#clearWaypointsList();
    this.#renderWaypointsList();
  };
}
