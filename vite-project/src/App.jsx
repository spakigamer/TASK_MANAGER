import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Home';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Task from './Task';
import "./App.css"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}></Route>
        <Route path="/task" element={<Task></Task>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
