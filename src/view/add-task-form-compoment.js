import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskFormComponentTemplate() {
    return(
         `<form  name="addTaskForm">
                <div>
                    <h2>Новая задача</h2>
                </div>
                <div>
                    <input type="text" name="addTaskEditText" placeholder="Название задачи..." required>
                    <button type="submit" name="addTaskButton">+ Добавить</button>
                </div>
            </form>`
    );
}


export default class AddTaskFormComponentComponent extends AbstractComponent{

  constructor() {
    super();
    this._element = null; // Приватное свойство вместо публичного
  }

  get template(){
    return createAddTaskFormComponentTemplate();
  }
  
}

