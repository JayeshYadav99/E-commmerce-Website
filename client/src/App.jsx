
import './App.css'
import {Routes,Route} from 'react-router-dom';
import Test from './Test';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
function App() {


  return (
    <div >
<Navbar/>



  <Routes>
    <Route path='/Test'element={<Test/>}/>
    <Route path='/'element={<Homepage/>}/>
  </Routes>
    </div>

  )
}

export default App
