import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react'
import styles from './Form.module.css'
import { DraftTodo, Todo } from '../types'
import { v4 as uuid } from 'uuid'
import Error from './Error'

type FormProps = {
    initialStateTodo: DraftTodo
    todos: Todo[]
    setTodos: Dispatch<React.SetStateAction<Todo[]>>
    activeId: string
}

export default function Form({ initialStateTodo, setTodos, activeId, todos }: FormProps) {
    
    const [error, setError] = useState('')
    const [draftTodo, setDraftTodo] = useState<DraftTodo>(initialStateTodo)


    useEffect(() => {
        const editTodo = todos.find(todo => todo.id === activeId)
        if (editTodo) {
            const { description, isActive } = editTodo
            setDraftTodo({ description, isActive })
        }
    }, [activeId])

    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDraftTodo({
            ...draftTodo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (draftTodo.description.length < 2) {
            setError('La descripcion deben tener mas de 1 letra')
            return
        }

        if (draftTodo.description.length > 75) {
            setError('La descripcion no debe ser mayor a 75 letras')
            return
        }

        if (!activeId) {
            const newTodo: Todo = {
                ...draftTodo,
                id: uuid(),
                creationDate: new Date().toString()
            }
            setTodos(state => [...state, newTodo])
        } else {
            const newTodos = todos.map( todo => {
                if (todo.id === activeId) {
                    return {
                        ...todo,
                        ...draftTodo
                    }
                } 

                return todo
            })

            setTodos(newTodos)
        }
        
        setDraftTodo(initialStateTodo)
        setError('')
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}>
            <input 
                type="text"
                className={styles.textBox}
                placeholder="Agrega tu tarea"
                onChange={changeDescription}
                name="description"
                value={draftTodo.description} />

            <input 
                type="submit" 
                value="Agregar"
                className={styles.btnAdd} />

            {error && <Error>{error}</Error> }
        </form>
    )
}