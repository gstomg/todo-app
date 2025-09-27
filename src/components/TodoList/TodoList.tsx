import type { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

//интерфейс пропсов для компонента списка
interface TodoListProps {
    todos: Todo[];
    completedTodo: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

export function TodoList({ 
  todos, 
  completedTodo, 
  onDelete, 
  onEdit 
}: TodoListProps) {

  return (
    <ul>
      {/*преобразуем массив задач в массив компонентов TodoItem */
      todos.map(todo => (
        <TodoItem  // создаем компонент
          key={todo.id} // уникальный ключ для React
          todo={todo}
          completedTodo={completedTodo}  
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}