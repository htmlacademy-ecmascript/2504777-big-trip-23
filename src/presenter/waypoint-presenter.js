import { render, replace, remove } from '../framework/render';
import { isEscapeKey } from '../utils/common.js';
import { isMinorUpdate } from '../utils/waypoint.js';
import { UserAction, UpdateType, Mode } from '../const.js';
import EditingPointView from '../view/editing-point-view.js';
import WaypointView from '../view/waypoint-view.js';

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

  constructor({waypointListContainer, onDataChange, onModeChange}) {
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
    });

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponent, prevWaypointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);

  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#documentEscKeydownHandler);
  }

  modeReset() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#waypointEditComponent.reset(this.#waypoint);
      this.#switchToDefaultMode();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#waypointEditComponent.updateElement({
        isSaving: true,
        isDisabled: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#waypointEditComponent.updateElement({
        isDeleting: true,
        isDisabled: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointComponent.shake();
      return;
    }

    const resetFormState = () => {
      if (this.#waypointEditComponent.isExisted) {
        this.#waypointEditComponent.updateElement({
          isSaving: false,
          isDeleting: false,
          isDisabled: false,
        });
      }
    };

    this.#waypointEditComponent.shake(resetFormState);
  }

  #switchToEditingMode() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#documentEscKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchToDefaultMode() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#documentEscKeydownHandler);
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
  };

  #handleFormReset = () => {
    this.#handleDataChange(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      this.#waypoint,
    );
  };

  #handleFormClose = () => {
    this.#waypointEditComponent.reset(this.#waypoint);
    this.#switchToDefaultMode();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_WAYPOINT,
      UpdateType.PATCH,
      {...this.#waypoint, isFavorite: !this.#waypoint.isFavorite},
    );
  };

  #documentEscKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#handleFormClose();
    }
  };
}


