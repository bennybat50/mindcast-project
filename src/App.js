// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/sb-admin-2.min.css';
import Index from './pages';
import ContentPage from './pages/Content-Page';
import InterestPage from './pages/InterestPage';
import HostRequest from './pages/HostRequest';
import Users from './pages/Users';
import Business from './pages/Website/Business';
import HomePage from './pages/Website/HomePage';
import About from './pages/Website/About';
import Resources from './pages/Website/Resources';
import Host from './pages/Website/Host';
import Support from './pages/Website/Support';
import PrivacyPolicy from './pages/Website/PrivacyPolicy';
import Terms from './pages/Website/Terms';
import Checkout from './pages/Website/Checkout';
import DeleteAccount from './pages/Website/DeleteAccount';



function App() {  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/business' element={<Business />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/resources' element={<Resources />}/>
        <Route path='/host' element={<Host/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/delete-account' element={<DeleteAccount/>}/>

        { /** ADMIN ROUTES */}
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
