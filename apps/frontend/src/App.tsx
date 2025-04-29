import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { QueryResult, useQuery } from './hooks'
// import ChatBox from './components/test_layout_effect/expanding_messages'
import React from 'react'
import DynamicForm from './components/forms/DynamicForm'
import UserForm from './components/forms/UserForm'

type Student = {
  name: string
  grade: number
}
// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

const AppRouter: React.FC = () => {
  const { data, isFetching, error, refetch }: QueryResult<Student> = useQuery('https://jsonplaceholder.typicode.com/users/1')
  if (error) {
    refetch()
  }

  console.log(99917, data, isFetching, error)
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/tests">Tests</Link> | <Link to="/forms">Forms</Link>
      </nav>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/tests" element={<Home />} />
          <Route path="/forms" element={<DynamicForm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
