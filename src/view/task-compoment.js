import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';
import { getDragAfterElement } from '../utils.js';


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

  constructor({status, onTaskDrop}) {
    super();
    this._status = status;
    
    this.element;  
    this._onTaskDrop = onTaskDrop;
    this.element.addEventListener('dragover', this.#handleDragOver.bind(this));
    this.element.addEventListener('drop', this.#handleDrop.bind(this));
  }

  get template() {
    return createTaskComponentTemplate({
      status: this._status,
    });
  }

  #handleDragOver(evt) {
    evt.preventDefault();
    const listItems = this.element.querySelectorAll('.task-list-item:not(.dragging)');
    const afterIndex = this.#getDragAfterElement(listItems, evt.clientY);
  }

  #getDragAfterElement(items, y) {
    if (items.length === 0) return -1; // Специальное значение для пустого списка
  
    return Array.from(items).reduce(
      (closest, child, index) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return offset < 0 && offset > closest.offset 
          ? { offset, index } 
          : closest;
      }, 
      { offset: Number.NEGATIVE_INFINITY }
    ).index;
  }
  #handleDrop(evt) {
    evt.preventDefault();
    const taskId = evt.dataTransfer.getData('text/plain');
    const newStatus = this._status.class;
    const listItems = this.element.querySelectorAll('.task-list-item:not(.dragging)');
    const afterIndex = this.#getDragAfterElement(listItems, evt.clientY);
    
    this._onTaskDrop({
      taskId: taskId,
      newStatus: newStatus,
      insertIndex: afterIndex >= 0 ? afterIndex : listItems.length
    });
  }
  
}