import { MessageOfListEmpty } from '../const';
import AbstractView from '../framework/view/abstract-view';

const getMessage = (filter, isUnavailableServer, isLoading) => {
  if (isLoading) {
    return MessageOfListEmpty.LOADING;
  }
  if (isUnavailableServer) {
    return MessageOfListEmpty.UNAVAILABLE_SERVER;
  }
  return MessageOfListEmpty[filter];
};

const createListEmptyTemplate = (filter, isUnavailableServer, isLoading) => `<p class="trip-events__msg">${getMessage(filter, isUnavailableServer, isLoading)}</p>}`;

export default class ListEmptyView extends AbstractView {
  #filter = null;
  #isUnavailableServer = null;
  #isLoading = null;

  constructor({filter, isUnavailableServer, isLoading}) {
    super();
    this.#filter = filter;
    this.#isUnavailableServer = isUnavailableServer;
    this.#isLoading = isLoading;
  }

  get template() {
    return createListEmptyTemplate(this.#filter, this.#isUnavailableServer, this.#isLoading);
  }
}
