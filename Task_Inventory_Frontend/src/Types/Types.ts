import type { TODO_FILTERS } from './Consts'

export interface Todo {
    id:string,
    name:string
    done:boolean
    dueDate:string
    priority:string
}
export type TodoId=Pick<Todo,'id'>
export type ListOfTodo=Todo[]
export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
