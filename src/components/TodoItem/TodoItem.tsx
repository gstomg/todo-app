import type { Todo } from '../../types/todo';

//пропсы, что получает компонент от родителя
interface TodoItemProps {
  todo: Todo; //объект задачи
  completedTodo: (id: number) => void; //для чекбокса
  onDelete: (id: number) => void; //для удаления
  onEdit: (id: number, text: string) => void; //для редактирования
}

export function TodoItem({
  todo, 
  completedTodo,
  onDelete,
  onEdit 
}: TodoItemProps) {

  return (
  <li className="todo-item">

    <input
      type="checkbox"
      checked={todo.completed} //статус выполнения из объекта todo
      onChange={() => completedTodo(todo.id)} 
      //при изменении вызываем функцию родителя, родитель меняет статус
    />

    <span className="todo-text">
      {todo.text}
    </span>

    <div className="todo-actions">

      <button onClick={() => /*передаем айди и текст рдителю, вызываем окно*/ 
        onEdit(todo.id, todo.text)}>
          Редактировать
      </button>
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
  </svg>
</button>

    </div>
  </li>
  );
}