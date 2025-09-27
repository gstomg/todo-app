import { useState } from "react";

interface AddTodoProps { //компонент ожидает функцию
    onAdd: (text: string) => void; //принимает текст задачи и не возвращает ничего
}

export function AddTodo({ onAdd }:AddTodoProps){
    //состояние для хранения задачи
    const [text, setText] = useState(''); 
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {//обработка события
        e.preventDefault(); //отмена перезагрузки стр
    
    const trimmed = text.trim(); 
    if (!trimmed) {//проверка на пустоту
        setError(true);
        return;
    }
    onAdd(trimmed); //передача задачи родителю
    setText('');
    setError(false);
};

    return (
        <form
            onSubmit={handleSubmit}
            className="add-todo-form"
        >
            <input
                type="text"
                value={text} /*значение введенное из состояния*/
                onChange={(e) => {
                    setText(e.target.value);/*обновляем текст*/
                    if (error) setError(false);/*убираем ошибку при новом вводе*/
                }}
                placeholder="Введите задачу"
                className="add-todo-input"
            />
            
            {error && ( /*вывод ошибки*/
                <span className="add-todo-error">
                Поле не может быть пустым
                </span>
            )}
            <button type="submit">Добавить</button>
        </form>
    )
}

