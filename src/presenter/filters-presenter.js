import FiltersView from '../view/filters-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersModel = null;
  #waypointsModel = null;
  #filtersComponent = null;

  constructor(filtersContainer, filtersModel, waypointsModel) {
    this.#filtersContainer = filtersContainer;
    this.#filtersModel = filtersModel;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.entries(filter)
      .map(([filterType, filterWaypoints]) => ({
        type: filterType,
        count: filterWaypoints(this.#waypointsModel.waypoints).length,
      }));
  }

  init() {
    const prevFilterComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters: this.filters,
      currentFilter: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterTypeChange = (filterType) => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
