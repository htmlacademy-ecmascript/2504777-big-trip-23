import AbstractView from '../framework/view/abstract-view';
import { MessageOfListEmpty } from '../const';

const createListEmptyTemplate = (filter, isUnavailableServer) => `<p class="trip-events__msg">${isUnavailableServer ? MessageOfListEmpty.UNAVAILABLE_SERVER : MessageOfListEmpty[filter]}</p>}`;

export default class ListEmptyView extends AbstractView {
  #filter = null;
  #isUnavailableServer = null;

  constructor({filter, isUnavailableServer}) {
    super();
    this.#filter = filter;
    this.#isUnavailableServer = isUnavailableServer;
  }

  get template() {
    return createListEmptyTemplate(this.#filter, this.#isUnavailableServer);
  }
}
