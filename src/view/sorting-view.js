import AbstractView from '../framework/view/abstract-view.js';
import { SortType, Prefix } from '../const.js';

const createSortingTemplate = () => `
  <form class="trip-events__trip-sort trip-sort" action="#" method="get">
  ${Object.values(SortType)
    .map((type) => `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="${Prefix.SORT_ID}${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${type === SortType.DEFAULT ? 'checked' : ''} ${type === SortType.EVENT || type === SortType.OFFERS ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="${Prefix.SORT_ID}${type}">${type}</label>
    </div>`).join('')}
  </form>
  `;

export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;

  constructor(onSortTypeChange) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedSortType = evt.target.id.replace(Prefix.SORT_ID, '');
    this.#handleSortTypeChange(selectedSortType);
  };
}
