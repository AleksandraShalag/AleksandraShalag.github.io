export const TASK_STATUSES = {
    backlog: {title: 'Бэклог', class: 'backlog'},
    processing: {title: 'В работе', class: 'processing'},
    done: {title: 'Готово', class: 'done'},
    basket: {title: 'Корзина', class: 'basket'},
  };

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType ={
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};