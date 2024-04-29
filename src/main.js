import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import EventsPresenter from './presenter/events-presenter.js';

import { render, RenderPosition } from './render.js';

const headerMainElement = document.querySelector('.trip-main');
const filtersContainer = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter(pageMainElement);

render(new TripInfoView(), headerMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);
render(new SortingView(), pageMainElement);

eventsPresenter.init();
