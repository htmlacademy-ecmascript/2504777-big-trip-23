import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EditingPointView from '../view/editing-point-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render, RenderPosition } from '../framework/render.js';

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
    render(new EditingPointView({waypoint: this.#eventWaypoints[0], destinations: this.#destinations, offers: this.#offers}), this.#eventListComponent.element, RenderPosition.AFTERBEGIN);

    for (let i = 1; i < this.#eventWaypoints.length; i++) {
      render(new WaypointView({waypoint: this.#eventWaypoints[i], destinations: this.#destinations, offers: this.#offers}), this.#eventListComponent.element);
    }
  }
}
