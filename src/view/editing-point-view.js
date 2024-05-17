import AbstractView from '../framework/view/abstract-view.js';
import { TYPES_OF_WAYPOINT, DateFormat, NEW_POINT } from '../const.js';
import { humanizeWaypointDate } from '../utils/waypoint.js';

const formatOfferTitle = (title) => {
  const replasedTitle = title.replace(/ /gi, '-');
  return replasedTitle.charAt(0).toLowerCase() + replasedTitle.slice(1);
};

const upFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const createEditingPointTemplate = (waypoint, destinations, offers) => {
  const { type, dateFrom, dateTo, basePrice} = waypoint;
  const currentDestination = destinations.find((destination) => destination.id === waypoint.destination);
  const offersForWaypoint = offers.find((pointOffers) => pointOffers.type === waypoint.type).offers;
  const waypointId = waypoint.id || 0;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
           <label class="event__type  event__type-btn" for="event-type-toggle-${waypointId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${waypointId}" type="checkbox">

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
            <input class="event__input  event__input--destination" id="event-destination-${waypointId}" type="text" name="event-destination" value="${waypointId ? currentDestination.name : ''}" list="destination-list-${waypointId}">
            <datalist id="destination-list-${waypointId}">

              ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}

            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeWaypointDate(dateFrom, DateFormat.FULL)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeWaypointDate(dateTo, DateFormat.FULL)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${waypointId ? 'Delete' : 'Cancel' }</button>
          ${waypointId ? `
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` : '' }

        </header>

        ${(!currentDestination && !offersForWaypoint.length) ? '' : `
        <section class="event__details">

          ${offersForWaypoint.length ? `
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">

                ${offersForWaypoint.map((offer) => `
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(offer.title)}-${offer.id}" type="checkbox" name="event-offer-${formatOfferTitle(offer.title)}" ${waypoint.offers.includes(offer.id) ? 'checked' : ''}>
                      <label class="event__offer-label" for="event-offer-${formatOfferTitle(offer.title)}-${offer.id}">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                  </div>`).join('')}

              </div>
            </section>
          ` : ''}

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${currentDestination.description}</p>
              ${currentDestination.pictures.length ? `
              <div class="event__photos-container">
                <div class="event__photos-tape">

                  ${currentDestination.pictures.map((photo) => `<img class="event__photo" src=${photo.src} alt="${photo.description}"></img>`).join('')}

                </div>
              </div>
              ` : ''}

            </section>

        </section>`}

      </form>
    </li>`
  );
};

export default class EditingPointView extends AbstractView {
  #waypoint = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleFormReset = null;
  #editForm = null;

  constructor({waypoint = NEW_POINT, destinations, offers, onFormSubmit, onFormReset}) {
    super();
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this.#editForm = this.element.querySelector('.event--edit');

    this.#editForm
      .addEventListener('submit', this.#formSubmitHandler);
    this.#editForm
      .addEventListener('reset', this.#formResetHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formResetHandler);
  }

  get template() {
    return createEditingPointTemplate(this.#waypoint, this.#destinations, this.#offers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset();
  };
}
