import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import AppContext from './Contexts/AppContext';
import Home from './Pages/Home';
import "./Components/Page/Page.css"
import Navbar from './Components/Navbar/Navbar';

function App() {
  useEffect(() => {
    init();
  }, []);

  const [isInitiated, setIsInitiated] = useState(false); // Tämä on vain siihen, että odotetaan että init() on suoritettu ennen kuin renderöidään mitään
  const [user, setUser] = useState(null); // Tämä on se user joka on kirjautunut sisään

  const init = async () => {
    const token = localStorage.getItem('token');
    const {data} = await axios.get('/api/user/init?token='+token);
    setUser(data.user);
    setIsInitiated(true);
  };

  return (
    <div>
      {setIsInitiated && (
        <AppContext.Provider value={{user, setUser}}>
          <Router>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
