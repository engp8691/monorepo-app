import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy } from 'react'
import { QueryResult, useQuery } from './hooks'
import React from 'react'
// import DynamicForm from './components/forms/DynamicForm'
import UserForm from './components/forms/UserForm'
import UserForm2 from './components/forms/UserForm2'
import { Counter } from './components/counter/Counter'
import { ErrorDemo } from './components/error-boundary-demo/ErrorDemo'
import { ErrorBoundary } from './ErrorBoundry'
import LazyLoadingSlowComponent from './components/lazy-demo/LazyLoadingSlowComponent'
import { VirtualList } from './components/visual-list/VisualList'
import { SelectorContextDemo } from './components/context-value-selector/SelectorContextDemo'
import { Box } from '@chakra-ui/react'
import AppForm from './components/forms/AppForm'
import { CancelablePost } from './components/forms/CancelablePost'
// import AgGrid from './components/ag-grid/simple'
// import GridFiltering from './components/ag-grid/filtering'
// import GridPaging from './components/ag-grid/paging'
import { AgGridWrapper } from './utils/AgGridWrapper'

type Student = {
  name: string
  grade: number
}
// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const AgGrid = lazy(() => import('./components/ag-grid/simple'))
const GridFiltering = lazy(() => import('./components/ag-grid/filtering'))
const GridPaging = lazy(() => import('./components/ag-grid/paging'))

const AppRouter: React.FC = () => {
  const { data, isFetching, error, refetch }: QueryResult<Student> = useQuery('https://jsonplaceholder.typicode.com/users/1')
  if (error) {
    refetch()
  }
  const location = useLocation()

  console.log(99932, data, isFetching, error)
  return (
    <AgGridWrapper>
      <Routes>
        <Route path="/" element={
          <Box m="6">
            <h1>Welcome to the Home Page</h1>
            <Box mt="6">
              <p>
                There are two forms under the Home page menu.
              </p>
              <p>
                Form 1 uses react-hook-form in the traditional way and it has the issue re-rendering all the fields while the user is typing in any field
              </p>
              <p>
                form 2 fixes the re-rendering issues while user is typing in a field. It means only the changing field is rendered. Please open the dev tool to check the console logs.
              </p>
            </Box>
          </Box>}
        />
        < Route path="/form1" element={
          < ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 1.</h1 >}>
            <Box m="6">This form uses react-hook-form in the traditional way and it has the issue re-rendering all the fields while the user is typing in any field</Box>
            <UserForm />
          </ErrorBoundary >}
        />
        < Route path="/form2" element={
          < ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 2.</h1 >}>
            <Box m="6">This form also uses react-hook-form. But it fixes the re-rendering issues while the user is typing in a field. It means only the changing field is rendered. Please open the dev tool to check the console logs.</Box>
            <UserForm2 />
          </ErrorBoundary >}
        />
        < Route path="/form3" element={
          < ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 3.</h1 >}>
            <Box m="6">This form also uses react-hook-form but without Chakra.</Box>
            <AppForm />
          </ErrorBoundary >}
        />
        < Route path="/form4" element={
          < ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 4.</h1 >}>
            <Box m="6">The request will take 5 seconds to reply back after submission. During this period of time, it can be revoked/cancelled.</Box>
            <CancelablePost />
          </ErrorBoundary >}
        />
        < Route path="/todo" element={< ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 2.</h1 >}> <About /></ErrorBoundary >} />
        < Route path="/tests" element={< ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 3.</h1 >}> <Home /></ErrorBoundary >} />
        < Route path="/forms" element={< ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 4.</h1 >}> <SelectorContextDemo /></ErrorBoundary >} />
        < Route path="/counter" element={< ErrorBoundary key={location.pathname} fallback={< h1 > Oops! There was a problem 5.</h1 >}> <Counter /></ErrorBoundary >} />
        {/* <Route path="/counter" element={<Counter />} /> */}
        <Route path="/errorboundary" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 6.</h1>}><ErrorDemo /></ErrorBoundary>} />
        <Route path="/lazyimport" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><LazyLoadingSlowComponent /></ErrorBoundary>} />
        <Route path="/visuallist" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><VirtualList /></ErrorBoundary>} />
        <Route path="/aggrid" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><AgGrid /></ErrorBoundary>} />
        <Route path="/aggridpaging" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><GridPaging /></ErrorBoundary>} />
        <Route path="/aggridfiltering" element={<ErrorBoundary key={location.pathname} fallback={<h1>Oops! There was a problem 7.</h1>}><GridFiltering /></ErrorBoundary>} />
      </Routes >
    </AgGridWrapper>
  )
}

export default AppRouter
