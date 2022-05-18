import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header/Header';
import About from './pages/About/About';
import Edit from './pages/Edit/Edit';
import Home from  './pages/Home/Home'
import Search from './pages/Search/Search';
import View from './pages/View/View';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path = '/' element={<Home/>}/>
          <Route path = '/add' element={<Edit/>}/>
          <Route path = '/update/:id' element={<Edit/>}/>
          <Route path = '/view/:id' element={<View/>}/>
          <Route path = '/about' element={<About/>}/>
          <Route path = '/search' element={<Search/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
