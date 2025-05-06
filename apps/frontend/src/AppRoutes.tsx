import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy } from 'react'
import { QueryResult, useQuery } from './hooks'
import React from 'react'
// import DynamicForm from './components/forms/DynamicForm'
import UserForm from './components/forms/UserForm'
import { Counter } from './components/counter/Counter'
import { ErrorDemo } from './components/error-boundary-demo/ErrorDemo'
import { ErrorBoundary } from './ErrorBoundry'
import LazyLoadingSlowComponent from './components/lazy-demo/LazyLoadingSlowComponent'
import { VirtualList } from './components/visual-list/VisualList'
import { SelectorContextDemo } from './components/context-value-selector/SelectorContextDemo'

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
  const location = useLocation()

  console.log(99917, data, isFetching, error)
  return (
    <Routes>
      <Route path="/" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 1.</h1>}><UserForm /></ErrorBoundary>} />
      <Route path="/about" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 2.</h1>}><About /></ErrorBoundary>} />
      <Route path="/tests" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 3.</h1>}><Home /></ErrorBoundary>} />
      <Route path="/forms" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 4.</h1>}><SelectorContextDemo /></ErrorBoundary>} />
      <Route path="/counter" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 5.</h1>}><Counter /></ErrorBoundary>} />
      {/* <Route path="/counter" element={<Counter />} /> */}
      <Route path="/errorboundary" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 6.</h1>}><ErrorDemo /></ErrorBoundary>} />
      <Route path="/lazyimport" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><LazyLoadingSlowComponent /></ErrorBoundary>} />
      <Route path="/visuallist" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><VirtualList /></ErrorBoundary>} />
    </Routes>
  )
}

export default AppRouter
