import { useState } from "react";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }:AddTodoProps){
    //состояние для хранения задачи
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //отмена перезагрузки стр
    
    const trimmed = text.trim();
    if (!trimmed) {
        setError(true);
        return;
    }
    onAdd(trimmed);
    setText('');
    setError(false);
};

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                gap: 12,
                marginBottom: 16,
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%'            // ← добавить
            }}
        >
            <input
                type="text"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    if (error) setError(false);
                }}
                placeholder="Введите задачу"
                style={{ flex: 1, minWidth: 280, width: '100%', padding: 8 }}  // ← width: '100%'
            />
            {error && (
                <span style={{ color: 'red', fontSize: 12 }}>
                Поле не может быть пустым
                </span>
            )}
            <button type="submit">Добавить</button>
        </form>
    )
}

