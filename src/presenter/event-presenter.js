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

  #renderWaypoint(waypoint, destination, offers) {
    const waypointPresenter = new WaypointPresenter(
      this.#eventListComponent.element,
    );
    waypointPresenter.init(waypoint, destination, offers);
  }
}
