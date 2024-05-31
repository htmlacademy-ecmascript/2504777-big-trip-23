import TripInfoView from './view/trip-info-view.js';
import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import FiltersModel from './model/filters-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import { render, RenderPosition } from './framework/render.js';

const headerMainElement = document.querySelector('.trip-main');
const filtersContainer = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel();
const filtersModel = new FiltersModel();

const eventPresenter = new EventPresenter({
  eventContainer: pageMainElement,
  waypointsModel,
  filtersModel,
});

const filtersPresenter = new FiltersPresenter(
  filtersContainer,
  filtersModel,
  waypointsModel,
);

render(new TripInfoView(), headerMainElement, RenderPosition.AFTERBEGIN);

eventPresenter.init();
filtersPresenter.init();
