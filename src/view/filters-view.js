import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = (filters, currentFilter) => `
    <form class="trip-filters" action="#" method="get">

    ${filters.map((filter) => `
    <div class="trip-filters__filter">
      <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${!filter.count ? 'disabled' : ''} ${filter.type === currentFilter ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
    </div>`).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `;

export default class FiltersView extends AbstractView {
  #filters = [];
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilter, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#inputFilterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #inputFilterTypeChangeHandler = (evt) => {
    this.#handleFilterTypeChange(evt.target.value);
  };
}
