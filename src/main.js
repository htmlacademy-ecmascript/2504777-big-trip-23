// import TripInfoView from './view/trip-info-view.js';
import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import FiltersModel from './model/filters-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import EventsApiService from './events-api-service.js';
import { render } from './framework/render.js';
import { Service } from './const.js';

const headerMainElement = document.querySelector('.trip-main');
const filtersContainer = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel({
  eventsApiService: new EventsApiService(Service.END_POINT, Service.AUTHORIZATION)
});

const filtersModel = new FiltersModel();

const eventPresenter = new EventPresenter({
  eventContainer: pageMainElement,
  waypointsModel,
  filtersModel,
  enableButton,
  disableButton,
});

new FiltersPresenter(
  filtersContainer,
  filtersModel,
  waypointsModel,
);

new TripInfoPresenter({
  tripInfoContainer: headerMainElement,
  waypointsModel
});

const newPointButtonComponent = new NewPointButtonView(handleNewPointButtonClick);

render(newPointButtonComponent, headerMainElement);

eventPresenter.init();
waypointsModel.init();
// waypointsModel.init()
//   .finally(() => {
//     if (waypointsModel.isUnavailableServer) {
//       return;
//     }
//     tripInfoPresenter.init();
//   });

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
