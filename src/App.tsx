import styles from './App.module.css'
import Form from './components/Form'
import TodoCard from './components/TodoCard'
import { useTodos } from './hooks/useTodos'

function App() {

    const { 
        initialStateTodo, 
        setTodos, 
        todos, 
        updateTodo, 
        activeId, 
        deleteTodo, 
        deactivateTodo } = useTodos()

    return (
        <main className={styles.container}>
            <h2 className={styles.titulo}>Administra tus tareas</h2>
            <div className={styles.form}>
                <Form 
                    initialStateTodo={initialStateTodo} 
                    setTodos={setTodos} 
                    activeId={activeId}
                    todos={todos} />
            </div>

            <div>
                {todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} deactivateTodo={deactivateTodo} />
                ))}
            </div>
        </main>
    )
}

export default App
