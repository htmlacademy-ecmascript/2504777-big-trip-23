import ApiService from './framework/api-service';
import { Method, EndUrl } from './const';

const { POINTS, DESTINATIONS, OFFERS} = EndUrl;

export default class EventsApiService extends ApiService {
  get waypoints() {
    return this._load({url: POINTS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: OFFERS})
      .then(ApiService.parseResponse);
  }

  async updateWaypoint(waypoint) {
    const response = await this._load({
      url: `points/${waypoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(waypoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(waypoint) {
    const adaptedWaypoint = {...waypoint,
      'base_price': waypoint.basePrice,
      'date_from': waypoint.dateFrom.toISOString(),
      'date_to': waypoint.dateTo.toISOString(),
      'is_favorite': waypoint.isFavorite,
    };

    delete adaptedWaypoint.basePrice;
    delete adaptedWaypoint.dateFrom;
    delete adaptedWaypoint.dateTo;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }

}
