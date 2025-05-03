import { useState } from 'react'

const enum STATUSES {
  'COMPLETED' = 'completed',
  'NEW' = 'new'
}

type Todo = {
  status: string
  name: string
}

export const TodoItem: React.FC<Todo> = ({ status, name }) => {
  const todoStyle = status === 'completed' ? 'completed' : 'new'
  return <div className={todoStyle}>{name}</div>
}

export const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <form>
      < div >
        <button onClick={() => { setTodos([...todos, { status: STATUSES.NEW, name: 'New todo' }]) }} >Add</button>
        <button onClick={(e) => {
          setTodos([...todos.splice(0, 1)])
        }}
        >Delete</button>
      </div >
    </form>
  )
}