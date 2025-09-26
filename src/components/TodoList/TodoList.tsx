import type { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
    todos: Todo[];
    completedTodo: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

export function TodoList({ todos, completedTodo, onDelete, onEdit }: TodoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem  // используем компонент
          key={todo.id}
          todo={todo}
          completedTodo={completedTodo}  
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}