import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { QueryResult, useQuery } from './hooks'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// import { theme } from './theme/theme'
import Navbar from './components/NavBar'
import { theme } from './theme/theme2'
import AppRouter from './AppRoutes'

type Student = {
  name: string
  grade: number
}

const App: React.FC = () => {
  const { data, isFetching, error, refetch }: QueryResult<Student> = useQuery('https://jsonplaceholder.typicode.com/users/1')
  if (error) {
    refetch()
  }

  console.log(99917, data, isFetching, error)
  return (
    <ChakraProvider theme={theme}>

      <BrowserRouter>
        <Navbar />

        <Suspense fallback={<h2>Loading...</h2>}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>

    </ChakraProvider >

  )
}

export default App
