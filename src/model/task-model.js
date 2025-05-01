import { generateID } from "../utils.js";
import Observable from "../framework/observable.js";
import { UpdateType, UserAction } from "../const.js";

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.getTasks();
      this.#boardtasks = tasks.map(this.#adaptTask);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
      this.#boardtasks = [];
    }

    this._notify(UpdateType.INIT);
  }

  #adaptTask = (task) => ({
    id: task.id,
    title: task.title,
    status: task.status.toLowerCase()
  });

  get tasks() {
    return this.#boardtasks;
  }

  removeTask(id) {
    this.#boardtasks = this.#boardtasks.filter(task => task.id !== id);
    this._notify(UserAction.DELETE_TASK, { id });
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      id: generateID(),
      title,
      status: 'backlog'
    };

    try {
      const created = await this.#tasksApiService.addTask(newTask);
      const adapted = this.#adaptTask(created);
      this.#boardtasks.push(adapted);
      this._notify(UserAction.ADD_TASK, adapted);
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
      throw error;
    }
  }

  async updateTaskStatus(taskId, newStatus, insertIndex = Infinity) {
    const task = this.#boardtasks.find(t => t.id === taskId);
    if (!task) return;

    const filtered = this.#boardtasks.filter(t => t.id !== taskId);
    const target = filtered.filter(t => t.status === newStatus);
    const others = filtered.filter(t => t.status !== newStatus);

    const position = Math.min(insertIndex, target.length);
    const updatedTask = { ...task, status: newStatus };
    target.splice(position, 0, updatedTask);
    this.#boardtasks = [...others, ...target];

    this._notify(UserAction.UPDATE_TASK, { id: taskId, status: newStatus, insertIndex: position });

    try {
      await this.#tasksApiService.updateTask({ id: taskId, title: task.title, status: newStatus });
    } catch (error) {
      console.error('Ошибка обновления статуса задачи:', error);
    }
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardtasks.filter(task => task.status === 'basket');

    try {
      await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
      
      this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket');
      this._notify(UserAction.DELETE_TASK, { status: 'basket' });

    } catch (err) {
        console.error('Ошибка при удалении задач из корзины:', err);
        throw err;
    }
}

}
