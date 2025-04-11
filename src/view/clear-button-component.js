import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
  return `<button class="clear-button"> Очистить </button>`;
}

export default class ClearButtonComponent extends AbstractComponent{

  constructor() {
    super(); // Обязательный вызов родительского конструктора
    this._element = null; // Приватное свойство вместо публичного
  }

  get template() {
    return createClearButtonTemplate();
  }
  
}