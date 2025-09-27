
import type { Todo } from '../types/todo'

// функция для загрузки задачи из ls
export const getTodosFromStorage = (): Todo[] => {
  //вытаскиваем данные из ls по ключу 
  const raw = localStorage.getItem('todos');
  //если данных нет, то пустой массив
  if (!raw) return [];
  
  //преобразуем lson строку в массив объектов
  return (JSON.parse(raw) as any[]).map(t => ({
    id: t.id,
    text: t.text,
    completed: t.completed,
    createdAt: new Date(t.createdAt),
  }));
};

//сохранение в ls
export const saveTodosToStorage = (todos: Todo[]): void => { //сохраняем данные 
    localStorage.setItem('todos', JSON.stringify(todos)); 
    //превращаю массив в строчку и сохраняю по ключу todos
}
