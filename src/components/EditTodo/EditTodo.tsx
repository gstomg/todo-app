interface EditTodoProps {
  isOpen: boolean;
  editText: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditTodo({ isOpen, editText, onTextChange, onSave, onCancel }: EditTodoProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        color: 'var(--text)',
        padding: 20,
        borderRadius: 8,
        border: '1px solid var(--border)',
        minWidth: 300
      }}>
        <h3>Редактировать задачу</h3>
        <input
          type="text"
          value={editText}
          onChange={(e) => onTextChange(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
          autoFocus
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onSave}>Сохранить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}