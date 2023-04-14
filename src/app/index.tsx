import { memo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import type { LazyExoticComponent } from 'react'
import { Suspense, lazy } from 'react'

const Loading = () => {
  return <div>加载中...</div>
}

export const buildRouteSuspense = (LazyRoute: LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyRoute />
    </Suspense>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/cssinjs"
          element={buildRouteSuspense(lazy(() => import('@/modules/cssinjs')))}
        />
        <Route
          path="/"
          element={buildRouteSuspense(lazy(() => import('./home')))}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default memo(App)
