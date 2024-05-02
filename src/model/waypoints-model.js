import { getRandomWaypoint } from '../mock/waypoints.js';
import { createArray } from '../utils.js';
import { WAYPOINTS_COUNT } from '../const.js';

export default class WaypointsModel {
  waypoints = createArray(WAYPOINTS_COUNT, getRandomWaypoint);

  getWaypoints() {
    return this.waypoints;
  }
}
