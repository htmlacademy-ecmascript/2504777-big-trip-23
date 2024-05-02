import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoints-model.js';

import { render, RenderPosition } from './render.js';

const headerMainElement = document.querySelector('.trip-main');
const filtersContainer = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel();
const eventPresenter = new EventPresenter({
  eventContainer: pageMainElement,
  waypointsModel,
});

render(new TripInfoView(), headerMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);

eventPresenter.init();
