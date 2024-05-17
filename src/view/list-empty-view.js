import AbstractView from '../framework/view/abstract-view';
import { Filters } from '../const';

const createListEmptyTemplate = () => `<p class="trip-events__msg">${Filters.EVERTHING}</p>`;

export default class ListEmptyView extends AbstractView {
  get template() {
    return createListEmptyTemplate();
  }
}
