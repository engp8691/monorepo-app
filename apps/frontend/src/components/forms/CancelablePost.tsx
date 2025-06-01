import React, { useState } from 'react'
import { useCancellableAxiosPost, useForm } from '../../hooks'
import { Button, HStack, Input } from '@chakra-ui/react'

type FormData = {
  name: string
  age: number
}

export const CancelablePost = () => {
  const { post, cancel } = useCancellableAxiosPost<{ name: string }, { greeting: string }>()
  const [name, setName] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const newLocal = useForm<FormData>({
    initialValues: { name: '', age: 0 },
    validators: {
      name: v => v.length > 0 || 'Name required',
      age: v => v >= 18 || 'Must be 18+'
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await post('http://localhost:3000/longrequest', { name })
      setResult(`Success: ${res.data.greeting}`)
    } catch (err: any) {
      if (err.name === 'CanceledError') {
        setResult('Canceled')
      } else {
        setResult('Failed')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack m="8">
        <Input value={name} onChange={e => setName(e.target.value)} p="2" placeholder="Name" />
        <Button type="submit" m="2" px="4" minW="auto">Submit</Button>
        <Button type="button" m="2" px="4" minW="auto" onClick={cancel}>Cancel Request</Button>
      </HStack>
      {result && <p>{result}</p>}
      {JSON.stringify(newLocal.values)}
    </form>
  )
}
