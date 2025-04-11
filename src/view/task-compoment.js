import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTaskComponentTemplate({status}) {
  return `
    <div class="task-component-${status.class}">
      <h3 name="${status.class}">${status.title}</h3>
      <ul class="tasks-list">

      </ul>
    </div>
  `;
}
export default class TaskComponent extends AbstractComponent{

  
  constructor({status}) {
    super();
    this._status = status; // Приватное свойство
  }

  get template() {
    return createTaskComponentTemplate({
      status: this._status,
    });
  }

  
}