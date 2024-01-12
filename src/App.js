import logo from './logo.svg';
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Film from './components/Film'
import Favourite from './components/Favourite'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar>
      <Banner></Banner>
      <Film></Film> */}
      {/* <Favourite></Favourite> */}
      <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
              <Route path='/' element={
                  <>
                      <Banner></Banner>
                      <Film></Film>
                  </>
              }></Route>
              <Route path='/favourites' element={
                <Favourite></Favourite>
              }></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
