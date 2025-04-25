
export function generateID() {
    // Генерируем временную метку и случайную строку
    const timestamp = Date.now().toString(36); // Преобразуем время в base36
    const randomPart = Math.random().toString(36).substr(2, 9); // Случайная строка
    return `${timestamp}-${randomPart}`;
  }

export function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task-list-item:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    // offset < 0 → курсор выше центра элемента → потенциальное место вставки перед ним
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
  