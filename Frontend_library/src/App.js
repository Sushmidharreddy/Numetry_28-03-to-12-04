import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import RegistrationPage from './Components/RegistrationPage';
import LoginPage from './Components/LoginPage';
import DashBoard from './Components/DashBoard';
import UserLogin from './Components/UserLogin';
import AdminBook from './Components/BookDashboard';
import UpdateBook from './Components/UpdateBook';
import AddtoCartBook from './Components/AddtoCartBook';

function App() {
  return (
    <div>
    
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}></Route>
        <Route path="/signupPage" element={<RegistrationPage/>}></Route>
        <Route path='/dashboard' element={<DashBoard/>}></Route>
        <Route path='/userlogin' element={<UserLogin/>}></Route>
        <Route path='/adminBook' element={<AdminBook/>}></Route>
        <Route path="/updateBook" element={<UpdateBook/>}></Route>
        <Route path="/addtocart" element={<AddtoCartBook/>}></Route>
      </Routes>
    </Router>
  
     
    </div>
  );
}

export default App;
