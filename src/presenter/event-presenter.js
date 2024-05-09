import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EditingPointView from '../view/editing-point-view.js';
// import NewPointView from '../view/new-point-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render, RenderPosition } from '../render.js';
// import { NEW_POINT } from '../const.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({eventContainer, waypointsModel}) {
    this.eventContainer = eventContainer;
    this.waypointsModel = waypointsModel;
  }

  init() {
    this.eventWaypoints = [...this.waypointsModel.getWaypoints()];
    const destinations = [...this.waypointsModel.getDestinations()];
    // console.log(destinations);

    const offers = [...this.waypointsModel.getOffers()];

    render(new SortingView(), this.eventContainer);
    render(this.eventListComponent, this.eventContainer);
    render(new EditingPointView({waypoint: this.eventWaypoints[0], destinations, offers}), this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);
    // render(new EditingPointView({waypoint: NEW_POINT, destinations, offers}), this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);
    // render(new NewPointView({waypoint: this.eventWaypoints[1]}), this.eventListComponent.getElement());

    for (let i = 1; i < this.eventWaypoints.length; i++) {
      render(new WaypointView({waypoint: this.eventWaypoints[i], destinations, offers}), this.eventListComponent.getElement());
    }
  }
}
