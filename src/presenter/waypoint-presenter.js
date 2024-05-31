import { render, replace, remove } from '../framework/render';
import { isEscapeKey } from '../utils/common.js';
import { isMinorUpdate } from '../utils/waypoint.js';
import { UserAction, UpdateType } from '../const.js';
import EditingPointView from '../view/editing-point-view.js';
import WaypointView from '../view/waypoint-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class WaypointPresenter {
  #waypointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #waypointComponent = null;
  #waypointEditComponent = null;

  #waypoint = null;
  #destinations = null;
  #offers = null;

  #mode = Mode.DEFAULT;

  constructor(waypointListContainer, onDataChange, onModeChange) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleDataChange = onDataChange;
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
      onFormClose: this.#handleFormClose,
      onFormDelete: this.#handleFormDelete,
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
      this.#handleFormClose();
      // this.#waypointEditComponent.resetElement(this.#waypoint);
      // this.#switchToDefaultMode();
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

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.UPDATE_WAYPOINT,
      isMinorUpdate(this.#waypoint, update) ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#switchToDefaultMode();
  };

  #handleFormReset = () => {
    console.log('Отмена изменений и закрытие формы');
  };

  #handleFormClose = () => {
    this.#waypointEditComponent.resetElement(this.#waypoint);
    this.#switchToDefaultMode();
  };

  #handleFormDelete = () => {
    this.#handleDataChange(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      this.#waypoint,
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_WAYPOINT,
      UpdateType.PATCH,
      {...this.#waypoint, isFavorite: !this.#waypoint.isFavorite},
    );
  };
}


