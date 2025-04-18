import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskFormComponentTemplate() {
    return(
         `<form  name="addTaskForm">
                <div>
                    <h2>Новая задача</h2>
                </div>
                <div>
                    <input type="text" name="addTaskEditText" id="addTaskEditText" placeholder="Название задачи..." required>
                    <button type="submit" name="addTaskButton" id="addTaskButton">+ Добавить</button>
                </div>
            </form>`
    );
}


export default class AddTaskFormComponentComponent extends AbstractComponent{

  #handleClick=null;

  constructor({onClick}) {
    super();
    this.#handleClick=onClick;
    this.element.addEventListener('submit',this.#clickHandler);// Приватное свойство вместо публичного
  }

  get template(){
    return createAddTaskFormComponentTemplate();
  }

  #clickHandler = (evt) =>{
    evt.preventDefault();
    this.#handleClick();
  }
  
}

