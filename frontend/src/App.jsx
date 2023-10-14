
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
