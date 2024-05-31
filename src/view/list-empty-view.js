import AbstractView from '../framework/view/abstract-view';
import { MessageOfListEmpty } from '../const';

const createListEmptyTemplate = (filter) => `<p class="trip-events__msg">${MessageOfListEmpty[filter]}</p>}`;

export default class ListEmptyView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createListEmptyTemplate(this.#filter);
  }
}
