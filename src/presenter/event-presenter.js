import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EditingPointView from '../view/editing-point-view.js';
import NewPointView from '../view/new-point-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render, RenderPosition } from '../render.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({eventContainer, waypointsModel}) {
    this.eventContainer = eventContainer;
    this.waypointsModel = waypointsModel;
  }

  init() {
    this.eventWaypoints = [...this.waypointsModel.getWaypoints()];

    render(new SortingView(), this.eventContainer);
    render(this.eventListComponent, this.eventContainer);
    render(new EditingPointView(), this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewPointView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView({waypoint: this.eventWaypoints[i]}), this.eventListComponent.getElement());
    }
  }
}
