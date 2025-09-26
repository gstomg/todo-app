
import type { Todo } from '../types/todo'

export const getTodosFromStorage = (): Todo[] => {
  const raw = localStorage.getItem('todos');
  if (!raw) return [];
  
  return (JSON.parse(raw) as any[]).map(t => ({
    id: t.id,
    text: t.text,
    completed: t.completed,
    createdAt: new Date(t.createdAt),
  }));
};

export const saveTodosToStorage = (todos: Todo[]): void => { //сохраняем данные 
    localStorage.setItem('todos', JSON.stringify(todos)); 
    //превращаю массив в строчку и сохраняю по ключу todos
}
