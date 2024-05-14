import { render, replace, remove } from '../framework/render';
import { isEscapeKey } from '../utils.js';
import EditingPointView from '../view/editing-point-view.js';
import WaypointView from '../view/waypoint-view.js';

export default class WaypointPresenter {
  #waypointListContainer = null;
  #waypointComponent = null;
  #waypointEditComponent = null;
  #waypoint = null;

  #destinations = [];
  #offers = [];


  constructor(waypointListContainer) {
    this.#waypointListContainer = waypointListContainer;
  }

  init(waypoint, destinations, offers) {
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointView({
      waypoint: this.#waypoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });

    this.#waypointEditComponent = new EditingPointView({
      waypoint: this.#waypoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset,
    });

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointListContainer);
      return;
    }

    if (this.#waypointListContainer.contains(prevWaypointComponent.element)) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#waypointListContainer.contains(prevWaypointEditComponent.element)) {
      replace(this.#waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);

  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  #onDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };

  #switchToEditMode() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#onDocumentEscKeydown);
  }

  #switchToViewMode() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
  }

  #handleEditClick = () => {
    this.#switchToEditMode();
  };

  #handleFormSubmit = () => {
    this.#switchToViewMode();
  };

  #handleFormReset = () => {
    this.#switchToViewMode();
  };
}


