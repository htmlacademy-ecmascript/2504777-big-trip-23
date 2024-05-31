import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import FiltersModel from './model/filters-model.js';
import { render, RenderPosition } from './framework/render.js';
import { generateFilter } from './mock/filters.js';

const headerMainElement = document.querySelector('.trip-main');
const filtersContainer = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel();
const filtersModel = new FiltersModel();

const eventPresenter = new EventPresenter({
  eventContainer: pageMainElement,
  waypointsModel,
});
const filters = generateFilter(waypointsModel.waypoints);

render(new TripInfoView(), headerMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(filters), filtersContainer);

eventPresenter.init();
