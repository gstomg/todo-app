import { useEffect, useState } from 'react'; //состояние и эффекты
import './App.css'; //стили
import { getTodosFromStorage, saveTodosToStorage } from './utils/localStorage'; 
import { AddTodo } from './components/AddTodo/AddTodo';
import { TodoList } from './components/TodoList/TodoList';
import { EditTodo } from './components/EditTodo/EditTodo';
import { setTheme, toggleTheme, type Theme, getStoredTheme } from './utils/theme'; //функции для темы
import type { Todo } from './types/todo'; //типы



function App() { 
  //состояния
  const [todos, setTodos] = useState<Todo[]>(() => getTodosFromStorage()); //список всех задач, функция для изменения
  const [sortBy, setSortBy] = useState<'newtask' | 'oldtask'>('newtask'); //сортировка новые или старые 
  const [filter, setFilter] = useState<'all' | 'completed' | 'falsecomplete'>('all'); //фильтр по -все, готовые, не готовые
  const [editingTodo, setEditingTodo] = useState<number | null>(null); //какая задача редактируется
  const [editText, setEditText] = useState<string>(''); //текст для редактирования
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme() ?? 'light'); //тема, нач состояние- из localstorsge или светлая


  useEffect(() => { //выбранная тема меняется при изменении темы
    setTheme(theme);
  }, [theme]);

  useEffect(() => { //сохраняет задачи в браузер
    saveTodosToStorage(todos); //вызови 
  }, [todos]); //следим за изменением todos

  

  const generateId = () => Date.now(); //генерируем id с помощью метода времени

  const addTodo = (text: string) => { 
    const newTodo: Todo = { 
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
   // prev - это ПАРАМЕТР функции, который React автоматически передает
   //берем текущий массив todos (как prev) + создаем новый массив: старые задачи + новая задача
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id ));//перебери массив, найди объект с этой Id  и верни массив уже без него
  };

  //чекбокс готовности
  const completedTodo = (id: number) =>{ 
    setTodos(prev => prev.map(todo => //создай новый массив, по отбору, где найди подходящий id и поменяй свойство completed на обратное
      todo.id === id ? {...todo, completed: !todo.completed } :todo
    ));
  };



  //фильтр старые новые методом сорт
  const sortTodos = (todosList: Todo[]) => { 
    return [...todosList].sort((a, b) => { //создаем новый массив, где сортируем, // Новые сначала (по убыванию ID) иначе старые
      return sortBy === 'newtask' ? b.id - a.id : a.id - b.id;
    });
  }



  //фильтр по готовности
  const getFilteredTodos = () => {
    let filtered = todos; //все задачи

    if (filter === 'falsecomplete') {//если не готовые
      filtered = todos.filter(todo => !todo.completed); //отфильтруй массив, так, что оставь только не выполненные задачи
    } else if (filter === 'completed'){ //игаче если нужны готовые
      filtered = todos.filter(todo => todo.completed); // то отфильтруй массив так, что оставь только готовые
    }
    return sortTodos(filtered);//верни относительно сортировки по *старые или новые*
  }

  const startEdit = (id: number, text: string) => { //редактирование задачи
  setEditingTodo(id); //запонимаем какую задачу редактируем
  setEditText(text);//что редактируем
}; 

const saveEdit = () => {
  if (!editingTodo || !editText.trim()) return; //если нет айди редактируемой задачи или текста, то выходим
  
  setTodos(prev => prev.map(todo => 
      todo.id === editingTodo ? { ...todo, text: editText.trim() } : todo //найди задачу с id данным и поменяй значение текст
    ));
    
    //закрываем редактор
    setEditingTodo(null); //редактор закрыт
    setEditText('');//поле пустое
  };


  //закрываем редактор
  const cancelEdit = () => {
    setEditingTodo(null);
    setEditText('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>ToDo</h2>
        <button onClick={() => setThemeState(prev => toggleTheme(prev))} /* при клике - возьми текущее значение тему и вызови переключатель*/>
          {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'/* если тема светлая по факту значение, то надпись темная и наоборот*/}
        </button>
      </div>
      
      {/* Компонент добавления отобразить компонент AddTodo и передать ему функцию addTodo как пропс с названием onAdd */}
      <AddTodo onAdd={addTodo} /> 
      
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', margin: '12px 0 16px' }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newtask' | 'oldtask')}/* фильтр отображения выбранного значения */
        >
          <option value="newtask">Новые</option>
          <option value="oldtask">Старые</option>
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'falsecomplete' | 'completed')}
        >
          <option value="all">Все задачи</option>
          <option value="falsecomplete">Неготовые</option>
          <option value="completed">Готовые</option>
        </select>
      </div>
      
      <TodoList //компонент  
        todos={getFilteredTodos()}  //какие задачи выводить
        completedTodo={completedTodo} //для чекбокса
        onDelete={deleteTodo} //для удаления
        onEdit={startEdit}  //для редактирования
      />
      
      <EditTodo
        isOpen={editingTodo !== null}
        editText={editText}
        onTextChange={setEditText}
        onSave={saveEdit}
        onCancel={cancelEdit}
      />
    </div>
  );
}

export default App;
