import TaskComponent from '../view/task-compoment.js';
import BoardTaskComponent from '../view/board-task-compoment.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import {render} from '../framework/render.js';
import TaskListComponent from '../view/task-list-compoment.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import { UserAction, UpdateType } from '../const.js';
import LoadingComponent from '../view/loading-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #statuses = null;
  #loadingComponent = null;

  constructor({ boardContainer, taskModel, statuses }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    this.#statuses = statuses;
    this.#loadingComponent = new LoadingComponent();

  }

  async init() {
    render(this.#loadingComponent, document.body);
    await this.#taskModel.init();
    this.#loadingComponent.element.remove();
    this.#loadingComponent.removeElement?.();
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

  #renderTaskComponent(status, container, tasks) {
    const taskComponent = new TaskComponent({
      status,
      onTaskDrop: (data) => this.#handleTaskDrop(data)
    });
    render(taskComponent, container);
    if (status.class === 'basket' && tasks.length) {
      this.#renderClearButton(container);
    }
    return taskComponent;
  }

  #renderTaskListComponent(status, tasks, container) {
    if (!tasks.length) {
      const noTasksComponent = new NoTasksComponent({ status });
      render(noTasksComponent, container);
      return;
    }
    tasks.forEach(task => {
      const taskListComponent = new TaskListComponent({ status, task });
      render(taskListComponent, container);
    });
  }

  #renderClearButton(container) {
    const clearButton = new ClearButtonComponent({
      onClick: () => this.#handleClearButtonClick()
    });
    render(clearButton, container);
  }

  async #handleClearButtonClick() {
    render(this.#loadingComponent, document.body);

    try{
      await this.#taskModel.clearBasketTasks();
    }catch(err){
      console.error('Ошибка при удалении задач из корзины:', укк)
    }finally{
      this.#loadingComponent.element.remove();
      this.#loadingComponent.removeElement?.();
    }
    
  }

  #handleModelChange(eventType) {
    switch (eventType) {
      case UpdateType.INIT:
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  #handleTaskDrop({ taskId, newStatus, insertIndex }) {
    render(this.#loadingComponent, document.body);
    try{
      this.#taskModel.updateTaskStatus(taskId, newStatus, insertIndex);
    //небольшую задержку, чтобы спиннер был заметен
    // await new Promise(resolve => setTimeout(resolve, 400));
    }finally{
      this.#loadingComponent.element.remove();
      this.#loadingComponent.removeElement?.();
    }
  }

  async createTask() {
    render(this.#loadingComponent, document.body);

    const taskTitle = document.querySelector('#addTaskEditText').value.trim();
    if (!taskTitle) return;
    try {
      await this.#taskModel.addTask(taskTitle);
      document.querySelector('#addTaskEditText').value = '';
    } catch (error) {
      alert('Не удалось добавить задачу. Проверьте соединение.');
    }

    this.#loadingComponent.element.remove();
    this.#loadingComponent.removeElement?.();
  }

  #clearBoard() {
    this.#boardContainer.innerHTML = '';
  }

  get tasks() {
    return this.#taskModel.tasks;
  }
}
