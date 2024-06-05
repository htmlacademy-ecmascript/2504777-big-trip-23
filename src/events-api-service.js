import ApiService from './framework/api-service';
import { Method } from './const';

export default class EventsApiService extends ApiService {
  get waypoints() {
    return this._load({url: 'big-trip/points'})
      .then(ApiService.parseResponse);
  }

  async updateWaypoint(waypoint) {
    const response = await this._load({
      url: `big-trip/points/${waypoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(waypoint),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

}
