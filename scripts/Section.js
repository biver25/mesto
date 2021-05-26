export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    console.log(this._items);
    this._items.forEach(item => Section._renderer(item))
  }

  addItem(element) {
    this._container.append(element);
  }
}
