import { render, replace, remove } from '../framework/render';
import { isEscapeKey } from '../utils/common.js';
import EditingPointView from '../view/editing-point-view.js';
import WaypointView from '../view/waypoint-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class WaypointPresenter {
  #waypointListContainer = null;
  #handleWaypointChange = null;
  #handleModeChange = null;

  #waypointComponent = null;
  #waypointEditComponent = null;

  #waypoint = null;
  #destinations = null;
  #offers = null;

  #mode = Mode.DEFAULT;

  constructor(waypointListContainer, onWaypointChange, onModeChange) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleWaypointChange = onWaypointChange;
    this.#handleModeChange = onModeChange;
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
      onFavoriteClick: this.#handleFavoriteClick,
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);

  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  modeReset() {
    if (this.#mode !== 'DEFAULT') {
      this.#waypointEditComponent.resetElement(this.#waypoint);
      this.#switchToDefaultMode();
    }
  }

  #onDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#waypointEditComponent.resetElement(this.#waypoint);
      this.#switchToDefaultMode();
    }
  };

  #switchToEditingMode() {
    this.#handleModeChange();
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#onDocumentEscKeydown);
    this.#mode = Mode.EDITING;
  }

  #switchToDefaultMode() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#switchToEditingMode();
  };

  #handleFormSubmit = () => {
    this.#switchToDefaultMode();
  };

  #handleFormReset = () => {
    this.#waypointEditComponent.resetElement(this.#waypoint);
    this.#switchToDefaultMode();
  };

  #handleFavoriteClick = () => {
    this.#waypoint.isFavorite = !this.#waypoint.isFavorite;
    this.#handleWaypointChange(this.#waypoint);
  };
}

