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
        onDelete(todo.id)}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABAElEQVR4nOXUO2oCYRwE8CkknVcw6AV81BG9gI/aBwHbaNqINpY+WkUvoGir6AUU0yrJBQxaxV5Bg2FlKqv5S0AkA1+x8JtvtlgW+C+pADhdnOo1F53+6NxuwMknkf/8pCXAzoeCJ8Qxw0CcnbGCO8QvhoE8O20Fl6/4SmrslBScJe4aBnrsZBQcJZ4aBmbsRBTsI14ZBr7Y8Sr4AcAPgCMAl+Adc2DH6UrZ8I08gn2kXcOQd5aeBBumnVsGBiylBJum7VsGGiy9CbZIW7cMvLLUFGyLtmAZSLI0FOyINmEZCLG0EOySNmgZcAPYG/7/O3ZMyQHYCpd/A3i2Xn4/+QVXaHujT54Q+AAAAABJRU5ErkJggg==" alt="filled-trash">
      </button>

    </div>
  </li>
  );
}