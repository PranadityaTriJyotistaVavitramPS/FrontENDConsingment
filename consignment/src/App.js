import Home from './pages/Home'
import Home2 from './pages/Home2.js'
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
import SavedProduct from './pages/savedProducts.js'
import ProductDetail from './pages/ProductDetail.js'
import RatingProduct from './pages/Rateaproduct.js'
import ServicePage from './pages/ServicePage.js'
import ServiceDetail from './pages/ServiceDetail.js'
import Cantsell from './pages/Cantsell.js'
import NoUserDetail from './pages/NoUserDetail.js'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Home2/>} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Notfound />} />
        <Route path='/find' element={<Find />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/delivery/:id_product' element={<Delivery />} />
        <Route path='/userpage' element={<UserPage />} />
        <Route path='/sellselection' element={<Pemilihan/>} />
        <Route path='/sellproduct' element={<CreateProductPage/>} />
        <Route path='/sellservice' element={<CreateServicePage/>} />
        <Route path='/savedproduct' element={<SavedProduct/>} />
        <Route path='/unauthorized' element={<Cantsell/>} />
        <Route path='/unauthorizedid' element={<NoUserDetail/>} />
        <Route path='/rateProduct' element={<RatingProduct />} />
        <Route path='/servicePage' element={<ServicePage/>} />
        <Route path='/productDetail/:id_product' element={<ProductDetail/>} />
        <Route path='/serviceDetail/:id_service' element={<ServiceDetail/>}/>

      </Routes>
    </Router>
  )
}

export default App
