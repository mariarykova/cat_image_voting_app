import { useState } from 'react'
import './App.css'

import { Gallery } from './components/Gallery';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6 text-pink-600">
        Cat Image Gallery
      </h1>
      <Gallery />
    </div>
    </>
  )
}

export default App
