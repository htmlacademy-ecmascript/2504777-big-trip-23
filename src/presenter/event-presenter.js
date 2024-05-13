import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EditingPointView from '../view/editing-point-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils.js';

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

  #renderWaypoint(waypoint, destinations, offers) {

    const onDocumentEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        switchToViewMode();
      }
    };

    const waypointComponent = new WaypointView({
      waypoint,
      destinations,
      offers,
      onEditClick() {
        switchToEditMode();
      }
    });

    const waypointEditComponent = new EditingPointView({
      waypoint,
      destinations,
      offers,
      onFormSubmit() {
        switchToViewMode();
      },
      onFormReset() {
        switchToViewMode();
      }

    });

    function switchToEditMode() {
      replace(waypointEditComponent, waypointComponent);
      document.addEventListener('keydown', onDocumentEscKeydown);
    }

    function switchToViewMode() {
      replace(waypointComponent, waypointEditComponent);
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }

    render(waypointComponent, this.#eventListComponent.element);
  }
}
