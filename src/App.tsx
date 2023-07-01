import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import index from './store'
import Loader from './components/loader'

const App: React.FC = () => {
  const HomePage = React.lazy(() => import('../src/views/home-page'))
  const GamePage = React.lazy(() => import('../src/views/game-page'))

  return (
    <Provider store={index}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:provider/:slug" element={<GamePage />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
