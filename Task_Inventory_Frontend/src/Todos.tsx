import { Todo } from "./Todo"
import { type ListOfTodo } from "./Types/Types"
interface Props {
    todos:ListOfTodo
}
export const Todos:React.FC<Props>=({todos}) =>{
  return (
    <div className=" w-full">
      <div className="px-3 py-4 flex justify-center overflow-x-auto">
        <table className="w-full table-fixed text-md bg-white shadow-md rounded mb-4 ">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5"></th>
                    <th className="text-left p-3 px-5">Name</th>
                    <th className="text-left p-3 px-5">Priority</th>
                    <th className="text-left p-3 px-5">DueDate</th>
                    <th className="text-left p-3 px-5"></th>
                    <th></th>
                </tr>
                {todos.map(todo=>(                
                  <Todo key={todo.id} id={todo.id} name={todo.name} dueDate={todo.dueDate} priority={todo.priority} done={todo.done}/>
                ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

