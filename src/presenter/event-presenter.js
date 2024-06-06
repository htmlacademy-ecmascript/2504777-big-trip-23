import { remove, render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import { sortByCurrentType } from '../utils/sort.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class EventPresenter {
  #eventContainer = null;
  #waypointsModel = null;
  #filtersModel = null;
  #sortsComponent = null;
  #listEmptyComponent = null;
  #newPointPresenter = null;
  #handleNewPointClose = null;

  #currentSortType = SortType.DEFAULT;
  #isLoading = true;

  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();

  #waypointPresenters = new Map();

  constructor({eventContainer, waypointsModel, filtersModel, onNewPointClose}) {
    this.#eventContainer = eventContainer;
    this.#waypointsModel = waypointsModel;
    this.#filtersModel = filtersModel;
    this.#handleNewPointClose = () => {
      onNewPointClose();
      if (!this.waypoints.length) {
        remove(this.#eventListComponent);
        render(this.#listEmptyComponent, this.#eventContainer);
      }
    };

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      waypointListContainer: this.#eventListComponent,
      onDataChange: this.#handleUserAction,
      onNewPointClose: this.#handleNewPointClose,
    });
  }

  get waypoints() {
    return sortByCurrentType(this.#currentSortType, filter[this.#filtersModel.filter](this.#waypointsModel.waypoints));
  }

  init() {
    this.#renderEventsBoard();
  }

  createNewPoint() {
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (!this.waypoints.length) {
      remove(this.#listEmptyComponent);
      render(this.#eventListComponent, this.#eventContainer);
    }
    this.#newPointPresenter.init(this.#waypointsModel.destinations, this.#waypointsModel.offers);
  }

  #renderWaypoint(waypoint, destination, offers) {
    const waypointPresenter = new WaypointPresenter(
      this.#eventListComponent.element,
      this.#handleUserAction,
      this.#handleModeChange,
    );
    waypointPresenter.init(waypoint, destination, offers);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #renderSorts() {
    this.#sortsComponent = new SortingView(
      this.#handleSortTypeChange,
      this.#currentSortType,
    );
    render(this.#sortsComponent, this.#eventContainer);
  }

  #renderWaypointsList() {
    render(this.#eventListComponent, this.#eventContainer);

    for (const waypoint of this.waypoints) {
      this.#renderWaypoint(waypoint, this.#waypointsModel.destinations, this.#waypointsModel.offers);
    }
  }

  #renderListEmpty() {
    this.#listEmptyComponent = new ListEmptyView(this.#filtersModel.filter);
    render(this.#listEmptyComponent, this.#eventContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventContainer);
  }

  #clearWaypointsList() {
    this.#newPointPresenter.destroy();
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
    remove(this.#eventListComponent);
  }

  #renderEventsBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.waypoints.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSorts();
    this.#renderWaypointsList();
  }

  #clearEventsBoard(resetSortType = false) {
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }

    remove(this.#sortsComponent);
    this.#clearWaypointsList();
  }

  #handleUserAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#waypointPresenters.get(update.id).setSaving();
        this.#waypointsModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#newPointPresenter.setSaving();
        this.#waypointsModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this.#waypointPresenters.get(update.id).setDeleting();
        this.#waypointsModel.deleteWaypoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenters.get(data.id).init(data, this.#waypointsModel.destinations, this.#waypointsModel.offers);
        break;
      case UpdateType.MINOR:
        this.#clearEventsBoard();
        this.#renderEventsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsBoard(true);
        this.#renderEventsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEventsBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#waypointPresenters.forEach((presenter) => presenter.modeReset());
  };

  #handleSortTypeChange = (selectedSortType) => {
    if (this.#currentSortType === selectedSortType) {
      return;
    }
    this.#currentSortType = selectedSortType;

    this.#clearWaypointsList();
    this.#renderWaypointsList();
  };
}
