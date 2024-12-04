import Home from './pages/Home'
import About from './pages/About'
import Notfound from './pages/Notfound'
import Login from './pages/login'
import Find from './pages/Find' 
import SignIn from './pages/SignIn' 
import Pemilihan from './pages/milihjualapa'
import Delivery from './pages/Delivery'
import UserPage from './pages/UserDetail'
import CreateProductPage from './pages/CreateProduct'
import CreateServicePage from './pages/sellservice.js'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Notfound />} />
        <Route path='/find' element={<Find />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/delivery' element={<Delivery />} />
        <Route path='/userpage' element={<UserPage />} />
        <Route path='/sellselection' element={<Pemilihan/>} />
        <Route path='/sellproduct' element={<CreateProductPage/>} />
        <Route path='/sellservice' element={<CreateServicePage/>} />

      </Routes>
    </Router>
  )
}

export default App
