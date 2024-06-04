import { render, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey, generateId } from '../utils/common.js';
import { UserAction, UpdateType } from '../const.js';
import EditingPointView from '../view/editing-point-view.js';

export default class NewPointPresenter {
  #waypointListContainer = null;
  #waypointEditComponent = null;
  #handleDataChange = null;
  #handleNewPointClose = null;

  #destinations = [];
  #offers = [];

  constructor({waypointListContainer, onDataChange, onNewPointClose}) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleNewPointClose = onNewPointClose;
  }

  init(destinations, offers) {

    this.#destinations = destinations;
    this.#offers = offers;

    this.#waypointEditComponent = new EditingPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset,
      onFormClose: this.#handleFormClose,
    });

    render(this.#waypointEditComponent, this.#waypointListContainer.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onDocumentEscKeydown);
  }

  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }
    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
    this.#handleNewPointClose();
  }

  #onDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#handleFormClose();
    }
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      {id: generateId(), ...update},
    );
    this.destroy();
  };

  #handleFormReset = () => {
    this.destroy();
  };

  #handleFormClose = () => {
    this.destroy();
  };
}


