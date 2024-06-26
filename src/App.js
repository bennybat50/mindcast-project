// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages';
import ContentPage from './pages/Content-Page';
import InterestPage from './pages/InterestPage';
import HostRequest from './pages/HostRequest';
import Users from './pages/Users';
import Website from './pages/Website/Website';
import Business from './pages/Website/Business';


function App() {  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Website />}/>
          <Route path='/business' element={<Business />}/>
          <Route path='/admin' element={<Index/>}/>
          <Route path='/admin/contentPage' element={<ContentPage/>} component={ContentPage} />
          <Route path='/admin/createInterest' element={<InterestPage/>}/>
          <Route path='/admin/hostrequest' element={<HostRequest/>}/>
          <Route path='/admin/users' element={<Users/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
