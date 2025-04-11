import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createBoardTaskComponentTemplate() {
    return `
      <section class="task-section">
      
      </section>
    `;
  }
  


export default class BoardTaskComponent extends AbstractComponent{
  
  constructor() {
    super();
    this._element = null; // Приватное свойство вместо публичного
  }

  get template() {
    return createBoardTaskComponentTemplate();
  }

}

