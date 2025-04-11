import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTaskListComponentTemplate({status,task}) {
    return (
      `<li class="task-list-item-${status.class} id=${task.id}">${task.title}</li>`
    );
  }


export default class TaskListComponent extends AbstractComponent{

  constructor({status, task}) {
    super(); // Обязательный вызов родительского конструктора
    this._status = status;
    this._task = task;
    this._element = null; // Приватное свойство вместо публичного
  }
  
  get template() {
    return createTaskListComponentTemplate({
      status: this._status,
      task: this._task,
    });
  }

}
