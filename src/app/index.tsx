import type { LazyExoticComponent } from 'react'
import { memo, Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

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
    <HashRouter>
      <Routes>
        <Route
          path="/cssinjs"
          element={buildRouteSuspense(lazy(() => import('@/modules/cssinjs')))}
        />
        <Route
          path="/antd"
          element={buildRouteSuspense(lazy(() => import('@/modules/antd')))}
        />
        <Route
          path="/"
          element={buildRouteSuspense(lazy(() => import('./home')))}
        />
      </Routes>
    </HashRouter>
  )
}

export default memo(App)
