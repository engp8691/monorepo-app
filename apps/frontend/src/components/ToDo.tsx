import { Box, Text, Button, Flex, IconButton, Input } from '@chakra-ui/react'
import { LockIcon, UnlockIcon, DeleteIcon } from '@chakra-ui/icons'
import { Fragment, memo, useCallback, useState } from 'react'

type Todo = {
  id: string
  completed: boolean
  name: string
}

enum OPERATIONS {
  DELETE = 'delete',
  TOGGLE = 'toggle'
}

export const TodoItem: React.FC<Todo & {
  todoOperation: (id: string, operation: OPERATIONS) => void
}> = memo(({ id, name, completed, todoOperation }) => {
  console.log(`Rerendering todo ${id} ${name}!`)

  return <Flex m="6" gap="2">
    <IconButton
      variant='outline'
      colorScheme='teal'
      aria-label='toggle todo'
      icon={completed ? <LockIcon /> : <UnlockIcon />}
      onClick={(e) => todoOperation(id, OPERATIONS.TOGGLE)}
    />
    <IconButton
      variant='outline'
      colorScheme='teal'
      aria-label='delete todo'
      icon={<DeleteIcon />}
      onClick={(e) => todoOperation(id, OPERATIONS.DELETE)}
    />
    <Text textDecoration={completed ? 'line-through' : 'none'}>{name}</Text>
  </Flex>
})

export const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState('')

  const todoOperation = useCallback((id: string, operation: OPERATIONS) => {
    if (operation === OPERATIONS.DELETE) {
      setTodos(todos => todos.filter(todo => todo.id !== id))
    }
    if (operation === OPERATIONS.TOGGLE) {
      setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }
  }, [])

  return (
    <Fragment>
      <Box m="6">
        <Input w="400px" type='text' value={todoText} onChange={(e) => setTodoText(e.target.value)}></Input>
        <Button ml="4" disabled={todoText.length === 0} onClick={() => {
          setTodos([...todos, { completed: false, name: todoText, id: crypto.randomUUID() }])
          setTodoText('')
        }} >Add</Button>
      </Box>
      <Box>
        {
          todos.map((todo) => <TodoItem key={todo.id} {...todo} todoOperation={todoOperation} />)
        }
      </Box>
    </Fragment>
  )
}