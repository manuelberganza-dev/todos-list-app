import { useEffect, useState } from "react"
import { DraftTodo, Todo } from "../types"

export const useTodos = () => {
    const initialStateTodo: DraftTodo = {
        description: '',
        isActive: true
    }

    const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const updateTodo = (id: string) => {
        setActiveId(id)
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
        setActiveId('')
    }

    const deactivateTodo = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {

                return {
                    ...todo,
                    isActive: !todo.isActive
                }
            }

            return todo
        })

        setTodos(newTodos)
    }

    return {
        initialStateTodo,
        todos,
        setTodos,
        updateTodo,
        deleteTodo,
        deactivateTodo,
        activeId
    }
}