import {tasks} from "../mock/task.js"
import { generateID } from "../utils.js";

export default class TasksModel{
    #boardtasks = tasks;
    #observers =[];

    get tasks(){
        return this.#boardtasks;
    }

    
    removeTask(id) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== id);
        this._notifyObservers();
    }
    
    getTasksByStatus(status) {
        return this.#boardtasks.filter((task) => task.status === status);
    }

    addTask(title){
        const newTask= {title, status: 'backlog', id: generateID()};
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }
    

    addObserver(observer){
        this.#observers.push(observer);
    }

    removeObserver(observer){
        this.#observers=this.#observers.filter((obs)=>obs!==obderver);
    }

    _notifyObservers(){
        this.#observers.forEach((observer)=>observer());
    }

    updateTaskStatus(taskId, newStatus, insertIndex = Infinity) {
        const task = this.#boardtasks.find(t => t.id === taskId);
        if (!task) return;
      
        const filteredTasks = this.#boardtasks.filter(t => t.id !== taskId);
        const targetTasks = filteredTasks.filter(t => t.status === newStatus);
        const others = filteredTasks.filter(t => t.status !== newStatus);
      
        const adjustedIndex = Math.min(insertIndex, targetTasks.length);
        const updatedTask = {...task, status: newStatus};
        
        targetTasks.splice(adjustedIndex, 0, updatedTask);
        this.#boardtasks = [...others, ...targetTasks];
        this._notifyObservers();
      }
}