import type { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  completedTodo: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export function TodoItem({ todo, completedTodo, onDelete, onEdit }: TodoItemProps) {
  return (
    <li style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'start',
      gap: 8,
      padding: '8px 12px',
      border: '1px solid var(--border)',
      borderRadius: 8,
      background: 'var(--surface)',
      marginBottom: 8,
      width: '100%',
      textAlign: 'left'
    }}>
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => completedTodo(todo.id)}
  />
  <span style={{
    overflow: 'visible',
    whiteSpace: 'normal',
    wordBreak: 'break-word'
  }}>
    {todo.text}
  </span>

  <div style={{ display: 'flex', gap: 8 }}>
  <button onClick={() => onEdit(todo.id, todo.text)}>Редактировать</button>
  <button onClick={() => onDelete(todo.id)}>Удалить</button>
</div>
</li>
  );
}