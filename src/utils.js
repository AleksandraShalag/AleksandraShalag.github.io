
export function generateID() {
    // Генерируем временную метку и случайную строку
    const timestamp = Date.now().toString(36); // Преобразуем время в base36
    const randomPart = Math.random().toString(36).substr(2, 9); // Случайная строка
    return `${timestamp}-${randomPart}`;
  }