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
      <button onClick={() => 
        onDelete(todo.id)}>Удалить
      </button>

    </div>
  </li>
  );
}