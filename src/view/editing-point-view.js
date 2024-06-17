import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { TYPES_OF_WAYPOINT, DateFormat, NEW_POINT, Prefix, ButtonValue } from '../const.js';
import { humanizeWaypointDate, formatOfferTitle, upFirstLetter } from '../utils/waypoint.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createEditingPointTemplate = (waypoint, destinations, offers) => {
  const { type, dateFrom, dateTo, basePrice, isDeleting, isDisabled, isSaving} = waypoint;
  const currentDestination = destinations.find((destination) => destination.id === waypoint.destination);
  const offersForWaypoint = offers.find((pointOffers) => pointOffers.type === waypoint.type).offers;
  const waypointId = waypoint.id || 0;

  const getResetButtonValue = () => {
    if (waypointId) {
      if (isDeleting) {
        return ButtonValue.DELETING;
      }
      return ButtonValue.DELETE;
    }
    return ButtonValue.CANCEL;
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
           <label class="event__type  event__type-btn" for="event-type-toggle-${waypointId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${waypointId}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${TYPES_OF_WAYPOINT.map((eventType) => `
                <div class="event__type-item">
                  <input id="event-type-${eventType}-${waypointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${waypointId}">${upFirstLetter(eventType)}</label>
                </div>`).join('')}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${waypointId}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${waypointId}" type="text" name="event-destination" value="${currentDestination ? he.encode(currentDestination.name) : ''}" list="destination-list-${waypointId}" ${isDisabled ? 'disabled' : ''} required>
            <datalist id="destination-list-${waypointId}">

              ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}

            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${waypointId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${waypointId}" type="text" name="event-start-time" value="${dateFrom ? humanizeWaypointDate(dateFrom, DateFormat.FULL) : ''}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${waypointId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${waypointId}" type="text" name="event-end-time" value="${dateTo ? humanizeWaypointDate(dateTo, DateFormat.FULL) : ''}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${waypointId}">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${waypointId}" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? ButtonValue.SAVING : ButtonValue.SAVE}</button>
          <button class="event__reset-btn" type="reset">${getResetButtonValue()}</button>
          ${waypointId ? `
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` : '' }
        </header>

        ${((!currentDestination || (!currentDestination.description && !currentDestination.pictures.length)) && !offersForWaypoint.length) ? '' : `
        <section class="event__details">

          ${offersForWaypoint.length ? `
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">

                ${offersForWaypoint.map((offer) => `
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="${Prefix.OFFER_ID}${offer.id}-${waypointId}" type="checkbox" name="event-offer-${formatOfferTitle(offer.title)}" ${waypoint.offers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                      <label class="event__offer-label" for="${Prefix.OFFER_ID}${offer.id}-${waypointId}">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                  </div>`).join('')}

              </div>
            </section>
          ` : ''}

          ${!currentDestination || (!currentDestination.description && !currentDestination.pictures.length) ? '' : `
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>

              ${currentDestination.description ? `
				  <p class="event__destination-description">${currentDestination.description}</p>
				  ` : ''}

              ${currentDestination.pictures.length ? `
              <div class="event__photos-container">
                <div class="event__photos-tape">

                  ${currentDestination.pictures.map((photo) => `<img class="event__photo" src=${photo.src} alt="${photo.description}"></img>`).join('')}

                </div>
              </div>
              ` : ''}

            </section>`}

        </section>`}

      </form>
    </li>`
  );
};

export default class EditingPointView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];

  #handleFormSubmit = null;
  #handleFormReset = null;
  #handleFormClose = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  #editForm = null;
  #inputDestination = null;
  #offersSection = null;
  #rollupButton = null;

  constructor({waypoint = NEW_POINT, destinations, offers, onFormSubmit, onFormReset, onFormClose}) {
    super();
    this._setState(EditingPointView.parseWaypointToState(waypoint));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this.#handleFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEditingPointTemplate(this._state, this.#destinations, this.#offers);
  }

  get isExisted() {
    return Boolean(this.element.parentElement);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(waypoint) {
    this.updateElement(
      EditingPointView.parseWaypointToState(waypoint),
    );
  }

  _restoreHandlers() {
    this.#editForm = this.element.querySelector('.event--edit');
    this.#inputDestination = this.element.querySelector('.event__input--destination');
    this.#offersSection = this.element.querySelector('.event__section--offers');
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');

    this.#editForm
      .addEventListener('submit', this.#formSubmitHandler);
    this.#editForm
      .addEventListener('reset', this.#formResetHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.#inputDestination
      .addEventListener('input', this.#eventDestinationChangeHandler);
    this.#inputDestination
      .addEventListener('blur', this.#eventDestinationBlurHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#eventPriceChangeHandler);

    if (this.#rollupButton) {
      this.#rollupButton.addEventListener('click', this.#formClosureHandler);
    }

    if (this.#offersSection) {
      this.#offersSection
        .addEventListener('change', this.#eventOfferChangeHandler);
    }

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  #setDateFromPicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: DateFormat.DATE_FOR_FLATPICKR,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#eventDateFromChangeHandler,
      }
    );
  }

  #setDateToPicker() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: DateFormat.DATE_FOR_FLATPICKR,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#eventDateToChangeHandler,
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditingPointView.parseStateToWaypoint(this._state));
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset();
  };

  #formClosureHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventDestinationChangeHandler = (evt) => {
    const usersDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (usersDestination) {
      this.updateElement({destination: usersDestination.id});
    }
  };

  #eventDestinationBlurHandler = (evt) => {
    const usersDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (!usersDestination) {
      const currentDestination = this.#destinations.find((destination) => destination.id === this._state.destination);
      evt.target.value = currentDestination ? currentDestination.name : '';
    }
  };

  #eventOfferChangeHandler = (evt) => {
    const waypointId = this._state.id || 0;
    const offerId = evt.target.id.replace(Prefix.OFFER_ID, '').replace(`-${waypointId}`, '');
    const chooseOffers = [...this._state.offers];

    if (this._state.offers.includes(offerId)) {
      this._setState({offers: chooseOffers.filter((offer) => offer !== offerId)});
    } else {
      this._setState({offers: chooseOffers.concat(offerId)});
    }
  };

  #eventPriceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = Number(evt.target.value);

    if (newPrice > 0 && Number.isInteger(newPrice)) {
      this._setState({basePrice: newPrice});
      evt.target.value = newPrice;
    } else {
      evt.target.value = this._state.basePrice;
    }
  };

  #eventDateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', userDate);
  };

  #eventDateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate', userDate);
  };

  static parseWaypointToState(waypoint) {
    return {...waypoint,
      isSaving: false,
      isDeleting: false,
      isDisabled: false,
    };
  }

  static parseStateToWaypoint(state) {
    const waypoint = {...state};

    delete waypoint.isSaving;
    delete waypoint.isDeleting;
    delete waypoint.isDisabled;

    return waypoint;
  }
}
