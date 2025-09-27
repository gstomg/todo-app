interface EditTodoProps {
  isOpen: boolean; //отвечает за открытие окна редактирования
  editText: string; //текст редакт-й задачи
  onTextChange: (text: string) => void; //при изменении текста
  onSave: () => void; 
  onCancel: () => void;
}


export function EditTodo({ 
  isOpen, 
  editText,
  onTextChange,
  onSave,
  onCancel 
  }: EditTodoProps) {
    //если окно не открыто, то не отрисовываем
  if (!isOpen) return null;

  return (
    <div className="edit-todo-overlay">
      <div className="edit-todo-modal">
        <h3>Редактировать задачу</h3>
         {/* Когда пользователь печатает - ВЫЗЫВАЕМ ФУНКЦИЮ РОДИТЕЛЯ */}
        <input
          type="text"
          value={editText} //текущее значение
          onChange={(e) => onTextChange(e.target.value)} // → setCurrentEditText()
          //при изменении текста вызываем коллбэк
          className="edit-todo-input"
          autoFocus
        />
        <div className="edit-todo-buttons"> 
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}