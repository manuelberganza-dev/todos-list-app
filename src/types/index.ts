export type Todo = {
    id: string
    description: string
    creationDate: string
    isActive: boolean
}

export type DraftTodo = Omit<Todo, 'id' | 'creationDate'>