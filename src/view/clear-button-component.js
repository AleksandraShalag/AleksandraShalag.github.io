import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
  return `<button class="clear-button" type="button"> Очистить </button>`;
}

export default class ClearButtonComponent extends AbstractComponent{

  #handleClick=null;

  constructor({onClick}) {
    super();
    this.#handleClick=onClick;
    this.element.addEventListener('click',this.#clickHandler);// Приватное свойство вместо публичного
  }

  get template() {
    return createClearButtonTemplate();
  }

  #clickHandler = (evt) =>{
    evt.preventDefault();
    this.#handleClick();
  }

}