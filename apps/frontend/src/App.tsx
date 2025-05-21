import { ChakraProvider } from '@chakra-ui/react'
import LogRocket from 'logrocket'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import React from 'react'
import ReactGA from 'react-ga4'

// import { theme } from './theme/theme'
import { QueryResult, useQuery } from './hooks'
import Navbar from './components/NavBar'
import { theme } from './theme/theme2'
import AppRouter from './AppRoutes'


LogRocket.init('mrrxkz/user_form')

type Student = {
  name: string
  grade: number
}

const App: React.FC = () => {
  const { data, isFetching, error, refetch }: QueryResult<Student> = useQuery('https://jsonplaceholder.typicode.com/users/1')
  if (error) {
    refetch()
  }

  ReactGA.initialize('G-PNW1ME6NFF', {
    gtagOptions: {
      debug_mode: true, // This enables debug mode in GA4
    },
  })
  ReactGA.send('pageview')

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
