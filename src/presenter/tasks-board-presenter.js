import TaskComponent from '../view/task-compoment.js';
import BoardTaskComponent from '../view/board-task-compoment.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import {render} from '../framework/render.js';
import TaskListComponent from '../view/task-list-compoment.js';
import NoTasksComponent from '../view/no-tasks-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #statuses = null;

  constructor({boardContainer, taskModel, statuses}) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    this.#statuses = statuses;
  }

  init() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderBoard() {
    this.#statuses.forEach((status) => {
      const tasks = this.#taskModel.getTasksByStatus(status.class);

      const boardTaskComponent = this.#renderBoardColumn();
      const taskComponent = this.#renderTaskComponent(status, boardTaskComponent.element, tasks);
      const taskListContainer = taskComponent.element.querySelector('.tasks-list');
      this.#renderTaskListComponent(status, tasks, taskListContainer);
    });
  }

  #renderBoardColumn() {
    const boardTaskComponent = new BoardTaskComponent();
    render(boardTaskComponent, this.#boardContainer);
    return boardTaskComponent;
  }

  #renderClearButton(container) {
    const clearButton = new ClearButtonComponent({
      onClick: () => this.#handleClearButtonClick() 
    });
    render(clearButton, container);
  }

  #handleClearButtonClick() {
    // Удаляем все задачи с статусом "basket"
    const basketTasks = this.#taskModel.getTasksByStatus('basket');

    // Удаляем каждую задачу по ID
    basketTasks.forEach(task => {
      this.#taskModel.removeTask(task.id);
    });

  }
  

  
  #renderTaskComponent(status, container, tasks) {
    const taskComponent = new TaskComponent({
      status: status,
      onTaskDrop: (data) => this.#handleTaskDrop(data) // Правильная передача колбэка
    });
    render(taskComponent, container);
    
    if (status.class === "basket" && tasks.length !== 0) {
      this.#renderClearButton(container);
    }
    
    return taskComponent;
  }

  #renderTaskListComponent(status, tasks, container){

    if (!tasks || tasks.length === 0) {
      this.#renderNoTasksComponent(status,container);

    } 
    else {

      tasks.forEach(task => {
        const taskListComponent = new TaskListComponent({status:status,task:task});
        render(taskListComponent,container);

      });


    }


  }

  
  #handleTaskDrop({taskId, newStatus, insertIndex}) {
    this.#taskModel.updateTaskStatus(taskId, newStatus, insertIndex);
  }

  #renderNoTasksComponent(status,container){
    const noTasksComponent = new NoTasksComponent({status});
      render(noTasksComponent, container);
  }
   
  createTask(){
    const taskTitle = document.querySelector('#addTaskEditText').value.trim();
    if(!taskTitle){
      return;
    }

    this.#taskModel.addTask(taskTitle);

    document.querySelector('#addTaskEditText').value='';
  }

  #handleModelChange(){
    this.#clearBoard();
    this.init();
  }

  #clearBoard(){
    this.#boardContainer.innerHTML ='';
  }

  get tasks(){
    return this.#taskModel.tasks;
  }

}