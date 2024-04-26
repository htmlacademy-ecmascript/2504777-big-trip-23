import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import { render } from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortingsContainer = document.querySelector('.trip-events');

render(new FiltersView(), filtersContainer);
render(new SortingView(), sortingsContainer);
