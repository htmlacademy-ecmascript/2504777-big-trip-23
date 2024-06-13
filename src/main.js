import { render } from './framework/render.js';
import { END_POINT, AUTHORIZATION } from './const.js';

import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import FiltersModel from './model/filters-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import EventsApiService from './events-api-service.js';

const headerMainElement = document.querySelector('.trip-main');
const filtersContainer = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});

const filtersModel = new FiltersModel();

const eventPresenter = new EventPresenter({
  eventContainer: pageMainElement,
  waypointsModel,
  filtersModel,
  enableButton,
  disableButton,
});

const newPointButtonComponent = new NewPointButtonView(handleNewPointButtonClick);

function handleNewPointButtonClick() {
  eventPresenter.createNewPoint();
  disableButton();
}

function disableButton() {
  newPointButtonComponent.element.disabled = true;
}

function enableButton() {
  newPointButtonComponent.element.disabled = false;
}

new FiltersPresenter(
  filtersContainer,
  filtersModel,
  waypointsModel,
);

new TripInfoPresenter({
  tripInfoContainer: headerMainElement,
  waypointsModel
});

render(newPointButtonComponent, headerMainElement);

eventPresenter.init();
waypointsModel.init();


