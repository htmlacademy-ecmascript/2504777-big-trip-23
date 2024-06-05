import ApiService from './framework/api-service';
import { Method } from './const';

export default class EventsApiService extends ApiService {
  get waypoints() {
    return this._load({url: 'points'})
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
      'base_price': waypoint.basePrise,
      'date_from': waypoint.dateFrom.toISOString(),
      'date_to': waypoint.dateTo.toISOString(),
      'is_favorite': waypoint.isFavorite,
    };

    delete adaptedWaypoint.basePrise;
    delete adaptedWaypoint.dateFrom;
    delete adaptedWaypoint.dateTo;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }

}
