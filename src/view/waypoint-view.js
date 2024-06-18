import { humanizeWaypointDate, convertTime, renderDuration } from '../utils/waypoint.js';
import { getDuration } from '../utils/common.js';
import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const { ATTRIBUTE_WITH_TIME, ATTRIBUTE_WITHOUT_TIME, DAY, TIME } = DateFormat;

const createWaypointTemplate = (waypoint, destinations, offers) => {
  const { type, dateFrom, dateTo, basePrice, isFavorite } = waypoint;
  const currentDestination = destinations.find((destination) => destination.id === waypoint.destination);
  const offersForWaypoint = offers.find((pointOffers) => pointOffers.type === waypoint.type).offers;
  const selectedOffers = offersForWaypoint.filter((offer) => waypoint.offers.includes(offer.id));

  const waypointFavoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeWaypointDate(dateFrom, ATTRIBUTE_WITHOUT_TIME)}">${humanizeWaypointDate(dateFrom, DAY)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${currentDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeWaypointDate(dateFrom, ATTRIBUTE_WITH_TIME)}">${humanizeWaypointDate(dateFrom, TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${humanizeWaypointDate(dateTo, ATTRIBUTE_WITH_TIME)}">${humanizeWaypointDate(dateTo, TIME)}</time>
          </p>
          <p class="event__duration">${renderDuration(convertTime(getDuration(dateFrom, dateTo)))}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        ${selectedOffers.length ? `
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${selectedOffers.map((offer) => `
              <li class="event__offer">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </li>
            `).join('')}
          </ul>
        ` : ''}

        <button class="event__favorite-btn ${waypointFavoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class WaypointView extends AbstractView {
  #waypoint = null;
  #destinations = [];
  #offers = [];
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ waypoint, destinations, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createWaypointTemplate(this.#waypoint, this.#destinations, this.#offers);
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
