import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate({ status, task }) {
  return (`
    <li class="task-list-item ${status.class}" data-id="${task.id}">${task.title}</li>`
  );
}

export default class TaskListComponent extends AbstractComponent{
  constructor({status, task, onDragOver}) {
    super();
    this._status = status;
    this._task = task;
    this._onDragOver = onDragOver; // Колбэк из родителя
    this.element.dataset.id = task.id;
    this.#afterCreateElement();
  }

  #afterCreateElement(){
    this.#makeTaskDraggable();
  }

  get template() {
    return createTaskListComponentTemplate({
      status: this._status,
      task: this._task,
    });
  }

  #makeTaskDraggable(){
    this.element.setAttribute('draggable', true);
  
    this.element.addEventListener('dragstart', (event) => {
      this.element.classList.add('dragging');
      event.dataTransfer.setData('text/plain', this._task.id);
    });
  
    this.element.addEventListener('dragend', () => {
      this.element.classList.remove('dragging');
    });
  }

  setListElements(elements) {
    this._listElements = elements;
  }

}