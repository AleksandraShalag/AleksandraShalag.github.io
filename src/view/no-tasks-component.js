import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNoTasksComponentTemplate({status}) {
    return (
      `<li class="no-task-list-item">Нет задач</li>`
    );
}

export default class NoTasksComponent extends AbstractComponent{

  constructor({status}) {
      super(); // Обязательный вызов родительского конструктора
      this._element = null; // Приватное свойство вместо публичного
      this._status = status;
    }
    
    get template() {
      return createNoTasksComponentTemplate({
        status: this._status,
      });
    }
  
}