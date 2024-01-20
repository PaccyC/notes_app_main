import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
  
      <Router>
        <div className="container dark">
          <div className='app'>
            <Header />
            <Routes>
            
                  <Route path='/' element={<NotesListPage />} />
                  <Route path='/note/:id' element={<NotePage />} />
               
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Signup />} />
              
            </Routes>
          </div>
        </div>
      </Router>

  );
}

export default App;
