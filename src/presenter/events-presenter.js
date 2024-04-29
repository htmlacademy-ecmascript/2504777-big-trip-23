import EventsListView from '../view/events-list-view';
import EditingPointView from '../view/editing-point-view';
import NewPointView from '../view/new-point-view';
import WaypointView from '../view/waypoint-view';
import { render, RenderPosition } from '../render';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();

  constructor(eventsContainer) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.eventsListComponent, this.eventsContainer);
    render(new EditingPointView(), this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewPointView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.eventsListComponent.getElement());
    }
  }
}
