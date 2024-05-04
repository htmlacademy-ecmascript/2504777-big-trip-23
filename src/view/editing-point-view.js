import { createElement } from '../render.js';
import { TYPES_OF_WAYPOINT, DESTINATIONS, DateFormat } from '../const.js';
// import { getDestinationById } from '../mock/destination.js';
import { humanizeWatpointDate } from '../utils.js';
// import { getOffersForWaypoint } from '../mock/offers.js';

const formatOfferTitle = (title) => {
  const replasedTitle = title.replace(/ /gi, '-');
  return replasedTitle.charAt(0).toLowerCase() + replasedTitle.slice(1);
};

const createEventTypeItemTemplate = (eventType, index) => `
  <div class="event__type-item">
    <input id="event-type-${eventType.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}">
    <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-${index}">${eventType}</label>
  </div>
`;

const createOfferTemplate = (offer) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(offer.title)}-${offer.id}" type="checkbox" name="event-offer-${formatOfferTitle(offer.title)}" checked>
    <label class="event__offer-label" for="event-offer-${formatOfferTitle(offer.title)}-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>
`;

const createOfferSectionTemplate = (offers) => {
  if (offers.length === 0) {
    return '';
  }
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">

              ${offers.map((offer) => createOfferTemplate(offer)).join('')}

            </div>
          </section>`;
};

const createPhotoTemplate = (photo) => `<img class="event__photo" src=${photo.src} alt="Event photo"></img>`;

const createDestinationSectionTemplate = (destination) => {
  if (!destination.description && destination.pictures.length === 0) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">

                ${destination.pictures.map((photo) => createPhotoTemplate(photo)).join('')}

              </div>
            </div>
          </section>`;
};

const createEventDetailsTemplate = (destination, offers) => {
  if ((!destination.description && destination.pictures.length === 0) && offers.length === 0) {
    return '';
  }
  return `<section class="event__details">

          ${createOfferSectionTemplate(offers)}
          ${createDestinationSectionTemplate(destination)}

        </section>`;
};

// ? формируется из значений, полученных с сервера - как связывать и взаимодействовать??
// const createDestinationOptionTemplate = (option) => `<option value="${option}"></option>`;

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
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${waypointId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${TYPES_OF_WAYPOINT.map((eventType, index) => createEventTypeItemTemplate(eventType, index)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeWatpointDate(dateFrom, DateFormat.FULL)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeWatpointDate(dateTo, DateFormat.FULL)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        ${createEventDetailsTemplate(currentDestination, offersForWaypoint)}

      </form>
    </li>`
  );
};

export default class EditingPointView {
  constructor({waypoint, destinations, offers}) {
    this.waypoint = waypoint;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEditingPointTemplate(this.waypoint, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
