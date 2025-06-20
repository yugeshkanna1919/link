import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Skills from './skills.jsx'
import Welcome from './Welcome.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Navbar from '../compnents/Navbar.jsx'
import Form from '../hooks/Form.jsx'
import State from '../hooks/State.jsx'
import Effect from '../hooks/Effect.jsx'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/form" element={<Form/>}/>
        <Route path="/State" element={<State/>}/>
        <Route path="/Effect" element={<Effect/>}/>
        </Routes>
    </>
  )
}
export default App