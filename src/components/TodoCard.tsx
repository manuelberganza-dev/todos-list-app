import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import styles from './TodoCard.module.css'
import { Todo } from '../types'

type TodoCardProps = {
    todo: Todo
    updateTodo: (id: string) => void
    deleteTodo: (id: string) => void
    deactivateTodo: (id: string) => void
}

export default function TodoCard({ todo, updateTodo, deleteTodo, deactivateTodo }: TodoCardProps) {
    return (
        <div className={styles.card}>
            <div 
                onClick={() => deactivateTodo(todo.id)} 
                className={styles.text}>
                <p className={todo.isActive?  styles.noThrough : styles.lineThrough}>{todo.description}</p>
            </div>

            <div className={styles.buttons}>
                <button 
                    type='button'
                    className={styles.btnEditar}
                    onClick={() => updateTodo(todo.id)}>
                    <PencilSquareIcon className={styles.iconEdit} />
                </button>
                <button 
                    type='button'
                    className={styles.btnEliminar}
                    onClick={() => deleteTodo(todo.id)}>
                    <TrashIcon className={styles.iconDelete} />
                </button>
            </div>

        </div>
    )
}