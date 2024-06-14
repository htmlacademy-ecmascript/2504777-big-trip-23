import { humanizeWaypointDate } from '../utils/waypoint.js';
import { DateFormat, SeparatorType} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(routeTrip, waypoints, tripCost) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${routeTrip}</h1>

        <p class="trip-info__dates">${humanizeWaypointDate(waypoints[0].dateFrom, DateFormat.DATE_FOR_INFO)}${SeparatorType.DASH}${humanizeWaypointDate(waypoints.at(-1).dateTo, DateFormat.DATE_FOR_INFO)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
      </p>
    </section>`
  );
}
export default class TripInfoView extends AbstractView {
  #routeTrip = null;
  #tripCost = null;
  #waypoints = [];

  constructor(routeTrip, waypoints, tripCost) {
    super();
    this.#routeTrip = routeTrip;
    this.#waypoints = waypoints;
    this.#tripCost = tripCost;
  }

  get template() {
    return createTripInfoTemplate(this.#routeTrip, this.#waypoints, this.#tripCost);
  }
}
