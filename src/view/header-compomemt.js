import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `<header>
            <h1>Список задач</h1>
        </header>`
      );
}


export default class HeaderComponent extends AbstractComponent{

  constructor() {
    super();
    this._element = null;  // Обязательный вызов родительского конструктора
  }

  get template() {
    return createHeaderComponentTemplate();
  }

}
