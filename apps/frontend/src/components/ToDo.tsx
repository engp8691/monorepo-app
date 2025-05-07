import { Box, Text, Button, Flex, IconButton, Input } from '@chakra-ui/react'
import { LockIcon, UnlockIcon, DeleteIcon } from '@chakra-ui/icons'
import { Fragment, memo, useCallback, useState } from 'react'

type Todo = {
  id: string
  completed: boolean
  name: string
}

export const TodoItem: React.FC<Todo & {
  toggleCompleted: (id: string) => void
  deleteTodo: (id: string) => void
}> = memo(({ id, name, completed, toggleCompleted, deleteTodo }) => {
  console.log(`Rerendering todo ${id} ${name}!`)

  return <Flex m="6" gap="2">
    <IconButton
      variant='outline'
      colorScheme='teal'
      aria-label='Delete todo'
      icon={completed ? <UnlockIcon /> : <LockIcon />}
      onClick={(e) => toggleCompleted(id)}
    />
    <IconButton
      variant='outline'
      colorScheme='teal'
      aria-label='Delete todo'
      icon={<DeleteIcon />}
      onClick={(e) => deleteTodo(id)}
    />
    <Text textDecoration={completed ? 'line-through' : 'none' }>{name}</Text>
  </Flex>
})

export const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState('')

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  const toggleCompleted = useCallback((id:string)=> {
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }, [])

  return (
    <Fragment>
      <Box m="6">
        <Input w="400px" type='text' value={todoText} onChange={(e) => setTodoText(e.target.value)}></Input>
        <Button onClick={() => {
          setTodos([...todos, { completed: false, name: todoText, id: crypto.randomUUID() }])
          setTodoText('')
        }} >Add</Button>
      </Box>
      <Box>
        {
          todos.map((todo) => <TodoItem key={todo.id} {...todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />)
        }
      </Box>
    </Fragment>
  )
}